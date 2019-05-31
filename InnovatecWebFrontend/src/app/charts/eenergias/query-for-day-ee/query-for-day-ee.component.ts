import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DatosEenergiasService } from 'src/app/shared/services/datos-eenergias.service';
import { MatSnackBar } from '@angular/material';
import { DatosEenergias } from 'src/app/shared/models/datos-eenergias';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, Color, BaseChartDirective } from 'ng2-charts';
import { DatosExportarEenergias } from 'src/app/shared/models/datos-exportar-eenergias';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';

@Component({
  selector: 'app-query-for-day-ee',
  templateUrl: './query-for-day-ee.component.html',
  styleUrls: ['./query-for-day-ee.component.css']
})
export class QueryForDayEeComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, public infoList: DatosEenergiasService, private excelService: ExportExcelService) { }
  public realTimeList: DatosEenergias[] = [];
  public deteccion = true;
  public deteccionE = false;
  public exportList: DatosExportarEenergias[] = [];

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
  @ViewChild('datePicker') datePicker: ElementRef;

  ngOnInit() {

  }

  graficar() {

    const dateValue = this.datePicker.nativeElement.value;
    if ( dateValue.length > 0) {
      const infoDate = dateValue.split('/');
      this.infoList.getDataForDay(infoDate[1], infoDate[0], infoDate[2]).snapshotChanges().subscribe(item => {
        this.realTimeList = [];
        // tslint:disable-next-line: no-shadowed-variable
        item.forEach(element => {
          const x = element.payload.toJSON();
          // tslint:disable-next-line: no-string-literal
          x['skey'] = element.key;

          const tmpExportData = new DatosExportarEenergias();
          // tslint:disable-next-line: no-string-literal
          tmpExportData.hora = x['hora'];
          // tslint:disable-next-line: no-string-literal
          tmpExportData.potencia1 = x['potencia1'];
          // tslint:disable-next-line: no-string-literal
          tmpExportData.potencia2 = x['potencia2'];
          // tslint:disable-next-line: no-string-literal
          tmpExportData.potencia3 = x['potencia3'];
          // tslint:disable-next-line: no-string-literal
          tmpExportData.corriente1 = x['corriente1'];
          // tslint:disable-next-line: no-string-literal
          tmpExportData.corriente2 = x['corriente2'];
          // tslint:disable-next-line: no-string-literal
          tmpExportData.corriente3 = x['corriente3'];
          this.exportList.push(tmpExportData);

          this.realTimeList.push(x as DatosEenergias);
        });

        this.InputValuesChart();
      });
    } else {
      this.snackBar.open('Por favor seleccione una fecha para poder graficar', 'Advertencia', {
        duration: 2000,
      });
    }
  }

  cleanValues() {
    this.dataValuesPotencia1 = [];
    this.dataValuesPotencia2 = [];
    this.dataValuesPotencia3 = [];
    this.dataValuesCorriente1 = [];
    this.dataValuesCorriente2 = [];
    this.dataValuesCorriente3 = [];

    this.lineChartLabels = [];
  }

  InputValuesChart() {
    const listSort = this.realTimeList;
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
    this.deteccionE = true;
    this.chart.chart.update();
  }

  exportar() {
    if (this.deteccionE) {
    const dateSplit = this.datePicker.nativeElement.value.split('/');
    const day = dateSplit[1];
    const month = dateSplit[0];
    const year = dateSplit[2];
    this.excelService.exportAsExcelFile(this.exportList, day + '-' + month + '-' + year + ' ' + 'datos-eenergias' );
    } else {
      this.snackBar.open('Por favor espere', 'Advertencia', {
        duration: 2000,
      });
    }
  }


}
