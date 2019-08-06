import { Component, OnInit } from '@angular/core';
import { SemilleroDeInvestigacionService } from 'src/app/shared/services/semillero-de-investigacion.service';
import { ObjetivoSemillero } from 'src/app/shared/models/objetivo-semillero';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-list-objetivos',
  templateUrl: './list-objetivos.component.html',
  styleUrls: ['./list-objetivos.component.css']
})
export class ListObjetivosComponent implements OnInit {
  enableTableObjetivo = false;
  objetivosList: ObjetivoSemillero[] = [];
  constructor(public semilleroService: SemilleroDeInvestigacionService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.semilleroService.getObjetivos().snapshotChanges().subscribe(
      item => {
        this.objetivosList = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          // tslint:disable-next-line: no-string-literal
          x['skey'] = element.key;
          this.objetivosList.push(x as ObjetivoSemillero);
        });

        if (this.objetivosList != null && this.objetivosList.length > 0) {
          this.enableTableObjetivo = true;
        } else {
          this.enableTableObjetivo = false;
        }
      }
    );
  }


  onEditObjetivo(objetivo: ObjetivoSemillero) {
    this.semilleroService.selectObjetivo = Object.assign({}, objetivo);
    this.semilleroService.aEObjetivo = 'Editar Objetivo';

  }

  onDeleteObjetivo(objetivo: ObjetivoSemillero) {
    if (confirm('¿Estas seguro de eliminar este objetivo?')) {
      this.semilleroService.deleteObjetivo(objetivo);
      this.snackBar.open('Operación exitosa.', 'Proyecto eliminado', {
        duration: 2000,
        panelClass: ['green-snackbar']
      });
    }
  }
}
