import { Observable, combineLatest } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { NovedadService } from 'src/app/shared/services/novedad.service';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { Novedad } from 'src/app/shared/models/novedad';
import * as _ from 'lodash';
import { AngularFireStorage } from '@angular/fire/storage';
import { tap, map, finalize } from 'rxjs/operators';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-novedad',
  templateUrl: './novedad.component.html',
  styleUrls: ['./novedad.component.css']
})
export class NovedadComponent implements OnInit {
  linksDeDescarga: string[];
  filelist = [];
  pathfilelist: string[] = [];
  uploads: any[];
  files: Observable<any>;
  formNovedad: NgForm;
  formFile: FormGroup;
  enableSubmit = true;
  constructor(public fb: FormBuilder, public novedadService: NovedadService,  private snackBar: MatSnackBar,
              public storage: AngularFireStorage) {
    this.formFile = this.fb.group({
      multiplefile: [],
    });
  }
  ngOnInit() {
    this.novedadService.getNovedades();
    this.resetForm();
    AngularFireModule.initializeApp(environment.firebase);
  }

  resetForm(novedadForm?: NgForm) {
    if (novedadForm != null) {
// tslint:disable-next-line: no-unused-expression
      novedadForm.reset;
      this.novedadService.selectNovedad = new Novedad();
    }
  }

  importImages(event) {
    // reset the array
    this.filelist = event.target.files;
  }

  onSubmit(formNovedad: NgForm) {
    this.formNovedad = formNovedad;
    this.uploads = [];
    this.pathfilelist = [];
    const allPercentage: Observable<number>[] = [];
    // tslint:disable-next-line: prefer-for-of
    if (this.formNovedad.value.skey != null ) {
      const tmpList: string[] = Object.values(this.novedadService.selectNovedad.pathImgsNovedad);
      tmpList.forEach(element => {
        this.novedadService.deleteFileStorage(element);
      });
    }
    for (const file of this.filelist) {
      const dateNow = Date.now();
      const path = 'novedades/' + `${file.name}` + ' ' + dateNow;
      const ref = this.storage.ref(path);
      const task = this.storage.upload(path, file);
      // tslint:disable-next-line: variable-name
      const _percentage$ = task.percentageChanges();
      allPercentage.push(_percentage$);
      this.pathfilelist.push(path);
      const uploadTrack = {
        fileName: file.name,
        percentage: _percentage$
      };
      task.snapshotChanges().pipe( finalize(() => this.obtenerURL(ref.getDownloadURL()) )).subscribe();
    }

    this.enableSubmit = false;

  }

  obtenerURL(url: Observable<string | null>, ) {
    url.forEach(element => {
      this.uploads.push(element);
      if (this.uploads.length === this.filelist.length) {
        this.insertInfo();
      }
    });

  }

  insertInfo() {
    this.linksDeDescarga = [];
    for (let i = 0; i < this.uploads.length; i++) {
      const element = this.uploads[i];
      this.linksDeDescarga.push(element);
      if (i === this.uploads.length - 1) {
        const novedad = new Novedad();
        novedad.titulo = this.formNovedad.value.titulo;
        novedad.contenido = this.formNovedad.value.contenido;
        novedad.imgsNovedad = this.linksDeDescarga;
        novedad.pathImgsNovedad = this.pathfilelist;
        if (this.formNovedad.value.skey == null) {
          this.novedadService.insertNovedad(novedad);
        } else {
          novedad.skey = this.formNovedad.value.skey;
          this.novedadService.updateNovedad(novedad);
        }
        this.resetForm(this.formNovedad);
        this.formFile.reset();
        this.enableSubmit = true;
        this.snackBar.open('Operación exitosa.', 'Se ha añadido una nueva novedad.' , {
          duration: 2000,
          panelClass: ['green-snackbar']
        });
      }
    }
  }

}
