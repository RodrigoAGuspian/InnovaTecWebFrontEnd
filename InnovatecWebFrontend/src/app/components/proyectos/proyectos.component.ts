import { Component, OnInit, ViewEncapsulation, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Proyecto } from 'src/app/shared/models/proyecto';
import { ProyectoService } from 'src/app/shared/services/proyecto.service';
import { Resultado } from 'src/app/shared/models/resultado';
import { Grafica } from 'src/app/shared/models/grafica';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { MatDialog } from '@angular/material';
import { DialogForImgsComponent } from '../dialogs/dialog-for-imgs/dialog-for-imgs.component';
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
  public imgsProyecto: string [] = [];
  public solo1Vez = false;
  constructor(activateRoute: ActivatedRoute, private proyectoService: ProyectoService, public dialog: MatDialog) {
    this.proyectoId = activateRoute.snapshot.params.id;
   }


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

  ngOnInit() {
    this.solo1Vez = false;
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
        // this.createCarouselToHand();
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

    try {
      this.imgsProyecto = Object.values(this.proyecto.imgsProyecto);
      this.solo1Vez = true;

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

  ngOnDestroy() {
    try {
      $('.carousel.carousel-slider').destroy();
    } catch (error) {

    }

  }

  enviarATiempoReal() {

  }

}
