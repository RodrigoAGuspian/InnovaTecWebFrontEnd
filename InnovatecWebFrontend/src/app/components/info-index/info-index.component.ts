import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { Novedad } from 'src/app/shared/models/novedad';
import { NovedadService } from 'src/app/shared/services/novedad.service';
import { Router } from '@angular/router';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, Color, BaseChartDirective } from 'ng2-charts';
import { DatosProSolarService } from 'src/app/shared/services/datos-pro-solar.service';
import { RealTimeProSolar } from 'src/app/shared/models/real-time-pro-solar';

declare const $: any;

@Component({
  selector: 'app-info-index',
  templateUrl: './info-index.component.html',
  styleUrls: ['./info-index.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class InfoIndexComponent implements OnInit, AfterViewInit {

  novedadesList: Novedad[];
  public realTimeList: RealTimeProSolar[] = [];
  public dataValuesRT: number[] = [];
  colorLine = 'rgba(229,57,53,1)';
  colorBorder = 'rgba(227,73,59,1)';
  valueLabel = 'Irradiancia';
  public deteccion = true;
  public charDataSets: ChartDataSets = { data: this.dataValuesRT, label: this.valueLabel };
  public lineChartData = [this.charDataSets] ;
  public lineChartLabels: Label[] = [];
  public solo1Vez = true;
  public lineChartColors: Color[] = [
    {
      borderColor: this.colorLine,
      backgroundColor: 'rgba(0,0,0,0)',
      pointBorderColor: this.colorBorder,
      pointBackgroundColor: this.colorBorder,
    },
  ];

  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

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

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  constructor(private novedadesService: NovedadService, public router: Router, public infoList: DatosProSolarService) { }
  ngOnInit() {
    this.infoList.getRealTimeData().snapshotChanges().subscribe(item => {
      this.realTimeList = [];
      // tslint:disable-next-line: no-shadowed-variable
      item.forEach(element => {
        const x = element.payload.toJSON();
        // tslint:disable-next-line: no-string-literal
        x['skey'] = element.key;
        this.realTimeList.push(x as RealTimeProSolar);
      });
      this.InputValuesChart();


    });
  }

  ngAfterViewInit() {
    this.novedadesService.getNovedades().snapshotChanges().subscribe(
      item => {
        this.novedadesList = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          // tslint:disable-next-line: no-string-literal
          x['skey'] = element.key;
          this.novedadesList.push(x as Novedad);
        });
        if (this.solo1Vez) {
          this.solo1Vez = false;
          // this.createCarouselToHand();

        }
      }
    );
  }


  enviarA(i: number) {
    this.router.navigate(['novedades/' + i]);
  }

  private getTime(date?: Date) {
    return date != null ? new Date(date).getTime() : 0;
  }

  public sortByStartDate(array: RealTimeProSolar[]): RealTimeProSolar[] {
    return array.sort((a: RealTimeProSolar, b: RealTimeProSolar) => {
      return this.getTime(this.parseStringToDate(a.fechaActual1)) - this.getTime(this.parseStringToDate(b.fechaActual1));
    });
  }

  public parseStringToDate(dateString: string) {
    const dateParts = dateString.split(' ');
    const dateParts1 = dateParts[0].split('-');
    const dateParts2 = dateParts[1].split(':');
    const day = Number(dateParts1[0]);
    const month = Number(dateParts1[1]) - 1;
    const year = Number(dateParts1[2]);
    const hour = Number(dateParts2[0]);
    const min = Number(dateParts2[1]);
    const sec = Number(dateParts2[2]);
    return new Date(year, month, day, hour, min, sec);
  }


  InputValuesChart() {
    const listSort = this.sortByStartDate(this.realTimeList);

    for (let index = 0; index < listSort.length; index++) {
      const element = listSort[index];
      if (this.deteccion) {
        this.dataValuesRT.push(Number(element.irradiancia));
        this.valueLabel = 'Irradiancia';

        this.lineChartLabels.push(element.hora);
        this.deteccion = false;
      } else {
        this.dataValuesRT[index] = (Number(element.irradiancia));
        this.valueLabel = 'Irradiancia';
        this.lineChartLabels[index] = (element.hora);

      }

    }
    this.charDataSets = { data: this.dataValuesRT, label: this.valueLabel };
    try {this.chart.chart.update(); } catch (error) {}

  }

}
