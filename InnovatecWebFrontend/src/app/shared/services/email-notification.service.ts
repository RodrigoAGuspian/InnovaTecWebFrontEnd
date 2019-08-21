import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { EmailNotification } from '../models/email-notification';
import { UserInfo } from '../models/user-info';
import { RolesService } from './roles.service';
import { Rol } from '../models/rol';

@Injectable({
  providedIn: 'root'
})
export class EmailNotificationService {
  listNotification: AngularFireList<any>;
  listNotificationToAdmin: AngularFireList<any>;
  administradores: string[] = [];
  constructor(private angularFireDB: AngularFireDatabase, private rolesService: RolesService) { }
  getNotification() {
    return this.listNotification = this.angularFireDB.list('notificationRequests');
  }

  getNotificationToAdmin() {
    return this.listNotification = this.angularFireDB.list('notificationRequestsToAdmin');
  }

  insertNotification(emailNotification: EmailNotification) {
    this. getNotification();
    this.listNotification.push({
      user: emailNotification.user,
      message: emailNotification.message,
      subject: emailNotification.subject,
    });
  }

  insertNotificationToAdmin(userInfo: UserInfo) {
    let solo1Vez = true;
    this.rolesService.getAdministradores().snapshotChanges().subscribe(
      item => {
        this.administradores = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          // tslint:disable-next-line: no-string-literal
          x['skey'] = element.key;
          // tslint:disable-next-line: no-string-literal
          const correo = x['email'];
          this.administradores.push(correo);
        });

        this.rolesService.getSuperAdministradores().snapshotChanges().subscribe(
          item1 => {
            item1.forEach(element => {
              const x = element.payload.toJSON();
              // tslint:disable-next-line: no-string-literal
              x['skey'] = element.key;
              // tslint:disable-next-line: no-string-literal
              const correo = x['email'];
              this.administradores.push(correo);
            });

            if (solo1Vez) {
              solo1Vez = false;
              const emailNotificationToAdmin = new EmailNotification();
              emailNotificationToAdmin.subject = 'Se ha registrado un nuevo usuario a nuestra plataforma web';
              emailNotificationToAdmin.message = 'El usuario con el correo ' + userInfo.email +
              ' quiere ingreasar a la plataforma, por favor revise sus datos y si es apto habilitelo en algun rol';
              this.getNotificationToAdmin();
              console.log(this.administradores);
              this.listNotification.push({
                user: this.administradores,
                message: emailNotificationToAdmin.message,
                subject: emailNotificationToAdmin.subject,
              });
            }
        });
      }
    );

  }
}
