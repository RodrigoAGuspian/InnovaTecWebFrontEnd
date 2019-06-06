import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DatosEenergiasService } from 'src/app/shared/services/datos-eenergias.service';
import { MatSnackBar } from '@angular/material';
import { DatosEenergias } from 'src/app/shared/models/datos-eenergias';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, Color, BaseChartDirective } from 'ng2-charts';
import { FilterDataEEnergias } from 'src/app/shared/models/filter-data-eenergias';
import { DatosExportarProsolar } from 'src/app/shared/models/datos-exportar-prosolar';
import { DatosExportarEenergias } from 'src/app/shared/models/datos-exportar-eenergias';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';

@Component({
  selector: 'app-query-for-week-ee',
  templateUrl: './query-for-week-ee.component.html',
  styleUrls: ['./query-for-week-ee.component.css']
})
export class QueryForWeekEeComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, public infoList: DatosEenergiasService, private excelService: ExportExcelService) { }
  public fullDataList: DatosEenergias[][] = [];
  public realDataList: FilterDataEEnergias[] = [];
  public deteccion = false;
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
  public barChartData1 = [this.charDataSetsPotencia1] ;
  public barChartData2 = [this.charDataSetsPotencia2] ;
  public barChartData3 = [this.charDataSetsPotencia3] ;
  public barChartLabels: Label[] =  ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  public dataValuesCorriente1: number[] = [];
  public dataValuesCorriente2: number[] = [];
  public dataValuesCorriente3: number[] = [];
  labelCorriente1 = 'Corriente 1';
  labelCorriente2 = 'Corriente 2';
  labelCorriente3 = 'Corriente 3';
  public charDataSetsCorriente1: ChartDataSets = { data: this.dataValuesCorriente1, label: this.labelCorriente1 };
  public charDataSetsCorriente2: ChartDataSets = { data: this.dataValuesCorriente2, label: this.labelCorriente2 };
  public charDataSetsCorriente3: ChartDataSets = { data: this.dataValuesCorriente3, label: this.labelCorriente3 };
  public barChartData4 = [this.charDataSetsCorriente1] ;
  public barChartData5 = [this.charDataSetsCorriente2] ;
  public barChartData6 = [this.charDataSetsCorriente3] ;

  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  public lineChartColors1: Color[] = [
    {
      borderColor: 'rgba(245,124,0,1)',
      backgroundColor: 'rgba(245,124,0,1)',
      pointBorderColor: 'rgba(245,124,0,1)',
      pointBackgroundColor: 'rgba(245,124,0,1)',
    },
  ];

  public lineChartColors2: Color[] = [
    {
      borderColor: 'rgba(216,26,27,1)',
      backgroundColor: 'rgba(216,26,27,1)',
      pointBorderColor: 'rgba(216,26,27,1)',
      pointBackgroundColor: 'rgba(216,26,27,1)',
    },

  ];
  public lineChartColors3: Color[] = [
    {
      borderColor: 'rgba(100,130,119,1)',
      backgroundColor: 'rgba(100,130,119,1)',
      pointBorderColor: 'rgba(100,130,119,1)',
      pointBackgroundColor: 'rgba(100,130,119,1)',
    },
  ];

  public lineChartColors4: Color[] = [
    {
      borderColor: 'rgba(171,71,0,1)',
      backgroundColor: 'rgba(171,71,0,1)',
      pointBorderColor: 'rgba(171,71,0,1)',
      pointBackgroundColor: 'rgba(171,71,0,1)',
    },
  ];

  public lineChartColors5: Color[] = [
    {
      borderColor: 'rgba(30,136,229,1)',
      backgroundColor: 'rgba(30,136,229,1)',
      pointBorderColor: 'rgba(30,136,229,1)',
      pointBackgroundColor: 'rgba(30,136,229,1)',
    },
  ];
  public lineChartColors6: Color[] = [
    {
      borderColor: 'rgba(100,124,179,1)',
      backgroundColor: 'rgba(100,124,179,1)',
      pointBorderColor: 'rgba(100,124,179,1)',
      pointBackgroundColor: 'rgba(100,124,179,1)',
    },
  ];

  public lineChartLegend = true;
  public lineChartType: ChartType = 'bar';
  public lineChartPlugins = [];

  public modoGraficar = 0;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  @ViewChild('datePicker') datePicker: ElementRef;

  ngOnInit() {

  }

  cleanValues() {
    this.dataValuesPotencia1 = [];
    this.dataValuesPotencia2 = [];
    this.dataValuesPotencia3 = [];
    this.dataValuesCorriente1 = [];
    this.dataValuesCorriente2 = [];
    this.dataValuesCorriente3 = [];
  }

  queryWeek() {
    this.cleanValues();
    const dateValue = this.datePicker.nativeElement.value;
    if ( dateValue.length > 0) {
      this.fullDataList = [];

      const myDate = new Date(dateValue);
      myDate.setHours(0, 0, 0, 0);

      const sunday = 0;

      while (myDate.getDay() !== sunday) {
        myDate.setDate(myDate.getDate() - 1);
      }

      for (let index = 0; index < 7; index++) {
        let myDate1 = new Date(myDate.setDate(myDate.getDate() + 1));
        if (index === 0) {
          myDate1 = new Date(myDate.setDate(myDate.getDate() - 1));
        }
        const year = String(myDate1.getFullYear());
        const realMonth = String(myDate1.getMonth() + 1);
        const stringMyDate = myDate1.toDateString().split(' ');
        const day = String (Number(stringMyDate[2]));
        this.infoList.getDataForDay(day, realMonth, year).snapshotChanges().subscribe(item => {
          const tmpValues: DatosEenergias[] = [];
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

            tmpValues.push(x as DatosEenergias);
          });

          this.fullDataList.push(tmpValues);
          if (index === 6) {
            this.graficar();
          }
        });
      }
    } else {
      this.snackBar.open('Por favor seleccione una fecha para poder graficar', 'Advertencia', {
        duration: 2000,
      });
    }
  }

  graficar() {
    this.promedioData();
    this.InputValuesChart();
  }
  promedioData() {
    this.realDataList = [];
    let contador = 0;
    this.fullDataList.forEach(element => {
      const acumulador: FilterDataEEnergias = new FilterDataEEnergias();
      contador = 0;
      element.forEach(el1 => {


        if (!isNaN(Number(el1.potencia1)) &&
            !isNaN(Number(el1.potencia2)) &&
            !isNaN(Number(el1.potencia3)) &&
            !isNaN(Number(el1.corriente1)) &&
            !isNaN(Number(el1.corriente2)) &&
            !isNaN(Number(el1.corriente3))) {
          contador++;
          acumulador.potencia1 += Number(el1.potencia1);
          acumulador.potencia2 += Number(el1.potencia2);
          acumulador.potencia3 += Number(el1.potencia3);
          acumulador.corriente1 += Number(el1.corriente1);
          acumulador.corriente2 += Number(el1.corriente2);
          acumulador.corriente3 += Number(el1.corriente3);
        }

      });
      acumulador.potencia1 = acumulador.potencia1 / contador;
      acumulador.potencia2 = acumulador.potencia2 / contador;
      acumulador.potencia3 = acumulador.potencia3 / contador;
      acumulador.corriente1 = acumulador.corriente1 / contador;
      acumulador.corriente2 = acumulador.corriente2 / contador;
      acumulador.corriente3 = acumulador.corriente3 / contador;
      this.realDataList.push(acumulador);
    });


  }



  InputValuesChart() {
    const listSort = this.realDataList;
    console.log(this.realDataList);
    listSort.forEach(element => {
      this.dataValuesPotencia1.push(Number(element.potencia1));
      this.dataValuesCorriente1.push(Number(element.corriente1));
      this.dataValuesPotencia2.push(Number(element.potencia2));
      this.dataValuesCorriente2.push(Number(element.corriente2));
      this.dataValuesPotencia3.push(Number(element.potencia3));
      this.dataValuesCorriente3 .push(Number(element.corriente3));
    });

    this.charDataSetsPotencia1 = { data: this.dataValuesPotencia1, label: this.labelPotencia1 };
    this.charDataSetsCorriente1 = { data: this.dataValuesCorriente1, label: this.labelCorriente1 };
    this.charDataSetsPotencia2 = { data: this.dataValuesPotencia2, label: this.labelPotencia2 };
    this.charDataSetsCorriente2 = { data: this.dataValuesCorriente2, label: this.labelCorriente2 };
    this.charDataSetsPotencia3 = { data: this.dataValuesPotencia3, label: this.labelPotencia3 };
    this.charDataSetsCorriente3 = { data: this.dataValuesCorriente3, label: this.labelCorriente3 };
    this.barChartData1 = [this.charDataSetsPotencia1];
    this.barChartData2 = [this.charDataSetsPotencia2];
    this.barChartData3 = [this.charDataSetsPotencia3];
    this.barChartData4 = [this.charDataSetsCorriente1];
    this.barChartData5 = [this.charDataSetsCorriente2];
    this.barChartData6 = [this.charDataSetsCorriente2];
    this.deteccion = true;
    this.chart.chart.update();
  }

  exportar() {
    if (this.deteccion) {


    const firstDate = new Date(this.datePicker.nativeElement.value);
    firstDate.setHours(0, 0, 0, 0);
    const sunday = 0;

    while (firstDate.getDay() !== sunday) {
      firstDate.setDate(firstDate.getDate() - 1);
    }

    const lastDate  = new Date();
    lastDate.setDate(firstDate.getDate() + 6);


    const stringFirstDate = firstDate.toDateString().split(' ');
    const stringLastDate = lastDate.toDateString().split(' ');

    const fDay = stringFirstDate[2];
    const fMonth = firstDate.getMonth();
    const fYear = firstDate.getFullYear();

    const lDay = stringLastDate[2];
    const Month = lastDate.getMonth();
    const lYear = lastDate.getFullYear();

    const fullNameFile =  fDay + '-' + fMonth + '-' + fYear + ' a ' + lDay + '-' + Month + '-' + lYear + ' datos-eenergias'  ;
    this.excelService.exportAsExcelFile(this.exportList, fullNameFile );
    } else {
      this.snackBar.open('Por favor espere', 'Advertencia', {
        duration: 2000,
      });
    }
  }


}
