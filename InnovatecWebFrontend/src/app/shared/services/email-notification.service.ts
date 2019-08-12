import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { EmailNotification } from '../models/email-notification';

@Injectable({
  providedIn: 'root'
})
export class EmailNotificationService {
  listNotification: AngularFireList<any>;
  constructor(private angularFireDB: AngularFireDatabase) { }
  getNotification() {
    return this.listNotification = this.angularFireDB.list('notificationRequests');
  }

  insertNotification(emailNotification: EmailNotification) {
    this. getNotification();
    this.listNotification.push({
      user: emailNotification.user,
      message: emailNotification.message,
      subject: emailNotification.subject,
    });
  }

}
