import { Component, OnInit, ViewChild } from '@angular/core';
import { RealTimeEenergias } from 'src/app/shared/models/real-time-eenergias';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, Color, BaseChartDirective } from 'ng2-charts';
import { DatosEenergiasService } from 'src/app/shared/services/datos-eenergias.service';

@Component({
  selector: 'app-real-time-eenergias',
  templateUrl: './real-time-eenergias.component.html',
  styleUrls: ['./real-time-eenergias.component.css']
})
export class RealTimeEenergiasComponent implements OnInit {

  constructor(public infoList: DatosEenergiasService) { }
  public realTimeList: RealTimeEenergias[] = [];
  public deteccion = true;

  public dataValuesPotencia1: number[] = [];
  public dataValuesPotencia2: number[] = [];
  public dataValuesPotencia3: number[] = [];
  labelPotencia1 = 'Potencia 1';
  labelPotencia2 = 'Potencia 2';
  labelPotencia3 = 'Potencia 3';

  public charDataSetsPotencia1: ChartDataSets = { data: this.dataValuesPotencia1, label: this.labelPotencia1 };
  public charDataSetsPotencia2: ChartDataSets = { data: this.dataValuesPotencia2, label: this.labelPotencia2 };
  public charDataSetsPotencia3: ChartDataSets = { data: this.dataValuesPotencia3, label: this.labelPotencia3 };
  public lineChartData1 = [this.charDataSetsPotencia1] ;
  public lineChartData2 = [this.charDataSetsPotencia2] ;
  public lineChartData3 = [this.charDataSetsPotencia3] ;
  public lineChartLabels: Label[] = [];

  public dataValuesCorriente1: number[] = [];
  public dataValuesCorriente2: number[] = [];
  public dataValuesCorriente3: number[] = [];
  labelCorriente1 = 'Corriente 1';
  labelCorriente2 = 'Corriente 2';
  labelCorriente3 = 'Corriente 3';
  public charDataSetsCorriente1: ChartDataSets = { data: this.dataValuesCorriente1, label: this.labelCorriente1 };
  public charDataSetsCorriente2: ChartDataSets = { data: this.dataValuesCorriente2, label: this.labelCorriente2 };
  public charDataSetsCorriente3: ChartDataSets = { data: this.dataValuesCorriente3, label: this.labelCorriente3 };
  public lineChartData4 = [this.charDataSetsCorriente1] ;
  public lineChartData5 = [this.charDataSetsCorriente2] ;
  public lineChartData6 = [this.charDataSetsCorriente3] ;

  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  public lineChartColors1: Color[] = [
    {
      borderColor: 'rgba(245,124,0,1)',
      backgroundColor: 'rgba(0,0,0,0)',
      pointBorderColor: 'rgba(245,124,0,1)',
      pointBackgroundColor: 'rgba(245,124,0,1)',
    },
  ];

  public lineChartColors2: Color[] = [
    {
      borderColor: 'rgba(216,26,27,1)',
      backgroundColor: 'rgba(0,0,0,0)',
      pointBorderColor: 'rgba(216,26,27,1)',
      pointBackgroundColor: 'rgba(216,26,27,1)',
    },

  ];
  public lineChartColors3: Color[] = [
    {
      borderColor: 'rgba(100,130,119,1)',
      backgroundColor: 'rgba(0,0,0,0)',
      pointBorderColor: 'rgba(100,130,119,1)',
      pointBackgroundColor: 'rgba(100,130,119,1)',
    },
  ];

  public lineChartColors4: Color[] = [
    {
      borderColor: 'rgba(171,71,0,1)',
      backgroundColor: 'rgba(0,0,0,0)',
      pointBorderColor: 'rgba(171,71,0,1)',
      pointBackgroundColor: 'rgba(171,71,0,1)',
    },
  ];

  public lineChartColors5: Color[] = [
    {
      borderColor: 'rgba(30,136,229,1)',
      backgroundColor: 'rgba(0,0,0,0)',
      pointBorderColor: 'rgba(30,136,229,1)',
      pointBackgroundColor: 'rgba(30,136,229,1)',
    },
  ];
  public lineChartColors6: Color[] = [
    {
      borderColor: 'rgba(100,124,179,1)',
      backgroundColor: 'rgba(0,0,0,0)',
      pointBorderColor: 'rgba(100,124,179,1)',
      pointBackgroundColor: 'rgba(100,124,179,1)',
    },
  ];

  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  public modoGraficar = 0;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  ngOnInit() {
    this.infoList.getRealTimeDataTarjeta1().snapshotChanges().subscribe(item => {
      this.realTimeList = [];
      // tslint:disable-next-line: no-shadowed-variable
      item.forEach(element => {
        const x = element.payload.toJSON();
        // tslint:disable-next-line: no-string-literal
        x['skey'] = element.key;
        this.realTimeList.push(x as RealTimeEenergias);
      });
      this.InputValuesChart();


    });
  }

  InputValuesChart() {
    const listSort = this.sortByStartDate(this.realTimeList);
    for (let index = 0; index < listSort.length; index++) {
      const element = listSort[index];
      if (this.deteccion) {
        this.dataValuesPotencia1.push(Number(element.potencia1));
        this.dataValuesCorriente1.push(Number(element.corriente1));
        this.dataValuesPotencia2.push(Number(element.potencia2));
        this.dataValuesCorriente2.push(Number(element.corriente2));
        this.dataValuesPotencia3.push(Number(element.potencia3));
        this.dataValuesCorriente3 .push(Number(element.corriente3));
        this.lineChartLabels.push(element.hora);
        this.deteccion = false;
      } else {
        this.dataValuesPotencia1[index] = Number(element.potencia1);
        this.dataValuesCorriente1[index] = Number(element.corriente1);
        this.dataValuesPotencia2[index] = Number(element.potencia2);
        this.dataValuesCorriente2[index] = Number(element.corriente2);
        this.dataValuesPotencia3[index] = Number(element.potencia3);
        this.dataValuesCorriente3[index] = Number(element.corriente3);
        this.lineChartLabels[index] = element.hora;
      }
    }

    this.charDataSetsPotencia1 = { data: this.dataValuesPotencia1, label: this.labelPotencia1 };
    this.charDataSetsCorriente1 = { data: this.dataValuesCorriente1, label: this.labelCorriente1 };
    this.charDataSetsPotencia2 = { data: this.dataValuesPotencia2, label: this.labelPotencia2 };
    this.charDataSetsCorriente2 = { data: this.dataValuesCorriente2, label: this.labelCorriente2 };
    this.charDataSetsPotencia3 = { data: this.dataValuesPotencia3, label: this.labelPotencia3 };
    this.charDataSetsCorriente3 = { data: this.dataValuesCorriente3, label: this.labelCorriente3 };
    try {
      this.chart.chart.update();
    } catch (error) {}
  }


  private getTime(date?: Date) {
    return date != null ? new Date(date).getTime() : 0;
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

  public sortByStartDate(array: RealTimeEenergias[]): RealTimeEenergias[] {
    return array.sort((a: RealTimeEenergias, b: RealTimeEenergias) => {
      return this.getTime(this.parseStringToDate(a.fechaActual1)) - this.getTime(this.parseStringToDate(b.fechaActual1));
    });
  }



}
