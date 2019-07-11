import { Observable, combineLatest } from 'rxjs';
import { Upload } from './../../../../shared/models/upload';
import { MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { NovedadService } from 'src/app/shared/services/novedad.service';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { Novedad } from 'src/app/shared/models/novedad';
import * as _ from 'lodash';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-novedad',
  templateUrl: './novedad.component.html',
  styleUrls: ['./novedad.component.css']
})
export class NovedadComponent implements OnInit {
  constructor(public fb: FormBuilder, public novedadService: NovedadService,  private snackBar: MatSnackBar,
              public afs: AngularFirestore, public storage: AngularFireStorage) { }
  linksDeDescarga: string[];
  filelist = [];
  uploads: any[];
  allPercentage: Observable<any>;
  files: Observable<any>;

  ngOnInit() {
    this.novedadService.getNovedades();
    this.resetForm();

  }

  resetForm(novedadForm?: NgForm) {
    if (novedadForm != null) {
// tslint:disable-next-line: no-unused-expression
      novedadForm.reset;
      this.novedadService.selectNovedad = new Novedad();
    }
  }

  insertInfo(novedadForm: NgForm) {
    for (let i = 0; i < this.uploads.length; i++) {
      const element = this.uploads[i];
      const tmp = this.novedadService.uploadFile(element);
      this.linksDeDescarga.push(tmp.urlDeLaImagen);
      if (i === this.uploads.length - 1) {
        const novedad = new Novedad();
        novedad.titulo = novedadForm.value.titulo;
        novedad.contenido = novedadForm.value.contenido;
        novedad.imgsNovedad = this.linksDeDescarga;
        this.novedadService.insertNovedad(novedad);
      }
    }
  }

  importImages(event) {
    // reset the array
    this.uploads = [];
    this.filelist = event.target.files;

  }

  onSubmit(novedadForm: NgForm) {
    const allPercentage: Observable<number>[] = [];
    for (let i = 0 ; i < this.filelist.length; i++) {
      const file = this.filelist[i];
      const path = `novedades/${file.name}`;
      const ref = this.storage.ref(path);
      const task = this.storage.upload(path, file);
      // tslint:disable-next-line: variable-name
      const _percentage$ = task.percentageChanges();
      allPercentage.push(_percentage$);

      // create composed object with different information. ADAPT THIS ACCORDING YOUR NEED
      const uploadTrack = {
        fileName: file.name,
        percentage: _percentage$
      };

      // push each upload into the array

      // for every upload do whatever you want in firestore with the uploaded file
      let tmpDownloadURL = ' ';
      task.then((f) => {
        f.ref.getDownloadURL().then(a => {
          tmpDownloadURL = a;
          this.uploads.push(tmpDownloadURL);
          if (i === this.filelist.length) {
            this.insertInfo(novedadForm);
          }
        });
    });

    }

    this.allPercentage = combineLatest(allPercentage)
      .pipe(
      map((percentages) => {
        let result = 0;
        for (const percentage of percentages) {
          result = result + percentage;
        }
        return result / percentages.length;
      }),
      tap(console.log)
      );
  }

}
