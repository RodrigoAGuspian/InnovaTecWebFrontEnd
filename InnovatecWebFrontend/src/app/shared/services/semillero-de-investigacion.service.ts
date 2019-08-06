import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { SemilleroDeInvestigacion } from '../models/semillero-de-investigacion';
import { ObjetivoSemillero } from '../models/objetivo-semillero';
import { LineaDeInvestigacion } from '../models/linea-de-investigacion';


@Injectable({
  providedIn: 'root'
})
export class SemilleroDeInvestigacionService {
  infoSemillero: AngularFireObject<any>;
  objetivosList: AngularFireList<any>;
  lineasDeInvestigacionList: AngularFireList<any>;
  public selectObjetivo = new ObjetivoSemillero();
  public selectLinea = new LineaDeInvestigacion();
  public selectSemillero = new SemilleroDeInvestigacion();

  public aEObjetivo = 'Añadir Objetivo';
  public aElineaDe = 'Añadir Linea de Investigación';

  constructor(private firebaseDataBase: AngularFireDatabase, private storage: AngularFireStorage) {

  }
  getInscripciones() {
    return this.infoSemillero = this.firebaseDataBase.object('semilleroDeInvestigacion/inscripciones');
  }

  getObjetivos() {
    return this.objetivosList = this.firebaseDataBase.list('semilleroDeInvestigacion/objetivos');
  }


  getLineasDeInvestigacion() {
    return this.lineasDeInvestigacionList = this.firebaseDataBase.list('semilleroDeInvestigacion/lineasDeInvestigacion');
  }

  updateInscripciones(inscripciones: string) {
    this.infoSemillero.update({
      inscripciones,
    });
  }

  insertObjetivo(objetivo: ObjetivoSemillero) {
    this.objetivosList.push({
      objetivo: objetivo.objetivo,
    });
  }

  updateObjetivo(objetivo: ObjetivoSemillero) {
    this.objetivosList.update(objetivo.skey, {
      objetivo: objetivo.objetivo,
    });
  }

  deleteObjetivo(objetivo: ObjetivoSemillero) {
    this.objetivosList.remove(objetivo.skey);
  }

  insertLineasDeInvestigacion(lineaDeInvestigacion: LineaDeInvestigacion) {
    this.lineasDeInvestigacionList.push({
      linea: lineaDeInvestigacion.linea,
    });
  }

  updateLineaDeInvestigacion(lineaDeInvestigacion: LineaDeInvestigacion) {
    this.lineasDeInvestigacionList.update(lineaDeInvestigacion.skey, {
      linea: lineaDeInvestigacion.linea,
    });
  }

  deleteLineaDeInvestigacion(lineaDeInvestigacion: LineaDeInvestigacion) {
    this.lineasDeInvestigacionList.remove(lineaDeInvestigacion.skey);

  }

}
