import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { NovedadService } from 'src/app/shared/services/novedad.service';
import { Novedad } from 'src/app/shared/models/novedad';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class IndexComponent implements OnInit {
  novedadesList: Novedad[];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  };
  constructor(private novedadesService: NovedadService) { }
  ngOnInit() {
    this.novedadesService.getNovedades().snapshotChanges().subscribe(
      item => {
        this.novedadesList = [];
// tslint:disable-next-line: no-shadowed-variable
        item.forEach(element => {
          const x = element.payload.toJSON();
// tslint:disable-next-line: no-string-literal
          x['skey'] = element.key;
          this.novedadesList.push(x as Novedad);
        });
      }
    );
  }




}
