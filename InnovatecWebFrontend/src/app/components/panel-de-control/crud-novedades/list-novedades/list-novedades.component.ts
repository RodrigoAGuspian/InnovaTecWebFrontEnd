import { MatSnackBar } from '@angular/material';
import { NovedadService } from './../../../../shared/services/novedad.service';
import { Novedad } from './../../../../shared/models/novedad';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-novedades',
  templateUrl: './list-novedades.component.html',
  styleUrls: ['./list-novedades.component.css']
})
export class ListNovedadesComponent implements OnInit {
  novedadesList: Novedad[];
  constructor(private novedadService: NovedadService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.novedadService.getNovedades().snapshotChanges().subscribe(
      item => {
        this.novedadesList = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          // tslint:disable-next-line: no-string-literal
          x['skey'] = element.key;
          this.novedadesList.push(x as Novedad);
        });
      }
    );
  }

  onEdit(novedad: Novedad) {
    this.novedadService.selectNovedad = Object.assign({}, novedad);
    this.novedadService.aENovedad = 'Editar Novedad';
  }

  onDelete(novedad: Novedad) {
    if (confirm('Estas seguro de eliminar esta novedad')) {
      this.novedadService.deleteNovedad(novedad);
      this.snackBar.open('Operación exitosa.', 'Novedad eliminada', {
        duration: 2000,
        panelClass: ['green-snackbar']
      });
    }
  }

}
