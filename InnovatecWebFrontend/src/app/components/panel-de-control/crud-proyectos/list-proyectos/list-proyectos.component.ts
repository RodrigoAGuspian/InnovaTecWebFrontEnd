import { ProyectoService } from 'src/app/shared/services/proyecto.service';
import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/shared/models/proyecto';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-list-proyectos',
  templateUrl: './list-proyectos.component.html',
  styleUrls: ['./list-proyectos.component.css']
})
export class ListProyectosComponent implements OnInit {
  proyectosList: Proyecto[];
  constructor(private proyectoService: ProyectoService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.proyectoService.getProyectos().snapshotChanges().subscribe(
      item => {
        this.proyectosList = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          // tslint:disable-next-line: no-string-literal
          x['skey'] = element.key;
          this.proyectosList.push(x as Proyecto);
        });
      }
    );
  }

  onEdit(proyecto: Proyecto) {
    this.proyectoService.selectProyecto = Object.assign({}, proyecto);
  }

  onDelete(proyecto: Proyecto) {
    if (confirm('Estas seguro de eliminar este proyecto')) {
      this.proyectoService.deleteProyecto(proyecto);
      this.snackBar.open('Operación exitosa.', 'Proyecto eliminado', {
        duration: 2000,
        panelClass: ['green-snackbar']
      });
    }
  }


}
