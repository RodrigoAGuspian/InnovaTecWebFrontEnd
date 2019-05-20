import { Injectable, NgZone } from '@angular/core';
import { User } from '../models/user';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { UserInfoService } from './user-info.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFireList } from '@angular/fire/database';
import { UserInfo } from '../models/user-info';

@Injectable({
  providedIn: 'root'

})


export class AuthService {
  userData: any; // Save logged in user data
  userList: UserInfo[];
  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public userInfoService: UserInfoService,
    private toastr: ToastrService,
  ) {
    this.userInfoService.getUsers().snapshotChanges()
    .subscribe(item => {
      this.userList = []; item.forEach(element => {
        const x = element.payload.toJSON();
        // tslint:disable-next-line: no-string-literal
        x['$key'] = element.key;
        this.userList.push(x as UserInfo);
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


    for (const element of this.userList) {
      if (element.email === email) {
        if (element.rol !== 'No Verificado') {
          this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((result) => {
          this.ngZone.run(() => {
            this.router.navigate(['dashboard']);
            this.toastr.success('Inicio de sesión correcto.', 'Bienvenido.');
          });
          this.SetUserData(result.user);
        }).catch((error) => {
          this.toastr.error('Por favor revise que su correo electrónico y su contraseña esten bien escritos.', 'Algo anda mal :(');
        });
        } else {
          this.toastr.warning('Por favor espera que uno de nuestros administradores te de acceso', 'No puedes acceder a la plataforma');
        }
      } else if (this.userList[this.userList.length - 1] === element) {
        this.toastr.error('Su correo electrónico no se encuentra en nuestra base de datos', 'Algo anda mal :(');
      }
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
        this.SetUserData(result.user);
        this.userInfoService.insertUser(formSignUp.value);
        this.toastr.warning('Espere que un administrador apruebe su cuenta para ingresar a la plataforma.', 'Registro completado.');

      }).catch((error) => {
        this.toastr.error('El usuario ya está registrado.', 'Algo anda mal :(');

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
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert('A ocurrido un error.');
    });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
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
          this.router.navigate(['dashboard']);
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
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }

}
