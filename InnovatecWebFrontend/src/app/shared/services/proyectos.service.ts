import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  proyectosList: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) { }
}
