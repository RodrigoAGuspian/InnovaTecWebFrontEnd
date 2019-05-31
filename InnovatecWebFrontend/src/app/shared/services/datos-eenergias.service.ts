import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class DatosEenergiasService {
  dayListData: AngularFireList<any>;
  monthListData: AngularFireList<any>;
  constructor(private firebase: AngularFireDatabase) { }
  getDataForDay(day: string, month: string, year: string) {
    return this.dayListData = this.firebase.list('proyectoEficienciaE/tarjeta1/datos/y' + year + '/m' + month + '/d' + day);
  }

  getDataMonth(month: string, year: string) {
    return this.monthListData = this.firebase.list('proyectoEficienciaE/tarjeta1/datos/y' + year + '/m' + month);
  }
}
