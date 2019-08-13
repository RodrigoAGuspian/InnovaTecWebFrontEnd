import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Novedad } from 'src/app/shared/models/novedad';
import { NovedadService } from 'src/app/shared/services/novedad.service';
import { Router } from '@angular/router';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

declare const $: any;

@Component({
  selector: 'app-info-index',
  templateUrl: './info-index.component.html',
  styleUrls: ['./info-index.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class InfoIndexComponent implements OnInit {

  novedadesList: Novedad[];

  public config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: false,
    mousewheel: false,
    scrollbar: false,
    navigation: true,
    pagination: false,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    speed: 1000,
  };

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
    const divCaption = '<div style="cursor: pointer" class="caption right-align"> <h3>';

    for (let index = 0; index < this.novedadesList.length; index++) {

      const element = this.novedadesList[index];
      const vistaImagen = '<img class="imagen-slider" src="' + element.imgsNovedad[0] + '">';
      const vistaTitutlo = divCaption + element.titulo + '</h3>';
      // const vistaContenido = '<h4 class="light white-text" maxlength=20>' + element.contenido + '</h4>';
      const appendValue = '<li> <a id="item-' + index + '">' + vistaImagen + vistaTitutlo + '</div> </a> </li>';
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
