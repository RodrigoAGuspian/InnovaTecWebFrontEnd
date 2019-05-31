import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DatosEenergiasService } from 'src/app/shared/services/datos-eenergias.service';
import { MatSnackBar } from '@angular/material';
import { DatosEenergias } from 'src/app/shared/models/datos-eenergias';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, Color, BaseChartDirective } from 'ng2-charts';
import { FilterDataEEnergias } from 'src/app/shared/models/filter-data-eenergias';
import { FormControl } from '@angular/forms';
import { DatosExportarEenergias } from 'src/app/shared/models/datos-exportar-eenergias';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';

@Component({
  selector: 'app-query-for-month-ee',
  templateUrl: './query-for-month-ee.component.html',
  styleUrls: ['./query-for-month-ee.component.css']
})
export class QueryForMonthEeComponent implements OnInit {

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
  public barChartLabels: Label[] =  [];

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

  monthInputCtrl: FormControl = new FormControl();
  datePickerValue: string;
  datePickerValueSplit: string [];
  numDays: number;

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

  getDataMonth() {
    const datePickerValue = this.monthInputCtrl.value;

    try {
      const yearM = datePickerValue.getFullYear();
      const  month = datePickerValue.getMonth();
      switch (month) {
          case 0:
          case 2:
          case 4:
          case 6:
          case 7:
          case 9:
          case 11:
              this.numDays = 31;
              break;
          case 3:
          case 5:
          case 8:
          case 10:
              this.numDays = 30;
              break;
          case 1:
              if (((yearM % 100 === 0) && (yearM % 400 === 0)) || ((yearM % 100 !== 0) && (yearM % 4 === 0))) {
                this.numDays = 29;
                break;
              } else {
                this.numDays = 28;
                break;
              }
          default:
      }

    } catch (error) {
      this.snackBar.open('Por favor seleccione una fecha para poder graficar', 'Advertencia', {
        duration: 2000,
      });
    }

    this.queryMonth();

  }


  queryMonth() {
    this.cleanValues();
    const datePickerValue = this.monthInputCtrl.value;
    this.barChartLabels = [];
    this.fullDataList = [];
    let definir = true;
    for (let index = 0; index < this.numDays; index++) {
      this.barChartLabels.push(String(index + 1));
    }
    for (let index = 0; index < this.numDays; index++) {
      const tmpValues: DatosEenergias[] = [];
      this.fullDataList.push(tmpValues);
    }
    const year = datePickerValue.getFullYear();
    const  month = datePickerValue.getMonth() + 1;
    this.infoList.getDataMonth(month, year).snapshotChanges().subscribe(item => {
      // tslint:disable-next-line: no-shadowed-variable
      if (definir) {
        this.fullDataList = [];
        item.forEach(element => {
          const datos = element.payload.val();
          const keySplit = element.key.split('d');
          const tmpValues: DatosEenergias[] = [];
          datos.forEach(ele1 => {
            ele1.skey = keySplit[1];
            tmpValues.push(ele1 as DatosEenergias);

            const tmpExportData = new DatosExportarEenergias();
            // tslint:disable-next-line: no-string-literal
            tmpExportData.hora = ele1['hora'];
            // tslint:disable-next-line: no-string-literal
            tmpExportData.potencia1 = ele1['potencia1'];
            // tslint:disable-next-line: no-string-literal
            tmpExportData.potencia2 = ele1['potencia2'];
            // tslint:disable-next-line: no-string-literal
            tmpExportData.potencia3 = ele1['potencia3'];
            // tslint:disable-next-line: no-string-literal
            tmpExportData.corriente1 = ele1['corriente1'];
            // tslint:disable-next-line: no-string-literal
            tmpExportData.corriente2 = ele1['corriente2'];
            // tslint:disable-next-line: no-string-literal
            tmpExportData.corriente3 = ele1['corriente3'];
            this.exportList.push(tmpExportData);

          });
          const tmpDay = Number(keySplit[1]);
          this.fullDataList[tmpDay] = tmpValues;
        });
        this.graficar();
        definir = false;
      }
    });


  }

  graficar() {
    this.promedioData();
    this.InputValuesChart();
  }
  promedioData() {
    this.realDataList = [];
    let contador = 0;
    for (let index = 0; index < this.numDays; index++) {
      const tmpValues: FilterDataEEnergias = new FilterDataEEnergias();
      this.realDataList.push(tmpValues);
    }
    this.fullDataList.forEach(element => {
      const acumulador: FilterDataEEnergias = new FilterDataEEnergias();
      acumulador.potencia1 = 0;
      acumulador.potencia2 = 0;
      acumulador.potencia3 = 0;
      acumulador.corriente1 = 0;
      acumulador.corriente2 = 0;
      acumulador.corriente3 = 0;
      contador = 0;
      let tmpSkey = 0;
      element.forEach(el1 => {


        if (!isNaN(Number(el1.potencia1)) &&
            !isNaN(Number(el1.potencia2)) &&
            !isNaN(Number(el1.potencia3)) &&
            !isNaN(Number(el1.corriente1)) &&
            !isNaN(Number(el1.corriente2)) &&
            !isNaN(Number(el1.corriente3))) {
            try {
              contador++;
              tmpSkey = Number(el1.skey);
              acumulador.potencia1 += Number(el1.potencia1);
              acumulador.potencia2 += Number(el1.potencia2);
              acumulador.potencia3 += Number(el1.potencia3);
              acumulador.corriente1 += Number(el1.corriente1);
              acumulador.corriente2 += Number(el1.corriente2);
              acumulador.corriente3 += Number(el1.corriente3);
            } catch (error) {

            }

        }

      });
      acumulador.potencia1 = acumulador.potencia1 / contador;
      acumulador.potencia2 = acumulador.potencia2 / contador;
      acumulador.potencia3 = acumulador.potencia3 / contador;
      acumulador.corriente1 = acumulador.corriente1 / contador;
      acumulador.corriente2 = acumulador.corriente2 / contador;
      acumulador.corriente3 = acumulador.corriente3 / contador;
      this.realDataList[tmpSkey] = acumulador;
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
    const datePickerValue = this.monthInputCtrl.value;
    const month = datePickerValue.getMonth();
    const year = datePickerValue.getFullYear();
    const meses =
      ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const fullNameFile =  meses[month] + '-' + year + ' datos-eenergias'  ;
    this.excelService.exportAsExcelFile(this.exportList, fullNameFile );
    } else {
      this.snackBar.open('Por favor espere', 'Advertencia', {
        duration: 2000,
      });
    }
  }

}
