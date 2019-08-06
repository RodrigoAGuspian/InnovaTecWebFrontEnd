import { Component, OnInit } from '@angular/core';
import { ProyectoPeqService } from 'src/app/shared/services/proyecto-peq.service';
import { MatSnackBar } from '@angular/material';
import { ProyectoPeq } from 'src/app/shared/models/proyecto-peq';
declare const M;

@Component({
  selector: 'app-list-proyectos-peq',
  templateUrl: './list-proyectos-peq.component.html',
  styleUrls: ['./list-proyectos-peq.component.css']
})
export class ListProyectosPeqComponent implements OnInit {

  constructor(private proyectoPeqService: ProyectoPeqService, private snackBar: MatSnackBar) { }
  proyectosPeqList: ProyectoPeq[];
  enableTable = false;
  ngOnInit() {
    this.initializeModal();
    this.proyectoPeqService.getProyectos().snapshotChanges().subscribe(
      item => {
        this.proyectosPeqList = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          // tslint:disable-next-line: no-string-literal
          x['skey'] = element.key;
          this.proyectosPeqList.push(x as ProyectoPeq);
        });

        if (this.proyectosPeqList != null && this.proyectosPeqList.length > 0) {
          this.enableTable = true;
        } else {
          this.enableTable = false;
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

  onEdit(proyectoPeq: ProyectoPeq) {
    this.proyectoPeqService.aEProyecto = 'Editar Proyecto';
    this.proyectoPeqService.selectProyectoPeq = Object.assign({}, proyectoPeq);
    const chipsIntegrantes = M.Chips.getInstance($('.chips-integrantes'));
    const tmpIntegrantes: string[] = Object.values(this.proyectoPeqService.selectProyectoPeq.integrantes);
    tmpIntegrantes.forEach(element => {
      chipsIntegrantes.addChip({
        tag: element,
        image: '', // optional
      });
    });
  }


  onDelete(proyectoPeq: ProyectoPeq) {
    if (confirm('Estas seguro de eliminar este proyecto')) {
      this.proyectoPeqService.deleteProyectoPeq(proyectoPeq);
      this.snackBar.open('Operación exitosa.', 'Proyecto eliminado', {
        duration: 2000,
        panelClass: ['green-snackbar']
      });
    }
  }


  resetChips() {
    const chipsIntegrantes = M.Chips.getInstance($('.chips-integrantes')).chipsData;

    const chipsIntegrantesI = M.Chips.getInstance($('.chips-integrantes'));

    const index1 = chipsIntegrantes.length;

    for (let a = 0; a < 5; a++) {
      for (let i = 0; i < index1; i++) {
        chipsIntegrantesI.deleteChip(i);

      }
    }
  }
}
