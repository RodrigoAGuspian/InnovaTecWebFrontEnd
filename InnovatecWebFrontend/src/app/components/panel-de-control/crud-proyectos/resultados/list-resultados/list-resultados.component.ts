import { Component, OnInit } from '@angular/core';
import { PreResultado } from 'src/app/shared/models/pre-resultado';
import { ProyectoService } from 'src/app/shared/services/proyecto.service';

@Component({
  selector: 'app-list-resultados',
  templateUrl: './list-resultados.component.html',
  styleUrls: ['./list-resultados.component.css']
})
export class ListResultadosComponent implements OnInit {

  constructor(public proyectoService: ProyectoService) { }
  ngOnInit() {
  }

  onEdit(preResultado: PreResultado) {
    this.proyectoService.selectResultado = Object.assign({}, preResultado);
  }

  onDelete(preResultado: PreResultado) {
    if (this.proyectoService.preResultadosList.length > 1) {
      this.proyectoService.preResultadosList.splice(preResultado.skey, 1);
    } else {
      this.proyectoService.preResultadosList = [];
    }


  }

}
