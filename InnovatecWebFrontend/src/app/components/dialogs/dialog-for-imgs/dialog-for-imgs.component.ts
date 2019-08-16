import { Component, OnInit } from '@angular/core';
import { ProyectoService } from 'src/app/shared/services/proyecto.service';

@Component({
  selector: 'app-dialog-for-imgs',
  templateUrl: './dialog-for-imgs.component.html',
  styleUrls: ['./dialog-for-imgs.component.css']
})
export class DialogForImgsComponent implements OnInit {

  constructor() { }
  public img = '';
  ngOnInit() {
    this.img = ProyectoService.imgParaResultado;
  }

}
