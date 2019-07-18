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
  novedadList: AngularFireList<any>;
  selectNovedad: Novedad = new Novedad();
  downloadURL: Observable<string>;
  uploadPercent: Observable<number>;
  infoImgNovedad: InfoImgNovedad = new InfoImgNovedad();

  constructor(private firebaseDataBase: AngularFireDatabase, private storage: AngularFireStorage) { }
  getNovedades() {
    return this.novedadList = this.firebaseDataBase.list('novedades');
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'name-your-file-path-here';
    const fileRef = this.storage.ref('novedades/' + filePath);
    const task = this.storage.upload(filePath, file);
    this.infoImgNovedad = new InfoImgNovedad();
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    this.uploadPercent.forEach(element => {
      this.infoImgNovedad.porcentajeDeCarga = element;
    });
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => this.getUrl(fileRef.getDownloadURL()))
     )
    .subscribe();
    return this.infoImgNovedad;
  }

  getUrl(fileRef: Observable<string>) {
    this.downloadURL = fileRef;
    this.downloadURL.forEach(element => {
      this.infoImgNovedad.urlDeLaImagen = element;
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

  insertNovedad(novedad: Novedad) {
    this.novedadList.push({
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
