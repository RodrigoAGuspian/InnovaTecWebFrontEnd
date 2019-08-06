import { Component, OnInit } from '@angular/core';
import { ProyectoPeqService } from 'src/app/shared/services/proyecto-peq.service';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { ProyectoPeq } from 'src/app/shared/models/proyecto-peq';
import { MatSnackBar } from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
declare const $: any;
declare const M;

@Component({
  selector: 'app-proyecto-peq',
  templateUrl: './proyecto-peq.component.html',
  styleUrls: ['./proyecto-peq.component.css']
})
export class ProyectoPeqComponent implements OnInit {
  formFile: FormGroup;
  linksDeDescarga: string[];
  filelist = [];
  formProyectoPeq: NgForm;
  pathfilelist: string[] = [];
  uploads: any[];
  elemsIntegrantes: any;
  instancesIntegrantes: any;
  public enableSubmit = true;

  constructor(public fb: FormBuilder, public proyectoPeqService: ProyectoPeqService, private snackBar: MatSnackBar,
              public storage: AngularFireStorage) {
    this.formFile = this.fb.group({
      multiplefile: [],
    });
   }

  ngOnInit() {
    this.proyectoPeqService.aEProyecto = 'Añadir Proyecto';
    this.proyectoPeqService.getProyectos();
    this.resetForm();
    this.initializeChips();
  }

  public resetForm(proyectoForm?: NgForm) {
    if (proyectoForm != null) {
      // tslint:disable-next-line: no-unused-expression
      proyectoForm.reset;
      this.proyectoPeqService.selectProyectoPeq = new ProyectoPeq();
      const chipsIntegrantes = M.Chips.getInstance($('.chips-integrantes')).chipsData;
      const chipsIntegrantesI = M.Chips.getInstance($('.chips-integrantes'));
      const index1 = chipsIntegrantes.length;

      for (let a = 0; a < 5; a++) {
        for (let i = 0; i < index1; i++) {
          chipsIntegrantesI.deleteChip(i);

        }
      }

      this.proyectoPeqService.aEProyecto = 'Añadir Proyecto';
    }
  }

  initializeChips() {
    $('.chips-integrantes').chips({
      placeholder: ' ',
      secondaryPlaceholder: '+',
    });

    document.addEventListener('DOMContentLoaded', () => {
      this.elemsIntegrantes = document.querySelectorAll('.chips-integrantes');
      this.instancesIntegrantes = M.Chips.init(this.elemsIntegrantes, Option);
    });


  }

  importImages(event) {
    // reset the array
    this.filelist = event.target.files;
  }

  onSubmit(formProyectoPeq: NgForm) {
    const chipsIntegrantes = M.Chips.getInstance($('.chips-integrantes')).chipsData;
    const integrates: string[] = [];
    chipsIntegrantes.forEach(element1 => {
      integrates.push(element1.tag);
    });

    if (integrates.length <= 0) {
      this.snackBar.open('Error.', 'Por favor ingrese al menos un(a) autor(a).' , {
        duration: 2000,
        panelClass: ['red-snackbar']
      });
    } else {
      this.formProyectoPeq = formProyectoPeq;
      this.uploads = [];
      this.pathfilelist = [];
      if (this.formProyectoPeq.value.skey != null ) {
        const tmpList: string[] = Object.values(this.proyectoPeqService.selectProyectoPeq.pathImagenes);
        tmpList.forEach(element => {
          this.proyectoPeqService.deleteFileStorage(element);
        });
      }
      this.insertImgs();
      this.enableSubmit = false;

    }


  }

  insertImgs() {

    if (this.filelist.length <= 0) {
      this.snackBar.open('Error.', 'Por favor ingrese al menos una imagen.' , {
        duration: 2000,
        panelClass: ['red-snackbar']
      });
    }
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
        this.insertInfo();
      }
    });

  }

  insertInfo() {
    this.linksDeDescarga = [];

    const chipsIntegrantes = M.Chips.getInstance($('.chips-integrantes')).chipsData;
    const integrantes: string[] = [];
    chipsIntegrantes.forEach(element1 => {
      integrantes.push(element1.tag);
    });

    for (let i = 0; i < this.uploads.length; i++) {
      const element = this.uploads[i];
      this.linksDeDescarga.push(element);
      if (i === this.uploads.length - 1) {
        const proyectoPeq = new ProyectoPeq();
        proyectoPeq.nombre = this.formProyectoPeq.value.nombre;
        proyectoPeq.imagenes = this.uploads;
        proyectoPeq.pathImagenes = this.pathfilelist;

        proyectoPeq.integrantes = integrantes;
        proyectoPeq.programaDeFormacion = this.formProyectoPeq.value.programa;
        proyectoPeq.colaboraciones = this.formProyectoPeq.value.colaboraciones;

        if (this.formProyectoPeq.value.skey == null) {
          this.proyectoPeqService.insertProyectoPeq(proyectoPeq);
        } else {
          proyectoPeq.skey = this.formProyectoPeq.value.skey;
          this.proyectoPeqService.updateProyectoPeq(proyectoPeq);
        }
        this.resetForm(this.formProyectoPeq);
        this.formFile.reset();
        this.enableSubmit = true;
        this.proyectoPeqService.aEProyecto = 'Añadir Proyecto';
        this.snackBar.open('Operación exitosa.', 'Se ha añadido un nuevo proyecto desarrollado.' , {
          duration: 2000,
          panelClass: ['green-snackbar']
        });
      }
    }

  }
}
