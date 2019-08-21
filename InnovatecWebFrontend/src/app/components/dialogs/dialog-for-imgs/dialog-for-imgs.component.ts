import { Component, OnInit } from '@angular/core';
import { ProyectoService } from 'src/app/shared/services/proyecto.service';
import { NovedadService } from 'src/app/shared/services/novedad.service';

@Component({
  selector: 'app-dialog-for-imgs',
  templateUrl: './dialog-for-imgs.component.html',
  styleUrls: ['./dialog-for-imgs.component.css']
})
export class DialogForImgsComponent implements OnInit {

  constructor() { }
  public static identificador = 0;
  public img = '';

  ngOnInit() {
    if (DialogForImgsComponent.identificador === 0) {
      this.img = ProyectoService.imgParaResultado;
    } else {
      this.img = NovedadService.imgParaResultado;
    }

  }

}
