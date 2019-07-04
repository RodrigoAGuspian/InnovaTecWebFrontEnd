import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-panel-de-control',
  templateUrl: './panel-de-control.component.html',
  styleUrls: ['./panel-de-control.component.css']
})
export class PanelDeControlComponent implements OnInit  {


  constructor(public authservice: AuthService, public router: Router) { }

  private urlProSolar = [
    'panel-de-control/pro-solar-tiempo-real',
    'panel-de-control/prosolar-consultar-por-dia',
    'panel-de-control/prosolar-consultar-por-semana',
    'panel-de-control/prosolar-consultar-por-mes'];

  private urlEenergias = [
    'panel-de-control/eenergias-tarjeta1-tiempo-real',
    'panel-de-control/eenergias-consultar-por-dia',
    'panel-de-control/eenergias-consultar-por-semana',
    'panel-de-control/eenergias-consultar-por-mes',
  ];

  ngOnInit() {
  }

  public viewChangeIndex() {
    this.router.navigate(['iniciar-sesion']);
  }

  public viewChangeProSolar(modo: number) {
    this.router.navigate([this.urlProSolar[modo]]);
  }

  public viewChangeEenergias(modo: number) {
    this.router.navigate([this.urlEenergias[modo]]);
  }


}
