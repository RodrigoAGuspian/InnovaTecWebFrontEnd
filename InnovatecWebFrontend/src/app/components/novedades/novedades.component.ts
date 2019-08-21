import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NovedadService } from 'src/app/shared/services/novedad.service';
import { Novedad } from 'src/app/shared/models/novedad';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { MatDialog } from '@angular/material';
import { DialogForImgsComponent } from '../dialogs/dialog-for-imgs/dialog-for-imgs.component';
import { Lightbox, IAlbum } from 'ngx-lightbox';
declare const $: any;

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class NovedadesComponent implements OnInit {
  public novedadId = '';
  private novedadesList = [];
  public novedad = new Novedad();
  public solo1Vez = false;
  public solo1Vez1 = true;
  public imgsNovedad: string[] = [];
  public config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 3,
    keyboard: false,
    mousewheel: false,
    scrollbar: false,
    navigation: true,
    pagination: false,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 1000,
  };
  constructor(activateRoute: ActivatedRoute, private novedadesService: NovedadService,
              public dialog: MatDialog, private lightbox: Lightbox) {
    this.novedadId = activateRoute.snapshot.params.id;
  }
  ngOnInit() {
    this.solo1Vez = false;
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
        // this.createCarouselToHand();
      } else {
        console.log('Error en el id');
      }

    }

    try {
      this.imgsNovedad = Object.values(this.novedad.imgsNovedad);
      this.solo1Vez = true;

    } catch (error) {

    }

  }

  public masGrande(img: string) {
    NovedadService.imgParaResultado = img;
    DialogForImgsComponent.identificador = 1;
    this.dialog.open(DialogForImgsComponent);

    console.log('Abre');
  }

  agregarJQuery() {
    if (this.solo1Vez1){
      this.solo1Vez1 = false;
      const pro = new Promise((resolve, reject) => {
        for (let i = 0; i < this.imgsNovedad.length; i++) {
          $('#a' + i).click(() => {
            this.masGrande(this.imgsNovedad[i]);
          });
          console.log(this.imgsNovedad.length);
          if(this.imgsNovedad.length - 1 === i) {
            resolve(true);
          }
        }
      });
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
