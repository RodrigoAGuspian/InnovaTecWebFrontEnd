import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SemilleroDeInvestigacionService } from 'src/app/shared/services/semillero-de-investigacion.service';
import { MatSnackBar } from '@angular/material';
import { LineaDeInvestigacion } from 'src/app/shared/models/linea-de-investigacion';

@Component({
  selector: 'app-linea-investigacion',
  templateUrl: './linea-investigacion.component.html',
  styleUrls: ['./linea-investigacion.component.css']
})
export class LineaInvestigacionComponent implements OnInit {

  constructor(public semilleroService: SemilleroDeInvestigacionService, private snackBar: MatSnackBar) { }
  public enableLinea = true;
  ngOnInit() {
    this.semilleroService.getLineasDeInvestigacion();
    this.resetForm();
  }

  onSubmit(formLineas: NgForm) {
    this.enableLinea = false;
    const linea = new LineaDeInvestigacion();
    linea.linea = formLineas.value.linea;
    if (formLineas.value.skey == null) {
      this.semilleroService.insertLineasDeInvestigacion(linea);
    } else {
      linea.skey = formLineas.value.skey;
      this.semilleroService.updateLineaDeInvestigacion(linea);
    }

    this.resetForm(formLineas);
  }

  public resetForm(formLineas?: NgForm) {
    if (formLineas != null) {
      // tslint:disable-next-line: no-unused-expression
      formLineas.reset;
      this.semilleroService.aElineaDe = 'Añadir Linea de Investigación';
      this.enableLinea = true;
      this.semilleroService.selectLinea = new LineaDeInvestigacion();

    }
  }

}
