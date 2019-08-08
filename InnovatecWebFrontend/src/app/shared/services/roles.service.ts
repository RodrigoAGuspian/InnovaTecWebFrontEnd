import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { UserRol } from '../models/user-rol';


@Injectable({
  providedIn: 'root'
})
export class RolesService {
  superAdminstradoresList: AngularFireList<any>;
  administradoresList: AngularFireList<any>;
  invitadosList: AngularFireList<any>;
  public selectUserRol: UserRol = new UserRol();

  constructor(public firebaseDataBase: AngularFireDatabase) { }

  getSuperAdministradores() {
    return this.superAdminstradoresList = this.firebaseDataBase.list('roles/superAdministradores');
  }

  getAdministradores() {
    return this.administradoresList = this.firebaseDataBase.list('roles/administradores');
  }

  getInvitados() {
    return this.invitadosList = this.firebaseDataBase.list('roles/invitados');
  }

  insertInvitado(userRol: UserRol) {
    this.getInvitados();
    this.invitadosList.push({
      email: userRol.email
    });
  }

  insertAdministrador(userRol: UserRol) {
    this.getAdministradores();
    this.administradoresList.push({
      email: userRol.email
    });
  }

  deleteInvitado(userRol: UserRol) {
    this.getInvitados();
    this.invitadosList.remove(userRol.skeyRol);
  }

  deleteAdministrador(userRol: UserRol) {
    this.getAdministradores();
    this.administradoresList.remove(userRol.skeyRol);
  }

}
