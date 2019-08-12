import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SemilleroDeInvestigacionService } from 'src/app/shared/services/semillero-de-investigacion.service';
import { ProyectoPeq } from 'src/app/shared/models/proyecto-peq';
import { ProyectoPeqService } from 'src/app/shared/services/proyecto-peq.service';
declare const $: any;
declare const M;

@Component({
  selector: 'app-semillero-de-investigacion-p',
  templateUrl: './semillero-de-investigacion-p.component.html',
  styleUrls: ['./semillero-de-investigacion-p.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SemilleroDeInvestigacionPComponent implements OnInit {
  public inscripciones: string;
  public listaDeObjetivos: string[] = [];
  public listaDeLineasDeInves: string[] = [];
  public proyectosPeq: ProyectoPeq[] = [];
  constructor(private semilleroInvService: SemilleroDeInvestigacionService, private proyectosPeqService: ProyectoPeqService) {
  }

  ngOnInit() {
    this.getInscripciones();
    this.getObjetivos();
    this.getLineasDeInvestigacion();
    this.getProyectosPeq();
  }


  getInscripciones() {
    this.semilleroInvService.getInscripciones().snapshotChanges().subscribe(
      item => {
        const x = item.payload.toJSON();
        // tslint:disable-next-line: no-string-literal
        this.inscripciones = x['inscripciones'];
      }
    );
  }


  getObjetivos() {
    this.semilleroInvService.getObjetivos().snapshotChanges().subscribe(
      item => {
        this.listaDeObjetivos = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          // tslint:disable-next-line: no-string-literal
          const objetivo = x['objetivo'];
          this.listaDeObjetivos.push(objetivo);
        });

      }
    );
  }

  getLineasDeInvestigacion() {
    this.semilleroInvService.getLineasDeInvestigacion().snapshotChanges().subscribe(
      item => {
        this.listaDeLineasDeInves = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          // tslint:disable-next-line: no-string-literal
          const linea = x['linea'];
          this.listaDeLineasDeInves.push(linea);
        });

      }
    );
  }


  getProyectosPeq() {
    this.proyectosPeqService.getProyectos().snapshotChanges().subscribe(
      item => {
        this.proyectosPeq = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          // tslint:disable-next-line: no-string-literal
          x['skey'] = element.key;
          const tmpProyectoPeq = new ProyectoPeq();
          // tslint:disable-next-line: no-string-literal
          tmpProyectoPeq.nombre = x['nombre'];
          // tslint:disable-next-line: no-string-literal
          tmpProyectoPeq.colaboraciones = x['colaboraciones'];
          // tslint:disable-next-line: no-string-literal
          tmpProyectoPeq.programaDeFormacion = x['programaDeFormacion'];
          // tslint:disable-next-line: no-string-literal
          tmpProyectoPeq.integrantes = Object.values(x['integrantes']);
          // tslint:disable-next-line: no-string-literal
          tmpProyectoPeq.imagenes = Object.values(x['imagenes']);

          this.proyectosPeq.push(tmpProyectoPeq);
        });
        this.setProyectosToHand();
      }
    );
  }

  setProyectosToHand() {
    let fullData = '<ul class="collection">';
    this.proyectosPeq.forEach(element => {
      const data1 = '<li class="collection-item por-abajo"><h5 class="light pasaPalabra">' + element.nombre + '</h5>';
      const data2 = '<h6 class="light pasaPalabra">Programa de formación: ' + element.programaDeFormacion + '</h6>';
      let data3 =  '<div><span>Integrantes:';
      element.integrantes.forEach(element1 => {
        data3 += '<h6 class="light pasaPalabra">' + element1 + '</h6>';

      });
      data3 += '</span></div>';
      const data4 = '<h6 class="light pasaPalabra">Colaboraciones:' + element.colaboraciones + '</h6>';
      let data5 = '<div class="row">';
      element.imagenes.forEach(element1 => {
        data5 += '<img class="materialboxed col" width="250" src="' + element1 + '">';

      });
      data5 += '</div></li>';

      fullData += data1 + data2 + data3 + data4 + data5;
    });

    fullData += '</ul>';
    $('#proyectos').append(fullData);

    if ($('#proyectos').hasClass('initialized')) {
      $('#proyectos').removeClass('initialized');
    }
    this.setBoxed();
  }


  setBoxed() {
    $(document).ready(() => {
      $('.materialboxed').materialbox();
    });
  }

}
