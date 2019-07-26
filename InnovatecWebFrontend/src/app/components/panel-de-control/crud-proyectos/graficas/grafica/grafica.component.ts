import { Component, OnInit } from '@angular/core';
import { ProyectoComponent } from '../../proyecto/proyecto.component';
import { NgForm } from '@angular/forms';
import { Grafica } from 'src/app/shared/models/grafica';
import { ProyectoService } from 'src/app/shared/services/proyecto.service';


@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {

  constructor(public proyectoService: ProyectoService) { }

  ngOnInit() {
  }

  uploadGrafica(formGrafica: NgForm) {
    if (formGrafica.value.skey == null) {
      const grafica = new Grafica();
      const index = this.proyectoService.preResultadosList.length;
      grafica.skey = index;
      grafica.tipoDeGrafica = formGrafica.value.nombreDeGrafica;
      grafica.tipoDeGrafica = formGrafica.value.tipoDeGrafica;
      grafica.linkDeLaGrafica = formGrafica.value.linkDeLaGrafica;
      this.proyectoService.infoGraficas.push(grafica);
    } else {
      for (let i = 0; i < this.proyectoService.infoGraficas.length; i++) {
        const element = this.proyectoService.infoGraficas[i];
        if (element.skey === i) {
          element.tipoDeGrafica = formGrafica.value.tipoDeGrafica;
          element.linkDeLaGrafica = formGrafica.value.linkDeLaGrafica;
        }
      }
    }
  }

}
