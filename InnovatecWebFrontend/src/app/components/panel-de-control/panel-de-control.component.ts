import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatMenuTrigger } from '@angular/material';
import { RolesService } from 'src/app/shared/services/roles.service';
import { UserInfo } from 'src/app/shared/models/user-info';
import { UserInfoService } from 'src/app/shared/services/user-info.service';
declare let $: any;


@Component({
  selector: 'app-panel-de-control',
  templateUrl: './panel-de-control.component.html',
  styleUrls: ['./panel-de-control.component.css']
})
export class PanelDeControlComponent implements OnInit  {

  constructor(public authservice: AuthService, public router: Router, private rolesService: RolesService,
              private userInfoService: UserInfoService) { }

  public admin = false;
  public userInfo = new UserInfo();

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

    const user = JSON.parse(localStorage.getItem('user'));
    let rolSuperAdministrador = false;
    let rolAdministrador = false;
    this.rolesService.getSuperAdministradores().snapshotChanges().subscribe(
      item => {

        for (let i = 0; i < item.length; i++) {
          const element = item[i];
          const x = element.payload.toJSON();
          // tslint:disable-next-line: no-string-literal
          if (x['email'] === user.email ) {
            // tslint:disable-next-line: no-string-literal
              rolSuperAdministrador = true;
          }
          if (item.length - 1 === i) {

            this.rolesService.getAdministradores().snapshotChanges().subscribe(
              item1 => {
                item1.forEach(element1 => {
                  const x1 = element1.payload.toJSON();
                  // tslint:disable-next-line: no-string-literal
                  if (x1['email'] === user.email ) {
                    // tslint:disable-next-line: no-string-literal
                      rolAdministrador = true;
                  }
                });
                if (rolSuperAdministrador || rolAdministrador) {
                  this.admin = true;
                } else {
                  this.admin = false;
                }
              }
            );

          }
        }
      }
    );

    this.getUser();
  }

  public viewChangeIndex() {
    this.router.navigate(['panel-de-control']);
  }

  public getUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.userInfoService.getUsers().snapshotChanges().subscribe(
      item => {

        item.forEach(element => {
          const x = element.payload.toJSON();
          // tslint:disable-next-line: no-string-literal
          if (x['email'] === user.email ) {
            // tslint:disable-next-line: no-string-literal
            this.userInfo = x as UserInfo;
          }
        });
      }
    );


  }

  public viewChageRoles() {
    const user = JSON.parse(localStorage.getItem('user'));
    let rolSuperAdministrador = false;
    let rolAdministrador = false;
    this.rolesService.getSuperAdministradores().snapshotChanges().subscribe(
      item => {

        for (let i = 0; i < item.length; i++) {
          const element = item[i];
          const x = element.payload.toJSON();
          // tslint:disable-next-line: no-string-literal
          if (x['email'] === user.email ) {
            // tslint:disable-next-line: no-string-literal
              rolSuperAdministrador = true;
          }
          if (item.length - 1 === i) {

            this.rolesService.getAdministradores().snapshotChanges().subscribe(
              item1 => {
                item1.forEach(element1 => {
                  const x1 = element1.payload.toJSON();
                  // tslint:disable-next-line: no-string-literal
                  if (x1['email'] === user.email ) {
                    // tslint:disable-next-line: no-string-literal
                      rolAdministrador = true;
                  }
                });
                if (rolSuperAdministrador || rolAdministrador) {
                  this.router.navigate(['panel-de-control/administar-roles']);
                } else {
                  window.alert('Usted no puede acceder a esta dirección');
                  this.router.navigate(['']);
                }
              }
            );

          }
        }
      }
    );

  }

  public viewChageProyectos() {
    const user = JSON.parse(localStorage.getItem('user'));
    let rolSuperAdministrador = false;
    let rolAdministrador = false;
    this.rolesService.getSuperAdministradores().snapshotChanges().subscribe(
      item => {

        for (let i = 0; i < item.length; i++) {
          const element = item[i];
          const x = element.payload.toJSON();
          // tslint:disable-next-line: no-string-literal
          if (x['email'] === user.email ) {
            // tslint:disable-next-line: no-string-literal
              rolSuperAdministrador = true;
          }
          if (item.length - 1 === i) {

            this.rolesService.getAdministradores().snapshotChanges().subscribe(
              item1 => {
                item1.forEach(element1 => {
                  const x1 = element1.payload.toJSON();
                  // tslint:disable-next-line: no-string-literal
                  if (x1['email'] === user.email ) {
                    // tslint:disable-next-line: no-string-literal
                      rolAdministrador = true;
                  }
                });
                if (rolSuperAdministrador || rolAdministrador) {
                  this.router.navigate(['panel-de-control/registro-de-proyectos']);
                } else {
                  window.alert('Usted no puede acceder a esta dirección');
                  this.router.navigate(['']);
                }
              }
            );

          }
        }
      }
    );

  }

  public viewChageNovedades() {
    const user = JSON.parse(localStorage.getItem('user'));
    let rolSuperAdministrador = false;
    let rolAdministrador = false;
    this.rolesService.getSuperAdministradores().snapshotChanges().subscribe(
      item => {

        for (let i = 0; i < item.length; i++) {
          const element = item[i];
          const x = element.payload.toJSON();
          // tslint:disable-next-line: no-string-literal
          if (x['email'] === user.email ) {
            // tslint:disable-next-line: no-string-literal
              rolSuperAdministrador = true;
          }
          if (item.length - 1 === i) {

            this.rolesService.getAdministradores().snapshotChanges().subscribe(
              item1 => {
                item1.forEach(element1 => {
                  const x1 = element1.payload.toJSON();
                  // tslint:disable-next-line: no-string-literal
                  if (x1['email'] === user.email ) {
                    // tslint:disable-next-line: no-string-literal
                      rolAdministrador = true;
                  }
                });
                if (rolSuperAdministrador || rolAdministrador) {
                  this.router.navigate(['panel-de-control/registro-de-novedades']);
                } else {
                  window.alert('Usted no puede acceder a esta dirección');
                  this.router.navigate(['']);
                }
              }
            );

          }
        }
      }
    );

  }

  public viewChageSemillero() {
    const user = JSON.parse(localStorage.getItem('user'));
    let rolSuperAdministrador = false;
    let rolAdministrador = false;
    this.rolesService.getSuperAdministradores().snapshotChanges().subscribe(
      item => {

        for (let i = 0; i < item.length; i++) {
          const element = item[i];
          const x = element.payload.toJSON();
          // tslint:disable-next-line: no-string-literal
          if (x['email'] === user.email ) {
            // tslint:disable-next-line: no-string-literal
              rolSuperAdministrador = true;
          }
          if (item.length - 1 === i) {

            this.rolesService.getAdministradores().snapshotChanges().subscribe(
              item1 => {
                item1.forEach(element1 => {
                  const x1 = element1.payload.toJSON();
                  // tslint:disable-next-line: no-string-literal
                  if (x1['email'] === user.email ) {
                    // tslint:disable-next-line: no-string-literal
                      rolAdministrador = true;
                  }
                });
                if (rolSuperAdministrador || rolAdministrador) {
                  this.router.navigate(['panel-de-control/registro-semillero-de-investigacion']);
                } else {
                  window.alert('Usted no puede acceder a esta dirección');
                  this.router.navigate(['']);
                }
              }
            );

          }
        }
      }
    );

  }

  public viewChangeProSolar(modo: number) {
    this.router.navigate([this.urlProSolar[modo]]);
  }

  public viewChangeEenergias(modo: number) {
    this.router.navigate([this.urlEenergias[modo]]);
  }


}
