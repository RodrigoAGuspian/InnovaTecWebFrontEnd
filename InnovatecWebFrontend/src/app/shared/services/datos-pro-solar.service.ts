import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DatosProSolarService {
  dayListData: AngularFireList<any>;
  monthListData: AngularFireList<any>;
  realTimelist: AngularFireList<any>;
  private appProSolar = firebase.initializeApp(environment.firebaseProSolar, 'ProSolar');

  constructor(private firebaseDataBase: AngularFireDatabase) { }

  getDataForDay(day: string, month: string, year: string) {
    const ref = this.appProSolar.database().ref('datos/y' + year + '/m' + month + '/d' + day);
    return this.dayListData = this.firebaseDataBase.list(ref);
  }

  getDataMonth(month: string, year: string) {
    const ref = this.appProSolar.database().ref('datos/y' + year + '/m' + month);
    return this.monthListData = this.firebaseDataBase.list(ref);
  }

  getRealTimeData() {
    const ref = this.appProSolar.database().ref('tiempoReal');
    return this.realTimelist = this.firebaseDataBase.list(ref);
  }
}
