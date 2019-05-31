import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, BaseChartDirective } from 'ng2-charts';
import { RealTimeProSolarService } from 'src/app/shared/services/real-time-pro-solar.service';
import { RealTimeProSolar } from 'src/app/shared/models/real-time-pro-solar';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-real-time-chart',
  templateUrl: './real-time-chart.component.html',
  styleUrls: ['./real-time-chart.component.css']
})
export class RealTimeChartComponent implements OnInit {

  constructor(public infoList: RealTimeProSolarService) {

    this.InizialiteValues();

  }
  modos: number[] = [1, 2, 4];
  chartsEnables: boolean[] = [true, false, false, false];

  public realTimeList: RealTimeProSolar[] = [];
  public dataValuesRT: number[] = [];

  colorLine: string;
  colorBorder: string;
  valueLabel: string;

  public charDataSets: ChartDataSets = { data: this.dataValuesRT, label: this.valueLabel };
  public lineChartData = [this.charDataSets] ;
  public lineChartLabels: Label[] = [];

  public dataValuesRT1: number[] = [];

  colorLine1: string;
  colorBorder1: string;
  valueLabel1: string;

  public charDataSets1: ChartDataSets = { data: this.dataValuesRT1, label: this.valueLabel1 };
  public lineChartData1 = [this.charDataSets] ;
  public lineChartLabels1: Label[] = [];

  public dataValuesRT2: number[] = [];

  colorLine2: string;
  colorBorder2: string;
  valueLabel2: string;

  public charDataSets2: ChartDataSets = { data: this.dataValuesRT2, label: this.valueLabel2 };
  public lineChartData2 = [this.charDataSets] ;
  public lineChartLabels2: Label[] = [];

  public dataValuesRT3: number[] = [];

  colorLine3: string;
  colorBorder3: string;
  valueLabel3: string;

  public charDataSets3: ChartDataSets = { data: this.dataValuesRT3, label: this.valueLabel3 };
  public lineChartData3 = [this.charDataSets] ;
  public lineChartLabels3: Label[] = [];

