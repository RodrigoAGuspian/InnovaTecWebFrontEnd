import { Component, OnInit } from '@angular/core';
import { ProyectoService } from 'src/app/shared/services/proyecto.service';
import { Proyecto } from 'src/app/shared/models/proyecto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-de-proyectos',
  templateUrl: './lista-de-proyectos.component.html',
  styleUrls: ['./lista-de-proyectos.component.css']
})
export class ListaDeProyectosComponent implements OnInit {
  proyectosList: Proyecto[] = [];
  constructor(private proyectoService: ProyectoService, public router: Router) {}

  ngOnInit() {
    this.proyectoService.getProyectos().snapshotChanges().subscribe(
      item => {
        this.proyectosList = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          // tslint:disable-next-line: no-string-literal
          x['skey'] = element.key;
          this.proyectosList.push(x as Proyecto);
        });

        if (this.proyectosList != null && this.proyectosList.length > 0) {

        }
      }
    );
  }

  public enviarA(proyecto: Proyecto) {
    let id;
    for (let i = 0; i < this.proyectosList.length; i++) {
      if (proyecto === this.proyectosList[i]) {
        id = i;
      }
    }
    this.router.navigate(['proyectos/' + id]);

  }

}
