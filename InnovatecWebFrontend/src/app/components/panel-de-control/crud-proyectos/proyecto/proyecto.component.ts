import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { MatSnackBar } from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import { ProyectoService } from 'src/app/shared/services/proyecto.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { Proyecto } from 'src/app/shared/models/proyecto';
import { Resultado } from 'src/app/shared/models/resultado';
import { finalize } from 'rxjs/operators';
import { Grafica } from 'src/app/shared/models/grafica';
import { PreResultado } from 'src/app/shared/models/pre-resultado';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {
  linksDeDescarga: string[];
  filelist = [];
  fileResultado: any;
  filelistResultado: PreResultado[];
  pathfilelist: string[] = [];
  uploads: any[];
  pathfilelistResultados: string[] = [];
  uploadsResultados: any[];
  files: Observable<any>;
  formProyecto: NgForm;
  formFile: FormGroup;
  resultadosList: Resultado[] = [];
  preResultadosList: Resultado[] = [];
  autores: string[];
  objetivosE: string[];
  enableSubmit = true;
  infoGraficas: Grafica[];
  infoResultado: string;
  constructor(public fb: FormBuilder, public proyectoService: ProyectoService,  private snackBar: MatSnackBar,
              public storage: AngularFireStorage) {
    this.formFile = this.fb.group({
      multiplefile: [],
    });
  }

  ngOnInit() {
    this.proyectoService.getProyectos();
    this.resetForm();
    AngularFireModule.initializeApp(environment.firebase);
  }

  resetForm(proyectoForm?: NgForm) {
    if (proyectoForm != null) {
      // tslint:disable-next-line: no-unused-expression
      proyectoForm.reset;
      this.proyectoService.selectProyecto = new Proyecto();
    }
  }

  importImages(event) {
    // reset the array
    this.filelist = event.target.files;
  }

  importImageResultado(event) {
    this.filelistResultado = event.target.files[0];
  }

  onSubmit(formProyecto: NgForm) {
    this.formProyecto = formProyecto;
    this.uploads = [];
    this.pathfilelist = [];
    const allPercentage: Observable<number>[] = [];
    // tslint:disable-next-line: prefer-for-of
    if (this.formProyecto.value.skey != null ) {
      const tmpList: string[] = Object.values(this.proyectoService.selectProyecto.pathImgsProyecto);
      const tmpListResultados: Resultado[] = Object.values(this.proyectoService.selectProyecto.resultados);
      tmpList.forEach(element => {
        this.proyectoService.deleteFileStorage(element);
      });
      tmpListResultados.forEach(element => {
        this.proyectoService.deleteFileStorage(element.pathImgResultado);
      });
    }
    this.insertImgs();
    this.enableSubmit = false;

  }

  insertImgs() {
    for (const file of this.filelist) {
      const dateNow = Date.now();
      const path = 'proyectos/' + `${file.name}` + ' ' + dateNow;
      const ref = this.storage.ref(path);
      const task = this.storage.upload(path, file);
      // tslint:disable-next-line: variable-name
      const _percentage$ = task.percentageChanges();
      this.pathfilelist.push(path);
      const uploadTrack = {
        fileName: file.name,
        percentage: _percentage$
      };
      task.snapshotChanges().pipe( finalize(() => this.obtenerURL(ref.getDownloadURL()) )).subscribe();
    }

  }

  obtenerURL(url: Observable<string | null>, ) {
    url.forEach(element => {
      this.uploads.push(element);
      if (this.uploads.length === this.filelist.length) {
        this.insertImgsResultados();
      }
    });

  }

  insertImgsResultados() {
    this.filelistResultado.forEach(element => {
      this.resultadosList = [];
      const dateNow = Date.now();
      const path = 'proyectos/resultados/' + `${element.fileImgResultado.name}` + ' ' + dateNow;
      const ref = this.storage.ref(path);
      const task = this.storage.upload(path, element.fileImgResultado);
      task.snapshotChanges().pipe( finalize(() => this.obtenerURLImgResultado(ref.getDownloadURL(), path) )).subscribe();

    });

  }

  obtenerURLImgResultado(url: Observable<string | null>, path: string ) {
    url.forEach(element => {
      const resultado = new Resultado();
      const index = this.resultadosList.length;
      resultado.imgResultado = element;
      resultado.pathImgResultado = path;
      resultado.infoResultado = this.preResultadosList[index].imgResultado;
      this.resultadosList.push(resultado);
      if (this.resultadosList.length === this.filelistResultado.length) {
        this.insertInfo();
      }
    });
  }

  insertPreResultado() {
    const resultado = new Resultado();
    resultado.imgResultado = this.fileResultado;
    this.fileResultado = null;
    resultado.infoResultado = this.infoResultado;
    this.infoResultado = '';
    this.preResultadosList.push(resultado);
  }

  insertInfo() {
    this.linksDeDescarga = [];
    for (let i = 0; i < this.uploads.length; i++) {
      const element = this.uploads[i];
      this.linksDeDescarga.push(element);
      if (i === this.uploads.length - 1) {
        const proyecto = new Proyecto();
        proyecto.titulo = this.formProyecto.value.titulo;
        proyecto.imgsProyecto = this.uploads;
        proyecto.pathImgsProyecto = this.pathfilelist;
        proyecto.autores = this.autores;
        proyecto.resumen = this.formProyecto.value.resumen;
        proyecto.objetivoG = this.formProyecto.value.objetivoG;
        proyecto.objetivosE = this.objetivosE;
        proyecto.resultados = this.resultadosList;
        proyecto.infoGraficas = this.infoGraficas;

        if (this.formProyecto.value.skey == null) {
          this.proyectoService.insertProyecto(proyecto);
        } else {
          proyecto.skey = this.formProyecto.value.skey;
          this.proyectoService.updateProyecto(proyecto);
        }
        this.resetForm(this.formProyecto);
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
