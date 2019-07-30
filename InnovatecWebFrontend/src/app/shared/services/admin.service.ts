import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private firebaseDataBase: AngularFireDatabase) { }
  public static accessAdmin = false;
  usersList: AngularFireList<any>;

  getUsers() {
    return this.usersList = this.firebaseDataBase.list('users');
  }
  isAdmin():any {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user.email);
    let rol = ' ';
    this.getUsers().snapshotChanges().subscribe(
      item => {
        item.forEach(element => {
          const x = element.payload.toJSON();
          // tslint:disable-next-line: no-string-literal
          if (x['email'] === user.email ) {
            // tslint:disable-next-line: no-string-literal
            rol = x['rol'];
          }
        });

        if (!(rol === 'Administrador' || rol === 'Super-Administrador' )) {
          return false;
        } else {
          return true;
        }
      }
    );
  }
}
