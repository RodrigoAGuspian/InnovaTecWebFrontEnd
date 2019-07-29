import { Upload } from './../models/upload';
import { InfoImgNovedad } from './../models/info-img-novedad';
import { Injectable } from '@angular/core';
import { Novedad } from '../models/novedad';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class NovedadService {
  constructor(private firebaseDataBase: AngularFireDatabase, private storage: AngularFireStorage) { }

  public static controlarCambios = true;
  novedadList: AngularFireList<any>;
  selectNovedad: Novedad = new Novedad();

  getNovedades() {
    return this.novedadList = this.firebaseDataBase.list('novedades');
  }

  insertNovedad(novedad: Novedad) {
    this.novedadList.push({
      titulo: novedad.titulo,
      imgsNovedad: novedad.imgsNovedad,
      pathImgsNovedad: novedad.pathImgsNovedad,
      contenido: novedad.contenido,
    });
  }

  updateNovedad(novedad: Novedad) {
    this.novedadList.update(novedad.skey, {
      titulo: novedad.titulo,
      imgsNovedad: novedad.imgsNovedad,
      pathImgsNovedad: novedad.pathImgsNovedad,
      contenido: novedad.contenido,
    });
  }

  deleteNovedad(novedad: Novedad) {
    this.novedadList.remove(novedad.skey);
    const tmpList: string[] = Object.values(novedad.pathImgsNovedad);
    tmpList.forEach(element => {
        this.deleteFileStorage(element);
    });
  }

  deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(name).delete();
  }
}
