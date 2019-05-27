import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class RealTimeProSolarService {
  realTimelist: AngularFireList<any>;
  constructor(private firebase: AngularFireDatabase) { }

  getRealTimeData() {
    return this.realTimelist = this.firebase.list('proyectoIrradiancia/tiempoReal');
  }
}
