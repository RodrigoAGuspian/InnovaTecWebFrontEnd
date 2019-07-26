import { Component, OnInit } from '@angular/core';
import { Grafica } from 'src/app/shared/models/grafica';
import { ProyectoComponent } from '../../proyecto/proyecto.component';
import { ProyectoService } from 'src/app/shared/services/proyecto.service';

@Component({
  selector: 'app-list-graficas',
  templateUrl: './list-graficas.component.html',
  styleUrls: ['./list-graficas.component.css']
})
export class ListGraficasComponent implements OnInit {
  constructor(public proyectoService: ProyectoService) { }

  ngOnInit() {

  }

  onEdit(grafica: Grafica) {
    this.proyectoService.selectGrafica = Object.assign({}, grafica);
  }

  onDelete(grafica: Grafica) {
    this.proyectoService.infoGraficas.splice(grafica.skey, 1);

  }


}
