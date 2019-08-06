import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { ProyectoPeq } from '../models/proyecto-peq';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ProyectoPeqService {
  constructor(private firebaseDataBase: AngularFireDatabase, private storage: AngularFireStorage) { }
  proyectoPeqList: AngularFireList<any>;
  selectProyectoPeq: ProyectoPeq = new ProyectoPeq();
  public aEProyecto = 'Añadir Proyecto';
  getProyectos() {
    return this.proyectoPeqList = this.firebaseDataBase.list('semilleroDeInvestigacion/proyectosPeq');
  }

  insertProyectoPeq(proyectoPeq: ProyectoPeq) {
    this.proyectoPeqList.push({
      nombre: proyectoPeq.nombre,
      imagenes: proyectoPeq.imagenes,
      pathImagenes: proyectoPeq.pathImagenes,
      integrantes: proyectoPeq.integrantes,
      programaDeFormacion: proyectoPeq.programaDeFormacion,
      colaboraciones: proyectoPeq.colaboraciones,
    });
  }

  updateProyectoPeq(proyectoPeq: ProyectoPeq) {
    this.proyectoPeqList.update(proyectoPeq.skey, {
      nombre: proyectoPeq.nombre,
      imagenes: proyectoPeq.imagenes,
      pathImagenes: proyectoPeq.pathImagenes,
      integrantes: proyectoPeq.integrantes,
      programaDeFormacion: proyectoPeq.programaDeFormacion,
      colaboraciones: proyectoPeq.colaboraciones,
    });
  }

  deleteProyectoPeq(proyectoPeq: ProyectoPeq) {
    this.proyectoPeqList.remove(proyectoPeq.skey);
    const tmpList: string[] = Object.values(proyectoPeq.pathImagenes);
    tmpList.forEach(element => {
        this.deleteFileStorage(element);
    });
  }

  deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(name).delete();
  }
}
