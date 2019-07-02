import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class NovedadesService {
  novedadesList: AngularFireList<any>;
  constructor(private firebase: AngularFireDatabase) { }
}
