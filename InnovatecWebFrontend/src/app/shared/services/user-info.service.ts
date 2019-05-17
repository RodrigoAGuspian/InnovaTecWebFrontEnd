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
  insertUser(userInfo: UserInfo) {
    this.getUsers();
    this.userslist.push({
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
      rol: 'No Verificado',
    });
  }
  updateUser(userInfo: UserInfo) {
    this.getUsers();
    this.userslist.update(userInfo.skey, {
      email: userInfo.email,
      primerN: userInfo.primerN,
      segundoN: userInfo.segundoN,
      primerA: userInfo.primerA,
      segundoA: userInfo.segundoA,
      tipoDeUso: userInfo.tipoDeUso,
      pais: userInfo.pais,
      departamento: userInfo.departamento,
      ciudad: userInfo.ciudad,
    });
  }

  updateUserForAdmin(userInfo: UserInfo) {
    this.getUsers();
    this.userslist.update(userInfo.skey, {
      email: userInfo.email,
      primerN: userInfo.primerN,
      segundoN: userInfo.segundoN,
      primerA: userInfo.primerA,
      segundoA: userInfo.segundoA,
      tipoDeUso: userInfo.tipoDeUso,
      pais: userInfo.pais,
      departamento: userInfo.departamento,
      ciudad: userInfo.ciudad,
      rol: userInfo.rol,
    });
  }
}
