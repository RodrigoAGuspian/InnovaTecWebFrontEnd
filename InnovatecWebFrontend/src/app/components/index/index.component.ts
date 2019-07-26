import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  enviarA(valor: number) {
    switch (valor) {
      case 0:
        this.router.navigate(['']);
        break;

      case 1:
        this.router.navigate(['proyectos/']);
        break;

      case 2:
        this.router.navigate(['']);
        break;

      case 3:
        this.router.navigate(['iniciar-sesion/']);
        break;

    }
  }
}
