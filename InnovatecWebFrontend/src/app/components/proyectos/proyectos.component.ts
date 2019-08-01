import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Proyecto } from 'src/app/shared/models/proyecto';
import { ProyectoService } from 'src/app/shared/services/proyecto.service';
import { Resultado } from 'src/app/shared/models/resultado';
import { Grafica } from 'src/app/shared/models/grafica';
declare const $: any;

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProyectosComponent implements OnInit, OnDestroy {

  public proyectoId = '';
  private proyectosList = [];
  public proyecto = new Proyecto();
  public autores: string[] = [];
  public objsEsp: string[] = [];
  public resultados: Resultado[] = [];
  public graficas: Grafica[] = [];
  public listNombreGrafica: Grafica[] = [];
  public graficasOrdenadas: string [][] = [];
  constructor(activateRoute: ActivatedRoute, private proyectoService: ProyectoService) {
    this.proyectoId = activateRoute.snapshot.params.id;
   }

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
        this.inputId();
      }
    );
  }

  inputId() {
    if (this.proyectoId != null) {
      const id = Number(this.proyectoId);

      if (id != null || !isNaN(id)) {
        this.proyecto = this.proyectosList[id];
        this.inputInfoInList();
        this.createCarouselToHand();
      } else {
        console.log('Error en el id');
      }

    }

  }

  inputInfoInList() {
    try {
      this.autores = Object.values(this.proyecto.autores);
    } catch (error) {

    }

    try {
      this.objsEsp = Object.values(this.proyecto.objetivosE);
    } catch (error) {

    }

    try {
      this.resultados = Object.values(this.proyecto.resultados);
    } catch (error) {

    }

    try {
      this.graficas = Object.values(this.proyecto.infoGraficas);
      this.listNombreGrafica  = this.removeDuplicates(this.graficas);



    } catch (error) {

    }

  }

  removeDuplicates(originalArray) {
    let newArray = [];
    const lookupObject  = {};
    newArray = originalArray.filter((current) => {
      const exists = !lookupObject[current.id] || false;
      lookupObject[current.id] = true;
      return exists;
    });
    return newArray;
}

  createCarouselToHand() {
    const aCarouselItem = '<a class="carousel-item" >';
    const tmpList: string[] = Object.values(this.proyecto.imgsProyecto);
    tmpList.forEach(element => {
      // tslint:disable-next-line: max-line-length
      const responsiveConfig = 'width: 100%; height: 350px; background-position: center center; background-repeat: no-repeat; background-size: cover;';
      const vistaImg = '<div class="imgs-slider card " style="' + responsiveConfig + 'background-image: url(' + element + ');">';
      const appendValue = aCarouselItem + vistaImg + '</div> </a>';
      $('.carousel.carousel-slider')
        .append(appendValue);
    });

    if ($('.carousel.carousel-slider').hasClass('initialized')) {
      $('.carousel.carousel-slider').removeClass('initialized');
    }

    let autoplay = true;

    if (ProyectoService.controlarCambios) {
      setInterval(() =>  {
        if (autoplay) { $('.carousel.carousel-slider').carousel('next'); }
      }, 5000);
      ProyectoService.controlarCambios = false;
    }

    $('.carousel.carousel-slider').hover(() =>  { autoplay = false; }, () =>  { autoplay = true; });
    $('.carousel.carousel-slider').carousel({
      fullWidth: true,
      indicators: true,
    });

    $(document).ready(() => {
      $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true,
        duration: 200,
      });
    });

  }

  ngOnDestroy() {
    try {
      $('.carousel.carousel-slider').destroy();
    } catch (error) {

    }

  }


}