  public deteccion = true;
  public modoGraficar = 2;
  public modoGraficar1 = 0;
  public modoGraficar2 = 3;
  public modoGraficar3 = 4;

  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };
  public lineChartColors: Color[] = [
    {
      borderColor: this.colorLine,
      backgroundColor: 'rgba(0,0,0,0)',
      pointBorderColor: this.colorBorder,
      pointBackgroundColor: this.colorBorder,
    },
  ];
  public lineChartColors1: Color[] = [
    {
      borderColor: this.colorLine1,
      backgroundColor: 'rgba(0,0,0,0)',
      pointBorderColor: this.colorBorder1,
      pointBackgroundColor: this.colorBorder1,
    },
  ];

  public lineChartColors2: Color[] = [
    {
      borderColor: this.colorLine2,
      backgroundColor: 'rgba(0,0,0,0)',
      pointBorderColor: this.colorBorder2,
      pointBackgroundColor: this.colorBorder2,
    },
  ];

  public lineChartColors3: Color[] = [
    {
      borderColor: this.colorLine3,
      backgroundColor: 'rgba(0,0,0,0)',
      pointBorderColor: this.colorBorder3,
      pointBackgroundColor: this.colorBorder3,
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

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

  InizialiteValues() {
    switch (this.modoGraficar) {
      case 0:
        this.colorLine = 'rgba(104,186,224,1)';
        this.colorBorder = 'rgba(28,136,176,1)';
        this.valueLabel = 'Humedad';
        break;

      case 1:
        this.colorLine = 'rgba(255,138,101,1)';
        this.colorBorder = 'rgba(230,155,105,1)';
        this.valueLabel = 'Temeperatura';
        break;

      case 2:
        this.colorLine = 'rgba(229,57,53,1)';
        this.colorBorder = 'rgba(227,73,59,1)';
        this.valueLabel = 'Irradiancia';
        break;

      case 3:
        this.colorLine = 'rgba(153,125,53,1)';
        this.colorBorder = 'rgba(128,64,0,1)';
        this.valueLabel = 'Corriente';
        break;

      case 4:
        this.colorLine = 'rgba(230,201,100,1)';
        this.colorBorder = 'rgba(197,162,60,1)';
        this.valueLabel = 'Voltaje';
        break;

      default:
        break;
    }

    switch (this.modoGraficar1) {
      case 0:
        this.colorLine1 = 'rgba(104,186,224,1)';
        this.colorBorder1 = 'rgba(28,136,176,1)';
        this.valueLabel1 = 'Humedad';
        break;

      case 1:
        this.colorLine1 = 'rgba(255,138,101,1)';
        this.colorBorder1 = 'rgba(230,155,105,1)';
        this.valueLabel1 = 'Temeperatura';
        break;

      case 2:
        this.colorLine1 = 'rgba(229,57,53,1)';
        this.colorBorder1 = 'rgba(227,73,59,1)';
        this.valueLabel1 = 'Irradiancia';
        break;

      case 3:
        this.colorLine1 = 'rgba(153,125,53,1)';
        this.colorBorder1 = 'rgba(128,64,0,1)';
        this.valueLabel1 = 'Corriente';
        break;

      case 4:
        this.colorLine1 = 'rgba(230,201,100,1)';
        this.colorBorder1 = 'rgba(197,162,60,1)';
        this.valueLabel1 = 'Voltaje';
        break;

      default:
        break;
    }

    switch (this.modoGraficar2) {
      case 0:
        this.colorLine2 = 'rgba(104,186,224,1)';
        this.colorBorder2 = 'rgba(28,136,176,1)';
        this.valueLabel2 = 'Humedad';
        break;

      case 1:
        this.colorLine2 = 'rgba(255,138,101,1)';
        this.colorBorder2 = 'rgba(230,155,105,1)';
        this.valueLabel2 = 'Temeperatura';
        break;

      case 2:
        this.colorLine2 = 'rgba(229,57,53,1)';
        this.colorBorder2 = 'rgba(227,73,59,1)';
        this.valueLabel2 = 'Irradiancia';
        break;

      case 3:
        this.colorLine2 = 'rgba(153,125,53,1)';
        this.colorBorder2 = 'rgba(128,64,0,1)';
        this.valueLabel2 = 'Corriente';
        break;

      case 4:
        this.colorLine2 = 'rgba(230,201,100,1)';
        this.colorBorder2 = 'rgba(197,162,60,1)';
        this.valueLabel2 = 'Voltaje';
        break;

      default:
        break;
    }

    switch (this.modoGraficar3) {
      case 0:
        this.colorLine3 = 'rgba(104,186,224,1)';
        this.colorBorder3 = 'rgba(28,136,176,1)';
        this.valueLabel3 = 'Humedad';
        break;

      case 1:
        this.colorLine3 = 'rgba(255,138,101,1)';
        this.colorBorder3 = 'rgba(230,155,105,1)';
        this.valueLabel3 = 'Temeperatura';
        break;

      case 2:
        this.colorLine3 = 'rgba(229,57,53,1)';
        this.colorBorder3 = 'rgba(227,73,59,1)';
        this.valueLabel3 = 'Irradiancia';
        break;

      case 3:
        this.colorLine3 = 'rgba(153,125,53,1)';
        this.colorBorder3 = 'rgba(128,64,0,1)';
        this.valueLabel3 = 'Corriente';
        break;

      case 4:
        this.colorLine3 = 'rgba(230,201,100,1)';
        this.colorBorder3 = 'rgba(197,162,60,1)';
        this.valueLabel3 = 'Voltaje';
        break;

      default:
        break;
    }
    this.lineChartColors = [
      {
        borderColor: this.colorLine,
        backgroundColor: 'rgba(0,0,0,0)',
        pointBorderColor: this.colorBorder,
        pointBackgroundColor: this.colorBorder,
      },
    ];
    this.lineChartColors1 = [
      {
        borderColor: this.colorLine1,
        backgroundColor: 'rgba(0,0,0,0)',
        pointBorderColor: this.colorBorder1,
        pointBackgroundColor: this.colorBorder1,
      },
    ];

    this.lineChartColors2 = [
      {
        borderColor: this.colorLine2,
        backgroundColor: 'rgba(0,0,0,0)',
        pointBorderColor: this.colorBorder2,
        pointBackgroundColor: this.colorBorder2,
      },
    ];

    this.lineChartColors3 = [
      {
        borderColor: this.colorLine3,
        backgroundColor: 'rgba(0,0,0,0)',
        pointBorderColor: this.colorBorder3,
        pointBackgroundColor: this.colorBorder3,
      },
    ];
    this.charDataSets = { data: this.dataValuesRT, label: this.valueLabel };
    this.charDataSets1 = { data: this.dataValuesRT1, label: this.valueLabel1 };
    this.charDataSets2 = { data: this.dataValuesRT2, label: this.valueLabel2 };
    this.charDataSets3 = { data: this.dataValuesRT3, label: this.valueLabel3 };
    this.lineChartData = [this.charDataSets] ;
    this.lineChartData1 = [this.charDataSets1] ;
    this.lineChartData2 = [this.charDataSets2] ;
    this.lineChartData3 = [this.charDataSets3] ;

  }
  InputValuesChart() {
    const listSort = this.sortByStartDate(this.realTimeList);

    for (let index = 0; index < listSort.length; index++) {
      const element = listSort[index];
      if (this.deteccion) {
        switch (this.modoGraficar) {
          case 0:
            this.dataValuesRT.push(Number(element.humedad));
            this.valueLabel = 'Humedad';
            break;

          case 1:
            this.dataValuesRT.push(Number(element.temperatura));
            this.valueLabel = 'Temperatura';
            break;

          case 2:
            this.dataValuesRT.push(Number(element.irradiancia));
            this.valueLabel = 'Irradiancia';
            break;


          case 3:
            this.dataValuesRT.push(Number(element.corrientePanel));
            this.valueLabel = 'Corriente';
            break;

          case 4:
            this.dataValuesRT.push(Number(element.voltajePanel));
            this.valueLabel = 'Voltaje';
            break;

          default:
            break;
        }

        switch (this.modoGraficar1) {
          case 0:
            this.dataValuesRT1.push(Number(element.humedad));
            this.valueLabel1 = 'Humedad';
            break;

          case 1:
            this.dataValuesRT1.push(Number(element.temperatura));
            this.valueLabel1 = 'Temperatura';
            break;

          case 2:
            this.dataValuesRT1.push(Number(element.irradiancia));
            this.valueLabel1 = 'Irradiancia';
            break;


          case 3:
            this.dataValuesRT1.push(Number(element.corrientePanel));
            this.valueLabel1 = 'Corriente';
            break;

          case 4:
            this.dataValuesRT1.push(Number(element.voltajePanel));
            this.valueLabel1 = 'Voltaje';
            break;

          default:
            break;
        }

        switch (this.modoGraficar2) {
          case 0:
            this.dataValuesRT2.push(Number(element.humedad));
            this.valueLabel2 = 'Humedad';
            break;

          case 1:
            this.dataValuesRT2.push(Number(element.temperatura));
            this.valueLabel2 = 'Temperatura';
            break;

          case 2:
            this.dataValuesRT2.push(Number(element.irradiancia));
            this.valueLabel2 = 'Irradiancia';
            break;


          case 3:
            this.dataValuesRT2.push(Number(element.corrientePanel));
            this.valueLabel2 = 'Corriente';
            break;

          case 4:
            this.dataValuesRT2.push(Number(element.voltajePanel));
            this.valueLabel2 = 'Voltaje';
            break;

          default:
            break;
        }

        switch (this.modoGraficar3) {
          case 0:
            this.dataValuesRT3.push(Number(element.humedad));
            this.valueLabel3 = 'Humedad';
            break;

          case 1:
            this.dataValuesRT3.push(Number(element.temperatura));
            this.valueLabel3 = 'Temperatura';
            break;

          case 2:
            this.dataValuesRT3.push(Number(element.irradiancia));
            this.valueLabel3 = 'Irradiancia';
            break;


          case 3:
            this.dataValuesRT3.push(Number(element.corrientePanel));
            this.valueLabel3 = 'Corriente';
            break;

          case 4:
            this.dataValuesRT3.push(Number(element.voltajePanel));
            this.valueLabel3 = 'Voltaje';
            break;

          default:
            break;
        }

        this.lineChartLabels.push(element.hora);
        this.lineChartLabels1.push(element.hora);
        this.lineChartLabels2.push(element.hora);
        this.lineChartLabels3.push(element.hora);
        this.deteccion = false;
      } else {
        switch (this.modoGraficar) {
          case 0:
            this.dataValuesRT[index] = (Number(element.humedad));
            this.valueLabel = 'Humedad';
            break;

          case 1:
            this.dataValuesRT[index] = (Number(element.temperatura));
            this.valueLabel = 'Temperatura';
            break;

          case 2:
            this.dataValuesRT[index] = (Number(element.irradiancia));
            this.valueLabel = 'Irradiancia';
            break;

          case 3:
            this.dataValuesRT[index] = (Number(element.corrientePanel));
            this.valueLabel = 'Corriente';
            break;

          case 4:
            this.dataValuesRT[index] = (Number(element.voltajePanel));
            this.valueLabel = 'Voltaje';
            break;

          default:
            break;
        }

        switch (this.modoGraficar1) {
          case 0:
            this.dataValuesRT1[index] = (Number(element.humedad));
            this.valueLabel1 = 'Humedad';
            break;

          case 1:
            this.dataValuesRT1[index] = (Number(element.temperatura));
            this.valueLabel1 = 'Temperatura';
            break;

          case 2:
            this.dataValuesRT1[index] = (Number(element.irradiancia));
            this.valueLabel1 = 'Irradiancia';
            break;

          case 3:
            this.dataValuesRT1[index] = (Number(element.corrientePanel));
            this.valueLabel1 = 'Corriente';
            break;

          case 4:
            this.dataValuesRT1[index] = (Number(element.voltajePanel));
            this.valueLabel1 = 'Voltaje';
            break;

          default:
            break;
        }

        switch (this.modoGraficar2) {
          case 0:
            this.dataValuesRT2[index] = (Number(element.humedad));
            this.valueLabel2 = 'Humedad';
            break;

          case 1:
            this.dataValuesRT2[index] = (Number(element.temperatura));
            this.valueLabel2 = 'Temperatura';
            break;

          case 2:
            this.dataValuesRT2[index] = (Number(element.irradiancia));
            this.valueLabel2 = 'Irradiancia';
            break;

          case 3:
            this.dataValuesRT2[index] = (Number(element.corrientePanel));
            this.valueLabel2 = 'Corriente';
            break;

          case 4:
            this.dataValuesRT2[index] = (Number(element.voltajePanel));
            this.valueLabel2 = 'Voltaje';
            break;

          default:
            break;
        }

        switch (this.modoGraficar3) {
          case 0:
            this.dataValuesRT3[index] = (Number(element.humedad));
            this.valueLabel3 = 'Humedad';
            break;

          case 1:
            this.dataValuesRT3[index] = (Number(element.temperatura));
            this.valueLabel3 = 'Temperatura';
            break;

          case 2:
            this.dataValuesRT3[index] = (Number(element.irradiancia));
            this.valueLabel3 = 'Irradiancia';
            break;

          case 3:
            this.dataValuesRT3[index] = (Number(element.corrientePanel));
            this.valueLabel3 = 'Corriente';
            break;

          case 4:
            this.dataValuesRT3[index] = (Number(element.voltajePanel));
            this.valueLabel3 = 'Voltaje';
            break;

          default:
            break;
        }
        this.lineChartLabels[index] = (element.hora);
        this.lineChartLabels1[index] = (element.hora);
        this.lineChartLabels2[index] = (element.hora);
        this.lineChartLabels3[index] = (element.hora);
      }

    }
    this.charDataSets = { data: this.dataValuesRT, label: this.valueLabel };
    this.charDataSets1 = { data: this.dataValuesRT1, label: this.valueLabel1 };
    this.chart.chart.update();

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

  public cambioDeChart(modo: number) {
    this.modoGraficar = modo;
    this.InizialiteValues();
    this.InputValuesChart();
  }
  public cambioDeChart1(modo: number) {
    this.modoGraficar1 = modo;
    this.InizialiteValues();
    this.InputValuesChart();
  }
  public cambioDeChart2(modo: number) {
    this.modoGraficar2 = modo;
    this.InizialiteValues();
    this.InputValuesChart();
  }
  public cambioDeChart3(modo: number) {
    this.modoGraficar3 = modo;
    this.InizialiteValues();
    this.InputValuesChart();
  }

  public mostrarCharts(cuantos: number) {
    switch (cuantos) {
      case 1:
        this.chartsEnables = [true, false, false, false];
        break;

      case 2:
        this.chartsEnables = [true, true, false, false];
        break;

      case 4:
        this.chartsEnables = [true, true, true, true];
        break;

      default:
        this.chartsEnables = [true, false, false, false];
        break;
    }
    this.InizialiteValues();
    this.InputValuesChart();

  }
}
