import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NovedadService } from 'src/app/shared/services/novedad.service';
import { Novedad } from 'src/app/shared/models/novedad';
declare const $: any;

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css'],
})
export class NovedadesComponent implements OnInit {
  public novedadId = '';
  private novedadesList = [];
  public novedad = new Novedad();
  constructor(activateRoute: ActivatedRoute, private novedadesService: NovedadService) {
    this.novedadId = activateRoute.snapshot.params.id;
   }

  ngOnInit() {
    try {
      $('.carousel.carousel-slider').destroy();
    } catch (error) {

    }

    this.novedadesService.getNovedades().snapshotChanges().subscribe(
      item => {
        this.novedadesList = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          // tslint:disable-next-line: no-string-literal
          x['skey'] = element.key;
          this.novedadesList.push(x as Novedad);
        });
        this.inputId();
      }
    );
  }

  inputId() {
    if (this.novedadId != null) {
      const id = Number(this.novedadId);

      if (id != null || !isNaN(id)) {
        this.novedad = this.novedadesList[id];
        this.createCarouselToHand();
      } else {
        console.log('Error en el id');
      }

    }

  }

  createCarouselToHand() {
    const aCarouselItem = '<a class="carousel-item" >';
    const tmpList: string[] = Object.values(this.novedad.imgsNovedad);
    tmpList.forEach(element => {
      // tslint:disable-next-line: max-line-length
      const responsiveConfig = 'height:400px; background-position: center center; background-repeat: no-repeat; background-size: cover;';
      const vistaImg = '<div class="imgs-slider card " style="' + responsiveConfig + 'background-image: url(' + element + ');">';
      const appendValue = aCarouselItem + vistaImg + '</div> </a>';
      console.log(appendValue);
      $('.carousel.carousel-slider')
        .append(appendValue);
    });

    if ($('.carousel.carousel-slider').hasClass('initialized')) {
      $('.carousel.carousel-slider').removeClass('initialized');
    }

    let autoplay = true;
    if (NovedadService.controlarCambios) {
      setInterval(() =>  {
        if (autoplay) { $('.carousel.carousel-slider').carousel('next'); }
      }, 5000);
      NovedadService.controlarCambios = false;
    }
    $('.carousel.carousel-slider').hover(() =>  { autoplay = false; }, () =>  { autoplay = true; });

    $(document).ready(() => {
      $('.carousel.carousel-slider').carousel({
        fullWidth: false,
        indicators: true,
        duration: 200,
      });
    });

  }


}
