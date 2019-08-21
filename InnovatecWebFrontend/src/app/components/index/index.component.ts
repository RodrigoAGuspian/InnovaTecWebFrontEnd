import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class IndexComponent implements OnInit {

  constructor(private router: Router, public authService: AuthService) { }
  public autenticado = 0;
  ngOnInit() {
    console.log(this.authService.isLoggedIn);
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    if (this.authService.isLoggedIn) {
      this.autenticado = 1;
    } else {
      this.autenticado = 0;
    }
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
        this.router.navigate(['semillero-de-investigacion']);
        break;

      case 3:
        this.router.navigate(['iniciar-sesion']);
        break;

      case 4:
        this.router.navigate(['panel-de-control']);
        break;
      case 5:
        this.authService.SignOut();
        break;

    }
  }
}
