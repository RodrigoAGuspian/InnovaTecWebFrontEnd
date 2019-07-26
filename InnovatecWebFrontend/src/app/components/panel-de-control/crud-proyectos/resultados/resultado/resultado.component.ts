import { Component, OnInit } from '@angular/core';
import { PreResultado } from 'src/app/shared/models/pre-resultado';
import { ProyectoComponent } from '../../proyecto/proyecto.component';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { ListResultadosComponent } from '../list-resultados/list-resultados.component';
import { ProyectoService } from 'src/app/shared/services/proyecto.service';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {
  fileImgResultado: any;
  formFile: FormGroup = new FormGroup({
    basicfile: new FormControl()
  });
  constructor(public proyectoService: ProyectoService) { }

  ngOnInit() {
  }

  insertPreResultado(formPreResultado: NgForm) {
    if (formPreResultado.value.skey == null) {
      const resultado = new PreResultado();
      const index = this.proyectoService.preResultadosList.length;
      resultado.skey = index;
      resultado.fileImgResultado = this.fileImgResultado;
      this.fileImgResultado = null;
      resultado.infoResultado = formPreResultado.value.infoResultado;
      this.proyectoService.preResultadosList.push(resultado);
    } else {
      for (let i = 0; i < this.proyectoService.preResultadosList.length; i++) {
        const element = this.proyectoService.preResultadosList[i];
        if (element.skey === i) {
          element.infoResultado = formPreResultado.value.infoResultado;
          element.fileImgResultado = this.fileImgResultado;
      }
      }
    }


  }



  importImageResultado(event) {
    this.fileImgResultado = event.target.files[0];
  }

}
