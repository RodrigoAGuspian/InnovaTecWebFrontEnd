import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { UserInfo } from '../models/user-info';
@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  userslist: AngularFireList<any>;
  constructor(private firebase: AngularFireDatabase) { }
  getProducts() {
    return this.userslist = this.firebase.list('users');
  }
  insertProduct(userInfo: UserInfo) {
    this.userslist.push({
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
  updateProduct(userInfo: UserInfo) {
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
}
