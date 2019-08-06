import { Component, OnInit } from '@angular/core';
import { SemilleroDeInvestigacionService } from 'src/app/shared/services/semillero-de-investigacion.service';
import { MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms/src/forms';
import { ObjetivoSemillero } from 'src/app/shared/models/objetivo-semillero';

@Component({
  selector: 'app-objetivo',
  templateUrl: './objetivo.component.html',
  styleUrls: ['./objetivo.component.css']
})
export class ObjetivoComponent implements OnInit {

  constructor(public semilleroService: SemilleroDeInvestigacionService, private snackBar: MatSnackBar) { }
  public enableObjetivo = true;
  ngOnInit() {
    this.semilleroService.getObjetivos();
    this.resetForm();
  }

  onSubmit(formObjetivo: NgForm) {
    this.enableObjetivo = false;
    const objetivo = new ObjetivoSemillero();
    objetivo.objetivo = formObjetivo.value.objetivo;
    if (formObjetivo.value.skey == null) {
      this.semilleroService.insertObjetivo(objetivo);
    } else {
      objetivo.skey = formObjetivo.value.skey;
      this.semilleroService.updateObjetivo(objetivo);

    }
    this.resetForm(formObjetivo);
  }

  public resetForm(formObjetivo?: NgForm) {
    if (formObjetivo != null) {
      // tslint:disable-next-line: no-unused-expression
      formObjetivo.reset;
      this.semilleroService.selectObjetivo = new ObjetivoSemillero();
      this.enableObjetivo = true;

    }
  }

}
