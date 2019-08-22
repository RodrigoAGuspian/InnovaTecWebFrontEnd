import { MatSnackBar } from '@angular/material';
import { Injectable, NgZone } from '@angular/core';
import { User } from '../models/user';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { UserInfoService } from './user-info.service';
import { UserInfo } from '../models/user-info';
import { Rol } from '../models/rol';
import { RolesService } from './roles.service';
import { EmailNotificationService } from './email-notification.service';

@Injectable({
  providedIn: 'root'

})

export class AuthService {
  userData: any; // Save logged in user data
  userList: UserInfo[];
  superAdminstradoresList: Rol[];
  administradoresList: Rol[];
  invitadosList: Rol[];
  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public userInfoService: UserInfoService,
    public rolesService: RolesService,
    private snackBar: MatSnackBar,
    private emailNotificationService: EmailNotificationService, ) {
    this.userInfoService.getUsers().snapshotChanges().subscribe(item => {
      this.userList = []; item.forEach(element => {
        const x = element.payload.toJSON();
        // tslint:disable-next-line: no-string-literal
        x['$key'] = element.key;
        this.userList.push(x as UserInfo);
      });
    });

    this.rolesService.getSuperAdministradores().snapshotChanges().subscribe(item => {
      this.superAdminstradoresList = [];
      item.forEach(element => {
        const x = element.payload.toJSON();
        // tslint:disable-next-line: no-string-literal
        this.superAdminstradoresList.push(x as Rol);
      });
    });

    this.rolesService.getAdministradores().snapshotChanges().subscribe(item => {
      this.administradoresList = [];
      item.forEach(element => {
        const x = element.payload.toJSON();
        // tslint:disable-next-line: no-string-literal
        this.administradoresList.push(x as Rol);
      });
    });

    this.rolesService.getInvitados().snapshotChanges().subscribe(item => {
      this.invitadosList = [];
      item.forEach(element => {
        const x = element.payload.toJSON();
        // tslint:disable-next-line: no-string-literal
        this.invitadosList.push(x as Rol);
      });
    });


    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  // Sign in with email/password
  SignIn(email, password) {
    let solo1 = true;
    let seEncuentra = false;
    for (const element of this.invitadosList) {
      if (email === element.email) {
        seEncuentra = true;
      }
    }

    for (const element of this.administradoresList) {
      if (email === element.email) {
        seEncuentra = true;
      }
    }

    for (const element of this.superAdminstradoresList) {
      if (email === element.email) {
        seEncuentra = true;
      }
    }

    if (seEncuentra) {
      this.afAuth.auth.signInWithEmailAndPassword(email, password).then((result) => {
        this.ngZone.run(() => {
          if (solo1) {
            this.router.navigate(['']);
            solo1 = false;
          }
          this.snackBar.open('Inicio de sesión correcto.', 'Bienvenido', {
            duration: 2000,
            panelClass: ['green-snackbar']
          });
        });
        this.SetUserData(result.user);
      }).catch(() => {

        let correoRegistrado = false;
        this.userList.forEach(element => {
          if (element.email === email) {
            correoRegistrado = true;
          }
        });

        if (correoRegistrado) {
          this.snackBar.open('Por favor revise que su correo electrónico y su contraseña esten bien escritos.', 'Algo anda mal :(', {
            duration: 2000,
            panelClass: ['red-snackbar']
          });
        } else {
          this.snackBar.open('Su correo electrónico no se encuentra en nuestra base de datos.', 'Algo anda mal :(', {
            duration: 2000,
            panelClass: ['red-snackbar']
          });
        }

       });

    } else {
        this.snackBar.open('Por favor espera que uno de nuestros administradores te permita acceso.', 'No puedes acceder a la plataforma', {
          duration: 2000,
          panelClass: ['yellow-snackbar']
        });

    }

  }

  // Sign up with email/password
  SignUp(formSignUp: FormGroup) {
    this.afAuth.auth.createUserWithEmailAndPassword(formSignUp.value.email, formSignUp.value.password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        // this.SendVerificationMail();
        this.router.navigate(['/']);
        // this.SetUserData(result.user);
        this.userInfoService.insertUser(formSignUp.value, result.user.uid);
        this.snackBar.open('Espere que un administrador apruebe su cuenta para ingresar a la plataforma.', 'Registro completado.', {
          duration: 2000,
          panelClass: ['blue-snackbar']
        });
        this.emailNotificationService.insertNotificationToAdmin(formSignUp.value);

      }).catch((error) => {
        this.snackBar.open('El usuario ya está registrado.', 'Algo anda mal :(', {
          duration: 2000,
          panelClass: ['red-snackbar']
        });

      });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify-email-address']);
    });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Se te ha enviado un correo para que recuperes tu contraseña.');
    }).catch((error) => {
      window.alert('A ocurrido un error.');
    });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['panel-de-control']);
        });
       this.SetUserData(result.user);
    }).catch((error) => {
      window.alert('A ocurrido un error.');
    });
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  // Sign out
  SignOut() {
    return this.afAuth.auth.signOut().then(async () => {
      await delay(100);
      this.snackBar.open('Se ha cerrado sesión correctamente.', 'Adiós.', {
        duration: 2000,
        panelClass: ['blue-snackbar']
      });
      localStorage.removeItem('user');
      this.router.navigate(['iniciar-sesion']);
    });

    function delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    }
  }

  UpdatePassword(newPassword: string) {
    const user = this.afAuth.auth.currentUser;
    user.updatePassword(newPassword).then(() => {
      // Update successful.
      this.snackBar.open('Su contraseña se ha cambiado correctamente.', 'Exíto', {
        duration: 2000,
        panelClass: ['green-snackbar']
      });
    }).catch((error) => {
      // An error happened.
      this.snackBar.open('Su contraseña no se a podido cambiar.', 'Error', {
        duration: 2000,
        panelClass: ['red-snackbar']
      });
    });
  }

}
