import { Component, OnInit } from '@angular/core';
import { RolesService } from 'src/app/shared/services/roles.service';
import { UserInfoService } from 'src/app/shared/services/user-info.service';
import { UserInfo } from 'src/app/shared/models/user-info';
import { Rol } from 'src/app/shared/models/rol';
import { UserRol } from 'src/app/shared/models/user-rol';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailNotificationService } from 'src/app/shared/services/email-notification.service';
import { EmailNotification } from 'src/app/shared/models/email-notification';


@Component({
  selector: 'app-administrar-roles',
  templateUrl: './administrar-roles.component.html',
  styleUrls: ['./administrar-roles.component.css']
})

export class AdministrarRolesComponent implements OnInit {

  formSelector: FormGroup;
  constructor(public fb: FormBuilder, public rolesService: RolesService, private userInfoService: UserInfoService,
              private snackBar: MatSnackBar, public router: Router, private emailNotificationService: EmailNotificationService) {
    this.formSelector = this.fb.group({
      rol: [],
    });

   }

  usersList: UserInfo[];
  superAdministradores: Rol[];
  administradores: Rol[];
  invitados: Rol[];
  public usersRolList: UserRol[];
  displayedColumns: string[] = ['Correo', 'Rol'];
  dataSource: MatTableDataSource<UserRol>;
  selectUserRolTmp: UserRol = new UserRol();
  tipos: string[] = ['No definido', 'Invitado', 'Administrador', 'Super administrador'];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {

    this.userInfoService.getUsers().snapshotChanges().subscribe(
      item => {
        this.usersList = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          // tslint:disable-next-line: no-string-literal
          x['skey'] = element.key;
          this.usersList.push(x as UserInfo);
        });
      }
    );

    this.rolesService.getSuperAdministradores().snapshotChanges().subscribe(
      item => {
        this.superAdministradores = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          // tslint:disable-next-line: no-string-literal
          x['skey'] = element.key;
          this.superAdministradores.push(x as Rol);
        });

        this.rolesService.getAdministradores().snapshotChanges().subscribe(
          item1 => {
            this.administradores = [];
            item1.forEach(element => {
              const x = element.payload.toJSON();
              // tslint:disable-next-line: no-string-literal
              x['skey'] = element.key;
              this.administradores.push(x as Rol);
            });

            this.rolesService.getInvitados().snapshotChanges().subscribe(
              item2 => {
                this.invitados = [];
                item2.forEach(element => {
                  const x = element.payload.toJSON();
                  // tslint:disable-next-line: no-string-literal
                  x['skey'] = element.key;
                  this.invitados.push(x as Rol);
                })
                ;
                this.getUsersRolList();
                this.dataSource = new MatTableDataSource(this.usersRolList);

              }
            );
          }
        );
      }
    );


  }

  getUsersRolList() {
    this.usersRolList = [];
    this.usersList.forEach(element => {
      const userRol = new UserRol();
      userRol.user = element;
      userRol.tipoDeRol = this.tipos[0];
      userRol.email = element.email;
      this.usersRolList.push(userRol);
    });

    this.usersRolList.forEach(element => {
      this.superAdministradores.forEach(element1 => {
        if (element.user.email === element1.email ) {
          element.tipoDeRol = this.tipos[3];
          element.skeyRol  = element1.skey;
        }
      });

      this.administradores.forEach(element1 => {
        if (element.user.email === element1.email ) {
          element.tipoDeRol = this.tipos[2];
          element.skeyRol  = element1.skey;
        }
      });

      this.invitados.forEach(element1 => {
        if (element.user.email === element1.email ) {
          element.tipoDeRol = this.tipos[1];
          element.skeyRol  = element1.skey;
        }
      });
    });



  }

  mostrarMas(row: UserRol) {
    this.rolesService.selectUserRol = Object.assign({}, row);
    this.selectUserRolTmp = Object.assign({}, row);
    this.formSelector.controls.rol.setValue(this.rolesService.selectUserRol.tipoDeRol, {onlySelf: true});
  }

  cambiarRolAlTmp(rol) {
    this.selectUserRolTmp.tipoDeRol = rol;
  }

  comprobarRol() {
    const user = JSON.parse(localStorage.getItem('user'));
    let rolSuperAdministrador = false;
    let rolAdministrador = false;
    let verificar = true;
    this.rolesService.getSuperAdministradores().snapshotChanges().subscribe(
      item => {

        for (let i = 0; i < item.length; i++) {
          const element = item[i];
          const x = element.payload.toJSON();
          // tslint:disable-next-line: no-string-literal
          if (x['email'] === user.email ) {
            // tslint:disable-next-line: no-string-literal
              rolSuperAdministrador = true;
          }
          if (item.length - 1 === i) {

            this.rolesService.getAdministradores().snapshotChanges().subscribe(
              item1 => {
                item1.forEach(element1 => {
                  const x1 = element1.payload.toJSON();
                  // tslint:disable-next-line: no-string-literal
                  if (x1['email'] === user.email ) {
                    // tslint:disable-next-line: no-string-literal
                      rolAdministrador = true;
                  }
                });
                if (verificar) {
                  if (rolSuperAdministrador || rolAdministrador) {
                    this.cambiarRol();
                  } else {
                    window.alert('Usted no puede acceder a esta dirección');
                    this.router.navigate(['']);
                  }
                  verificar = false;
                }
              }
            );

          }
        }
      }
    );
  }

  cambiarRol() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (this.selectUserRolTmp.email === user.email) {
      this.snackBar.open('El mismo usuario no puede cambiarse de rol.', 'Rol no modificado', {
        duration: 2000,
        panelClass: ['blue-snackbar']
      });

    } else {

      if (this.rolesService.selectUserRol.tipoDeRol === this.selectUserRolTmp.tipoDeRol) {
        this.snackBar.open('Se mantendrá el mismo rol.', 'Rol no modificado', {
          duration: 2000,
          panelClass: ['blue-snackbar']
        });
      } else {

        if (this.rolesService.selectUserRol.tipoDeRol === this.tipos[3]) {
          this.snackBar.open('A los super administradores no se les puede cambiar el rol.', 'Rol no modificado', {
            duration: 2000,
            panelClass: ['blue-snackbar']
          });

        } else {

          if (this.selectUserRolTmp.tipoDeRol === this.tipos[3]) {
            this.snackBar.open('A nadie se le puede asignar el rol de super administrador.', 'Rol no modificado', {
              duration: 2000,
              panelClass: ['blue-snackbar']
            });
          } else {

            if (this.rolesService.selectUserRol.tipoDeRol === this.tipos[0] && this.selectUserRolTmp.tipoDeRol === this.tipos[1]) {
              // solo pasar a invitado
              this.rolesService.insertInvitado(this.selectUserRolTmp);
              const emailNotification = new EmailNotification();
              emailNotification.user = this.selectUserRolTmp.email;
              emailNotification.subject = 'Cambio de rol';
              // tslint:disable-next-line: max-line-length
              emailNotification.message = 'A usted se le a asignado el rol de invitado, ahora usted puede acceder a nuestra plataforma para acceder a todos los datos de nuestros proyectos';
              this.emailNotificationService.insertNotification(emailNotification);
              this.snackBar.open('Se ha cambiado el rol a ' + this.selectUserRolTmp.email + ', ahora es invitado .', 'Rol modificado', {
                duration: 2000,
                panelClass: ['green-snackbar']
              });
            }

            if (this.rolesService.selectUserRol.tipoDeRol === this.tipos[1] && this.selectUserRolTmp.tipoDeRol === this.tipos[0] ) {
              // solo quitar de invitado
              this.rolesService.deleteInvitado(this.selectUserRolTmp);
              const emailNotification = new EmailNotification();
              emailNotification.user = this.selectUserRolTmp.email;
              emailNotification.subject = 'Cambio de rol';
              // tslint:disable-next-line: max-line-length
              emailNotification.message = 'A usted se le a asignado el rol de No Asignado, ahora usted no puede ingresar a nuestra plataforma';
              this.emailNotificationService.insertNotification(emailNotification);
              this.snackBar.open('Se ha cambiado el rol a ' + this.selectUserRolTmp.email + ', ahora es no definido .', 'Rol modificado', {
                duration: 2000,
                panelClass: ['red-snackbar']
              });
            }

            if (this.rolesService.selectUserRol.tipoDeRol === this.tipos[0] && this.selectUserRolTmp.tipoDeRol === this.tipos[2]) {
              // solo pasar a administrador
              this.rolesService.insertAdministrador(this.selectUserRolTmp);
              const emailNotification = new EmailNotification();
              emailNotification.user = this.selectUserRolTmp.email;
              emailNotification.subject = 'Cambio de rol';
              // tslint:disable-next-line: max-line-length
              emailNotification.message = 'A usted se le a asignado el rol de Administrador, ahora puede ingresar a nuestra plataforma para acceder a todos los datos de nuestros proyectos además de poder asignar roles a los usuarios';
              this.emailNotificationService.insertNotification(emailNotification);
              this.snackBar.open('Se ha cambiado el rol a ' +
              this.selectUserRolTmp.email + ', ahora es administrador .', 'Rol modificado', {
                duration: 2000,
                panelClass: ['green-snackbar']
              });
            }

            if (this.rolesService.selectUserRol.tipoDeRol === this.tipos[2] && this.selectUserRolTmp.tipoDeRol === this.tipos[0] ) {
              // solo quitar de administrador
              this.rolesService.deleteAdministrador(this.selectUserRolTmp);
              const emailNotification = new EmailNotification();
              emailNotification.user = this.selectUserRolTmp.email;
              emailNotification.subject = 'Cambio de rol';
              // tslint:disable-next-line: max-line-length
              emailNotification.message = 'A usted se le a asignado el rol de No Asignado, ahora usted no puede ingresar a nuestra plataforma';
              this.emailNotificationService.insertNotification(emailNotification);
              this.snackBar.open('Se ha cambiado el rol a ' + this.selectUserRolTmp.email + ', ahora es no definido .', 'Rol modificado', {
                duration: 2000,
                panelClass: ['red-snackbar']
              });
            }
            if (this.rolesService.selectUserRol.tipoDeRol === this.tipos[1] && this.selectUserRolTmp.tipoDeRol === this.tipos[2]) {
              // pasar de invitado a administrador
              this.rolesService.deleteInvitado(this.selectUserRolTmp);
              this.rolesService.insertAdministrador(this.selectUserRolTmp);
              const emailNotification = new EmailNotification();
              emailNotification.user = this.selectUserRolTmp.email;
              emailNotification.subject = 'Cambio de rol';
              // tslint:disable-next-line: max-line-length
              emailNotification.message = 'A usted se le a asignado el rol de Administrador, por lo cual se le a subido de rango, ahora usted puede ingresar a nuestra plataforma para acceder a todos los datos de nuestros proyectos además de poder asignar roles a los usuarios';
              this.emailNotificationService.insertNotification(emailNotification);
              this.snackBar.open('Se ha cambiado el rol a ' +
                this.selectUserRolTmp.email + ', ahora es administrador .', 'Rol modificado', {
                duration: 2000,
                panelClass: ['yellow-snackbar']
              });
            }

            if (this.rolesService.selectUserRol.tipoDeRol === this.tipos[2] && this.selectUserRolTmp.tipoDeRol === this.tipos[1] ) {
              // pasar de administrador a invitado
              this.rolesService.deleteAdministrador(this.selectUserRolTmp);
              this.rolesService.insertInvitado(this.selectUserRolTmp);
              const emailNotification = new EmailNotification();
              emailNotification.user = this.selectUserRolTmp.email;
              emailNotification.subject = 'Cambio de rol';
              // tslint:disable-next-line: max-line-length
              emailNotification.message = 'A usted se le a asignado el rol de Administrador, por lo cual se le a bajado de rango, ahora usted puede ingresar a nuestra plataforma solo para acceder a todos los datos de nuestros proyectos';
              this.emailNotificationService.insertNotification(emailNotification);
              this.snackBar.open('Se ha cambiado el rol a ' + this.selectUserRolTmp.email + ', ahora es invitado .', 'Rol modificado', {
                duration: 2000,
                panelClass: ['yellow-snackbar']
              });
            }
          }
        }
      }
    }

    this.resetForm();

  }

  resetForm() {
    this.rolesService.selectUserRol = new UserRol();
    this.selectUserRolTmp = new UserRol();
    this.formSelector.controls.rol.setValue('', {onlySelf: true});
  }

}
