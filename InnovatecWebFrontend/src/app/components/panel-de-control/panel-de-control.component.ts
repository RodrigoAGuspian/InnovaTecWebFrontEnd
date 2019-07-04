import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatMenuTrigger } from '@angular/material';
declare let $: any;


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
    'panel-de-control/prosolar-consultar-por-mes',
    'panel-de-control/prosolar-resumen',
  ];

  private urlEenergias = [
    'panel-de-control/eenergias-tarjeta1-tiempo-real',
    'panel-de-control/eenergias-consultar-por-dia',
    'panel-de-control/eenergias-consultar-por-semana',
    'panel-de-control/eenergias-consultar-por-mes',
    'panel-de-control/eenergias-resumen',
  ];

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  someMethod() {
    this.trigger.openMenu();
  }

  ngOnInit() {
    $('.sidenav').sidenav();
    $('.dropdown-trigger').dropdown({
      belowOrigin: true,
      alignment: 'left',
      inDuration: 200,
      outDuration: 150,
      constrain_width: true,
      hover: false,
      gutter: 1
    });
  }

  public viewChangeIndex() {
    this.router.navigate(['panel-de-control']);
  }

  public viewChangeProSolar(modo: number) {
    this.router.navigate([this.urlProSolar[modo]]);
  }

  public viewChangeEenergias(modo: number) {
    this.router.navigate([this.urlEenergias[modo]]);
  }


}
