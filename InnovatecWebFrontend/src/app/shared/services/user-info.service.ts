import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { UserInfo } from '../models/user-info';
@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  userslist: AngularFireList<any>;
  constructor(private firebase: AngularFireDatabase) { }
  getUsers() {
    return this.userslist = this.firebase.list('users');
  }
  insertUser(userInfo: UserInfo, userId: string) {
    this.getUsers();
    this.userslist.push({
      uid: userId,
      email: userInfo.email,
      primerN: userInfo.primerN,
      segundoN: userInfo.segundoN,
      primerA: userInfo.primerA,
      segundoA: userInfo.segundoA,
      tipoDeUso: userInfo.tipoDeUso,
      pais: userInfo.pais,
      institucion: userInfo.institucion,
      departamento: userInfo.departamento,
      ciudad: userInfo.ciudad,
    });
  }
  updateUserPrincipal(userInfo: UserInfo) {
    this.getUsers();
    this.userslist.update(userInfo.skey, {
      primerN: userInfo.primerN,
      segundoN: userInfo.segundoN,
      primerA: userInfo.primerA,
      segundoA: userInfo.segundoA,
    });
  }

  updateUserAdicional(userInfo: UserInfo) {
    this.getUsers();
    this.userslist.update(userInfo.skey, {
      tipoDeUso: userInfo.tipoDeUso,
      institucion: userInfo.institucion,
      pais: userInfo.pais,
      departamento: userInfo.departamento,
      ciudad: userInfo.ciudad,
    });
  }

}
