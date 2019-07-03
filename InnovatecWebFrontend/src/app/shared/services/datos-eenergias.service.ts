import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DatosEenergiasService {
  dayListData: AngularFireList<any>;
  monthListData: AngularFireList<any>;
  realTimelist: AngularFireList<any>;
  private appEEnergias = firebase.initializeApp(environment.firebaseEEnergias, 'EEnergias');

  constructor(private firebaseDataBase: AngularFireDatabase) { }

  getDataForDay(day: string, month: string, year: string) {
    const ref = this.appEEnergias.database().ref('tarjeta1/datos/y' + year + '/m' + month + '/d' + day);
    return this.dayListData = this.firebaseDataBase.list(ref);
  }

  getDataMonth(month: string, year: string) {
    const ref = this.appEEnergias.database().ref('tarjeta1/datos/y' + year + '/m' + month);
    return this.monthListData = this.firebaseDataBase.list(ref);
  }

  getRealTimeDataTarjeta1() {
    const ref = this.appEEnergias.database().ref('tarjeta1/tiempoReal');
    return this.realTimelist = this.firebaseDataBase.list(ref);
  }
}
