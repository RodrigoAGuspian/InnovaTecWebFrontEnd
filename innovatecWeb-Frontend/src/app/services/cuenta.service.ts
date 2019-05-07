import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// --- models --- //
import { Cuenta } from '../models/Cuenta';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  API_URI = 'https://innovatec-server.herokuapp.com/api/usuarios/';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${this.API_URI}`);
  }

  getUser(id: number) {
    return this.http.get(`${this.API_URI}${id}`);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.API_URI}${id}`);
  }

  createUser(cuenta: Cuenta) {
    return this.http.post(`${this.API_URI}`, cuenta);
  }

  logIn(logIn: Cuenta) {
    delete logIn.celular;
    delete logIn.id_cuenta;
    delete logIn.id_rol;
    delete logIn.id_tipo_documento;
    delete logIn.primer_apellido;
    delete logIn.primer_nombre;
    delete logIn.segundo_apellido;
    delete logIn.segundo_nombre;
    return this.http.post(`${this.API_URI}logIn`, logIn);
  }

  updateUser(id: number, updateUser: Cuenta): Observable<Cuenta> {
    return this.http.put(`${this.API_URI}${id}`, updateUser);
  }

  // --- Authentication --- //
  public get logged(): boolean {
    return (localStorage.getItem('authToken') !== null);
  }
  loggedIn() {
    return !!localStorage.getItem('authToken');
  }
  getTokenLogIn() {
    return localStorage.getItem('authToken');
  }
  logOut() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authTokenUsuarioRol');
  }
  getTokenUsuarioRol() {
    return localStorage.getItem('authTokenUsuarioRol');
  }

}