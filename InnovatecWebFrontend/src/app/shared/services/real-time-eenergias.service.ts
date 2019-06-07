import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class RealTimeEenergiasService {
  realTimelist: AngularFireList<any>;
  constructor(private firebase: AngularFireDatabase) { }

  getRealTimeDataTarjeta1() {
    return this.realTimelist = this.firebase.list('proyectoEficienciaE/tarjeta1/tiempoReal');
  }
}
