import { Injectable } from '@angular/core';
import { Proyecto } from '../models/proyecto';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import firebase from 'firebase';
import { Resultado } from '../models/resultado';
import { Grafica } from '../models/grafica';
import { PreResultado } from '../models/pre-resultado';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  constructor(private firebaseDataBase: AngularFireDatabase, private storage: AngularFireStorage) { }
  public static controlarCambios = true;
  public static imgParaResultado = '';
  proyectoList: AngularFireList<any>;
  selectProyecto: Proyecto = new Proyecto();
  public infoGraficas: Grafica[] = [];
  public preResultadosList: PreResultado[] = [];
  public selectResultado = new PreResultado();
  public selectGrafica = new Grafica();
  public aEproyecto = '';
  getProyectos() {
    return this.proyectoList = this.firebaseDataBase.list('proyectos');
  }

  insertProyecto(proyecto: Proyecto) {
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

  updateProyecto(proyecto: Proyecto) {
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

  deleteProyecto(proyecto: Proyecto) {
    this.proyectoList.remove(proyecto.skey);
    const tmpList: string[] = Object.values(proyecto.pathImgsProyecto);
    tmpList.forEach(element => {
        this.deleteFileStorage(element);
    });
  }

  deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(name).delete();
  }

}
