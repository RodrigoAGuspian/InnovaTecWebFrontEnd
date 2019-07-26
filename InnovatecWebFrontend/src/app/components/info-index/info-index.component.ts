import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Novedad } from 'src/app/shared/models/novedad';
import { NovedadService } from 'src/app/shared/services/novedad.service';
import { Router } from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-info-index',
  templateUrl: './info-index.component.html',
  styleUrls: ['./info-index.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class InfoIndexComponent implements OnInit {

  novedadesList: Novedad[];
  constructor(private novedadesService: NovedadService, public router: Router) { }
  ngOnInit() {

    this.novedadesService.getNovedades().snapshotChanges().subscribe(
      item => {
        this.novedadesList = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          // tslint:disable-next-line: no-string-literal
          x['skey'] = element.key;
          this.novedadesList.push(x as Novedad);
        });
        this.createCarouselToHand();
      }
    );
  }


  createCarouselToHand() {
    const divCaption = '<div style="cursor: pointer" class="caption right-align"> <h2>';

    for (let index = 0; index < this.novedadesList.length; index++) {

      const element = this.novedadesList[index];
      const vistaImagen = '<img class="imagen-slider" src="' + element.imgsNovedad[0] + '">';
      const vistaTitutlo = divCaption + element.titulo + '</h2>';
      const vistaContenido = '<h4 class="light white-text" maxlength=50>' + element.contenido + '</h4>';
      const appendValue = '<li> <a id="item-' + index + '">' + vistaImagen + vistaTitutlo + vistaContenido + '</div> </a> </li>';
      $('.slides').append(appendValue);
      $( '#item-' + index ).click(() => {
        this.router.navigate(['novedades/' + index]);
      });


    }

    if ($('.slider').hasClass('initialized')) {
      $('.slider').removeClass('initialized');
    }
    $(document).ready(() => {
      $('.slider').slider();
    });

  }



}
