import { ProyectoService } from 'src/app/shared/services/proyecto.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Proyecto } from 'src/app/shared/models/proyecto';
import { MatSnackBar } from '@angular/material';
import { Grafica } from 'src/app/shared/models/grafica';
import { Resultado } from 'src/app/shared/models/resultado';
import { PreResultado } from 'src/app/shared/models/pre-resultado';
import { initializeApp } from 'firebase';
declare const M;

@Component({
  selector: 'app-list-proyectos',
  templateUrl: './list-proyectos.component.html',
  styleUrls: ['./list-proyectos.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ListProyectosComponent implements OnInit {
  proyectosList: Proyecto[];
  public enableTable = false;
  constructor(private proyectoService: ProyectoService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.initializeModal();
    this.proyectoService.getProyectos().snapshotChanges().subscribe(
      item => {
        this.proyectosList = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          // tslint:disable-next-line: no-string-literal
          x['skey'] = element.key;
          this.proyectosList.push(x as Proyecto);
        });

        if (this.proyectosList != null && this.proyectosList.length > 0) {
          this.enableTable = true;
        }
      }
    );
  }

  initializeModal() {
    document.addEventListener('DOMContentLoaded', () => {
      const elems = document.querySelectorAll('.modal');
      const instances = M.Modal.init(elems, Option);
    });
  }

  onEdit(proyecto: Proyecto) {
    this.proyectoService.aEproyecto = 'Editar Proyecto';
    this.proyectoService.selectProyecto = Object.assign({}, proyecto);
    this.resetChips();
    const chipsAutores = M.Chips.getInstance($('.chips-autores'));
    const tmpAutores: string[] = Object.values(this.proyectoService.selectProyecto.autores);
    tmpAutores.forEach(element => {
       chipsAutores.addChip({
        tag: element,
        image: '', // optional
      });
    });

    const chipsObjtE = M.Chips.getInstance($('.chips-objetivos-especificos'));
    const tmpObjtE: string[] = Object.values(this.proyectoService.selectProyecto.objetivosE);
    tmpObjtE.forEach(element => {
      chipsObjtE.addChip({
        tag: element,
        image: '', // optional
      });
    });

    try {
      const tmpGrafica: Grafica[] = Object.values(this.proyectoService.selectProyecto.infoGraficas);
      this.proyectoService.infoGraficas = tmpGrafica;
    } catch (error) {

    }

    const instance = M.Modal.getInstance($('.modal'));
    instance.open();
    const promesaParaMensajeDePrecaucion = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('¡Éxito!');
      }, 8000);
    });

    promesaParaMensajeDePrecaucion.then(() => {
      instance.close();
    });


  }

  onDelete(proyecto: Proyecto) {
    if (confirm('Estas seguro de eliminar este proyecto')) {
      this.proyectoService.deleteProyecto(proyecto);
      this.resetChips();
      this.snackBar.open('Operación exitosa.', 'Proyecto eliminado', {
        duration: 2000,
        panelClass: ['green-snackbar']
      });
    }
  }

  resetChips() {
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
  }

}
