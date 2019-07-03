import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InformacionArticulosService {
  novedadesList: AngularFireList<any>;
  proyectosList: AngularFireList<any>;
  constructor(private firebaseDataBase: AngularFireDatabase) { }

  getNovedadesList(){
    return this.novedadesList = this.firebaseDataBase.list('novedades');
  }

  getProyectosList(){
    return this.proyectosList = this.firebaseDataBase.list('proyectos');
  }
}
