import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SemilleroDeInvestigacionService } from 'src/app/shared/services/semillero-de-investigacion.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-semillero-de-investigacion',
  templateUrl: './semillero-de-investigacion.component.html',
  styleUrls: ['./semillero-de-investigacion.component.css']
})
export class SemilleroDeInvestigacionComponent implements OnInit {
  inscripcionesData: string;
  enableSemillero = true;
  constructor(public semilleroService: SemilleroDeInvestigacionService, private snackBar: MatSnackBar) {
   }

  ngOnInit() {
    this.semilleroService.getInscripciones().snapshotChanges().subscribe(action => {
      const x = action.payload.toJSON();
      // tslint:disable-next-line: no-string-literal
      this.inscripcionesData = x['inscripciones'] as string;
    });
  }

  updateInfo(formSemillero: NgForm) {
    this.enableSemillero = false;
    const data: string = formSemillero.value.inscripciones;
    if (data.length > 0) {
      this.semilleroService.updateInscripciones(data);
      this.snackBar.open('Operación exitosa.', 'Se ha actualizado el campo inscripciones.' , {
        duration: 2000,
        panelClass: ['green-snackbar']
      });
      this.enableSemillero = true;

    } else {
      this.snackBar.open('Error al actualizar.', 'Por favor ingrese algo en el campo inscripciones.' , {
        duration: 2000,
        panelClass: ['red-snackbar']
      });
      this.enableSemillero = true;
    }

  }


}
