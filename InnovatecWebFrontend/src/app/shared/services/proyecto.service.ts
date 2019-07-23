import { Injectable } from '@angular/core';
import { Proyecto } from '../models/proyecto';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import firebase from 'firebase';
import { Resultado } from '../models/resultado';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  proyectoList: AngularFireList<any>;
  selectProyecto: Proyecto = new Proyecto();
  constructor(private firebaseDataBase: AngularFireDatabase, private storage: AngularFireStorage) { }
  getNovedades() {
    return this.proyectoList = this.firebaseDataBase.list('proyectos');
  }

  insertNovedad(proyecto: Proyecto) {
    this.proyectoList.push({
      titulo: proyecto.titulo,
      imgsProyecto: proyecto.imgsProyecto,
      pathImgsNovedad: proyecto.pathImgsProyecto,
      autores: proyecto.autores,
      resumen: proyecto.resumen,
      objetivoG: proyecto.objetivoG,
      objetivosE: proyecto.objetivosE,
      resultados: proyecto.resultados,
      infoGraficas: proyecto.infoGraficas,
    });
  }

  updateNovedad(proyecto: Proyecto) {
    this.proyectoList.update(proyecto.skey, {
      titulo: proyecto.titulo,
      imgsProyecto: proyecto.imgsProyecto,
      pathImgsNovedad: proyecto.pathImgsProyecto,
      autores: proyecto.autores,
      resumen: proyecto.resumen,
      objetivoG: proyecto.objetivoG,
      objetivosE: proyecto.objetivosE,
      resultados: proyecto.resultados,
      infoGraficas: proyecto.infoGraficas,
    });
  }

  deleteNovedad(proyecto: Proyecto) {
    this.proyectoList.remove(proyecto.skey);
    const tmpList: string[] = Object.values(proyecto.pathImgsProyecto);
    const tmpListResultados: Resultado[] = Object.values(proyecto.resultados);
    tmpList.forEach(element => {
        this.deleteFileStorage(element);
    });
    tmpListResultados.forEach(element => {
      this.deleteFileStorage(element.pathImgResultado);
  });
  }

  deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(name).delete();
  }
}
