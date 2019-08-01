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
declare const $: any;
declare const M;

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {
  enableSubmit = true;
  linksDeDescarga: string[];
  filelist = [];
  fileImgResultado: any;
  pathfilelist: string[] = [];
  uploads: any[];
  pathfilelistResultados: string[] = [];
  uploadsResultados: any[];
  files: Observable<any>;
  formProyecto: NgForm;
  formFile: FormGroup;
  resultadosList: Resultado[] = [];

  elemsAutores: any;
  instancesAutores: any;
  elemsObjE: any;
  instancesObjE: any;

  constructor(public fb: FormBuilder, public proyectoService: ProyectoService,  private snackBar: MatSnackBar,
              public storage: AngularFireStorage) {
    this.formFile = this.fb.group({
      multiplefile: [],
    });
  }

  ngOnInit() {
    this.proyectoService.aEproyecto = 'Añadir Proyecto';
    this.proyectoService.getProyectos();
    this.resetForm();
    this.initializeChips();
    AngularFireModule.initializeApp(environment.firebase);
  }



  public resetForm(proyectoForm?: NgForm) {
    if (proyectoForm != null) {
      // tslint:disable-next-line: no-unused-expression
      proyectoForm.reset;
      this.proyectoService.selectProyecto = new Proyecto();

      const chipsAutores = M.Chips.getInstance($('.chips-autores')).chipsData;
      const chipsObjE = M.Chips.getInstance($('.chips-objetivos-especificos')).chipsData;

      const chipsAutoresI = M.Chips.getInstance($('.chips-autores'));
      const chipsObjEI = M.Chips.getInstance($('.chips-objetivos-especificos'));

      const index1 = chipsAutores.length;
      const index2 = chipsObjE.length;

      for (let a = 0; a < 5; a++) {
        for (let i = 0; i < index1; i++) {
          chipsAutoresI.deleteChip(i);

        }

        for (let i = 0; i < index2; i++) {
          chipsObjEI.deleteChip(i);

        }
      }

      this.proyectoService.aEproyecto = 'Añadir Proyecto';
    }
  }


  importImages(event) {
    // reset the array
    this.filelist = event.target.files;
  }

  onSubmit(formProyecto: NgForm) {
    const chipsAutores = M.Chips.getInstance($('.chips-autores')).chipsData;
    const autores: string[] = [];
    chipsAutores.forEach(element1 => {
      autores.push(element1.tag);
    });

    if (autores.length <= 0) {
      this.snackBar.open('Error.', 'Por favor ingrese al menos un(a) autor(a).' , {
        duration: 2000,
        panelClass: ['red-snackbar']
      });
    } else {

      if (this.proyectoService.preResultadosList.length <= 0 ) {
        this.snackBar.open('Error.', 'Por favor ingrese al menos un resultado.' , {
          duration: 2000,
          panelClass: ['red-snackbar']
        });

      } else {
        this.formProyecto = formProyecto;
        this.uploads = [];
        this.pathfilelist = [];
        if (this.formProyecto.value.skey != null ) {
          const tmpList: string[] = Object.values(this.proyectoService.selectProyecto.pathImgsProyecto);
          const tmpListResultados: Resultado[] = Object.values(this.proyectoService.selectProyecto.resultados);
          tmpList.forEach(element => {
            this.proyectoService.deleteFileStorage(element);
          });
        }
        this.insertImgs();
        this.enableSubmit = false;
      }
    }

  }

  insertImgs() {
    for (const file of this.filelist) {
      const dateNow = Date.now();
      const path = 'proyectos/' + `${file.name}` + ' ' + dateNow;
      const ref = this.storage.ref(path);
      const task = this.storage.upload(path, file);
      this.pathfilelist.push(path);
      task.snapshotChanges().pipe( finalize(() => this.obtenerURL(ref.getDownloadURL()) )).subscribe();
    }

  }

  obtenerURL(url: Observable<string | null>, ) {
    url.forEach(element => {
      this.uploads.push(element);
      if (this.uploads.length === this.filelist.length) {
        this.proyectoService.preResultadosList.forEach(element1 => {
          const resultado = new Resultado();
          resultado.infoResultado = element1.infoResultado;
          this.resultadosList.push(resultado);
        });
        this.insertInfo();
      }
    });

  }


  initializeChips() {

    $('.chips-autores').chips({
      placeholder: ' ',
      secondaryPlaceholder: '+',
    });
    $('.chips-objetivos-especificos').chips({
      placeholder: ' ',
      secondaryPlaceholder: '+',
    });

    document.addEventListener('DOMContentLoaded', () => {
      this.elemsAutores = document.querySelectorAll('.chips-autores');
      this.instancesAutores = M.Chips.init(this.elemsAutores, Option);
    });

    document.addEventListener('DOMContentLoaded', () => {
      this.elemsObjE = document.querySelectorAll('.chips-objetivos-especificos');
      this.instancesObjE = M.Chips.init(this.elemsObjE, Option);
    });

  }

  insertGrafica(formGrafica: NgForm) {
    const grafica = new Grafica();
    grafica.linkDeLaGrafica = formGrafica.value.linkDeLaGrafica;
    grafica.tipoDeGrafica = formGrafica.value.tipoDeGrafica;
    this.proyectoService.infoGraficas.push(grafica);
  }

  insertInfo() {
    this.linksDeDescarga = [];

    const chipsAutores = M.Chips.getInstance($('.chips-autores')).chipsData;
    const autores: string[] = [];
    chipsAutores.forEach(element1 => {
      autores.push(element1.tag);
    });

    const chipsObjE = M.Chips.getInstance($('.chips-objetivos-especificos')).chipsData;
    const objetivosE: string[] = [];
    chipsObjE.forEach(element1 => {
      objetivosE.push(element1.tag);
    });


    for (let i = 0; i < this.uploads.length; i++) {
      const element = this.uploads[i];
      this.linksDeDescarga.push(element);
      if (i === this.uploads.length - 1) {
        const proyecto = new Proyecto();
        proyecto.titulo = this.formProyecto.value.titulo;
        proyecto.imgsProyecto = this.uploads;
        proyecto.pathImgsProyecto = this.pathfilelist;

        proyecto.autores = autores;
        proyecto.resumen = this.formProyecto.value.resumen;
        proyecto.objetivoG = this.formProyecto.value.objetivoG;
        proyecto.objetivosE = objetivosE;
        proyecto.resultados = this.resultadosList;
        proyecto.infoGraficas = this.proyectoService.infoGraficas;

        if (this.formProyecto.value.skey == null) {
          this.proyectoService.insertProyecto(proyecto);
        } else {
          proyecto.skey = this.formProyecto.value.skey;
          this.proyectoService.updateProyecto(proyecto);
        }
        this.resetForm(this.formProyecto);
        this.formFile.reset();
        this.enableSubmit = true;
        this.proyectoService.aEproyecto = 'Añadir Proyecto';
        this.snackBar.open('Operación exitosa.', 'Se ha añadido un nuevo proyecto.' , {
          duration: 2000,
          panelClass: ['green-snackbar']
        });
      }
    }

  }
}
