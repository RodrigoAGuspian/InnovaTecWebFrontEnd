import { Injectable } from '@angular/core';
import { Rol } from '../models/rol';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { UserRol } from '../models/user-rol';


@Injectable({
  providedIn: 'root'
})
export class RolesService {
  superAdminstradoresList: AngularFireList<any>;
  administradoresList: AngularFireList<any>;
  invitadosList: AngularFireList<any>;
  public selectUserRol: UserRol;
  constructor(public firebaseDataBase: AngularFireDatabase) { }

  getSuperAdministradores() {
    return this.superAdminstradoresList = this.firebaseDataBase.list('roles/superAdministradores');
  }

  getAdministradores() {
    return this.administradoresList = this.firebaseDataBase.list('roles/administradores');
  }

  getInvitados() {
    return this.administradoresList = this.firebaseDataBase.list('roles/inivitados');
  }

}
