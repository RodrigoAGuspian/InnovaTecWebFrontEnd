import { Component, OnInit } from '@angular/core';
import { LineaDeInvestigacion } from 'src/app/shared/models/linea-de-investigacion';
import { SemilleroDeInvestigacionService } from 'src/app/shared/services/semillero-de-investigacion.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-list-linea-investigacion',
  templateUrl: './list-linea-investigacion.component.html',
  styleUrls: ['./list-linea-investigacion.component.css']
})
export class ListLineaInvestigacionComponent implements OnInit {
  public enableTableLineaInves = false;
  lineasDeInvestigacionList: LineaDeInvestigacion[] = [];
  constructor(public semilleroService: SemilleroDeInvestigacionService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.semilleroService.getLineasDeInvestigacion().snapshotChanges().subscribe(
      item => {
        this.lineasDeInvestigacionList = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          // tslint:disable-next-line: no-string-literal
          x['skey'] = element.key;
          this.lineasDeInvestigacionList.push(x as LineaDeInvestigacion);
        });

        if (this.lineasDeInvestigacionList != null && this.lineasDeInvestigacionList.length > 0) {
          this.enableTableLineaInves = true;
        } else {
          this.enableTableLineaInves = false;
        }
      }
    );
  }

  onEditLinea(linea: LineaDeInvestigacion) {
    this.semilleroService.selectLinea = Object.assign({}, linea);
    this.semilleroService.aElineaDe = 'Editar Linea de Investigación';
  }

  onDeleteLinea(linea: LineaDeInvestigacion) {
    if (confirm('¿Estas seguro de eliminar este línea de investigación?')) {
      this.semilleroService.deleteLineaDeInvestigacion(linea);
      this.snackBar.open('Operación exitosa.', 'Proyecto eliminado', {
        duration: 2000,
        panelClass: ['green-snackbar']
      });
    }
  }



}
