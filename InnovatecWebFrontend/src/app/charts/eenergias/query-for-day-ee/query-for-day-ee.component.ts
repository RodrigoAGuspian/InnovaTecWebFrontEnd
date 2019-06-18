import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DatosEenergiasService } from 'src/app/shared/services/datos-eenergias.service';
import { MatSnackBar } from '@angular/material';
import { DatosEenergias } from 'src/app/shared/models/datos-eenergias';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, Color, BaseChartDirective } from 'ng2-charts';
import { DatosExportarEenergias } from 'src/app/shared/models/datos-exportar-eenergias';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { DatosPromedioEenergias } from 'src/app/shared/models/datos-promedio-eenergias';
import { ConvertHours } from 'src/app/shared/utilities/convert-hours';

@Component({
  selector: 'app-query-for-day-ee',
  templateUrl: './query-for-day-ee.component.html',
  styleUrls: ['./query-for-day-ee.component.css']
})
export class QueryForDayEeComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, public infoList: DatosEenergiasService, private excelService: ExportExcelService) { }
  public fullDataList: DatosEenergias[] = [];
  public deteccion = true;
  public deteccionE = false;
  public exportList: DatosExportarEenergias[] = [];

  public dataValuesPotencia1: number[] = [];
  public dataValuesPotencia2: number[] = [];
  public dataValuesPotencia3: number[] = [];

  public listCircuitos = ['Todos', 'Circuito 1', 'Circuito 2', 'Circuito 3'];
  public chartsEnables = [true, true, true, false];

  public averageData: DatosPromedioEenergias[] = [];

  labelPotencia1 = 'Potencia 1';
  labelPotencia2 = 'Potencia 2';
  labelPotencia3 = 'Potencia 3';

  public energiaDia: number;
  public potenciaMax: number;
  public potenciaMin: number;
  public horaMax: string;
  public horaMin: string;

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
    this.deteccion = true;
    const dateValue = this.datePicker.nativeElement.value;
    if ( dateValue.length > 0) {
      const infoDate = dateValue.split('/');
      this.infoList.getDataForDay(infoDate[1], infoDate[0], infoDate[2]).snapshotChanges().subscribe(item => {
        this.fullDataList = [];
        this.exportList = [];
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

          this.fullDataList.push(x as DatosEenergias);
        });

        if (this.deteccion) {
          this.InputValuesChart();
          this.totalAverage();
          this.getValuesTable();
          this.deteccion = false;
        }

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
    this.cleanValues();
    const listSort = this.fullDataList;

    listSort.forEach(element => {
      this.dataValuesPotencia1.push(Number(element.potencia1));
      this.dataValuesCorriente1.push(Number(element.corriente1));
      this.dataValuesPotencia2.push(Number(element.potencia2));
      this.dataValuesCorriente2.push(Number(element.corriente2));
      this.dataValuesPotencia3.push(Number(element.potencia3));
      this.dataValuesCorriente3 .push(Number(element.corriente3));
      this.lineChartLabels.push(element.hora);
    });

    this.charDataSetsPotencia1 = { data: this.dataValuesPotencia1, label: this.labelPotencia1 };
    this.charDataSetsCorriente1 = { data: this.dataValuesCorriente1, label: this.labelCorriente1 };
    this.charDataSetsPotencia2 = { data: this.dataValuesPotencia2, label: this.labelPotencia2 };
    this.charDataSetsCorriente2 = { data: this.dataValuesCorriente2, label: this.labelCorriente2 };
    this.charDataSetsPotencia3 = { data: this.dataValuesPotencia3, label: this.labelPotencia3 };
    this.charDataSetsCorriente3 = { data: this.dataValuesCorriente3, label: this.labelCorriente3 };
    this.lineChartData1 = [this.charDataSetsPotencia1] ;
    this.lineChartData2 = [this.charDataSetsPotencia2] ;
    this.lineChartData3 = [this.charDataSetsPotencia3] ;
    this.lineChartData4 = [this.charDataSetsCorriente1] ;
    this.lineChartData5 = [this.charDataSetsCorriente2] ;
    this.lineChartData6 = [this.charDataSetsCorriente3] ;
    this.deteccionE = true;
    this.chart.chart.update();
  }

  exportar() {
    if (this.deteccionE) {
      const dateSplit = this.datePicker.nativeElement.value.split('/');
      const day = dateSplit[1];
      const month = dateSplit[0];
      const year = dateSplit[2];
      const jsonExportC: any[] = [];
      const jsonExport1: any[] = [];
      this.exportList.forEach(element => {
        if (this.chartsEnables[0]) {
          const expData: any = {
            hora: element.hora,
            potencia: element.potencia1,
            corriente: element.corriente1,
          };
          jsonExportC.push(expData);
        }

        if (this.chartsEnables[1]) {
          const expData: any = {
            hora: element.hora,
            potencia: element.potencia2,
            corriente: element.corriente2,
          };
          jsonExportC.push(expData);
        }

        if (this.chartsEnables[2]) {
          const expData: any = {
            hora: element.hora,
            potencia: element.potencia3,
            corriente: element.corriente3,
          };
          jsonExportC.push(expData);
        }
      });

      this.averageData.forEach(element => {

        if (this.chartsEnables[0]) {
          const expData: any = {
            hora: element.hora,
            potenciaPromedio: element.potenciaPromedio1,
            corrientePromedio: element.corrientePromedio1,
          };

          jsonExport1.push(expData);
        }

        if (this.chartsEnables[1]) {
          const expData: any = {
            hora: element.hora,
            potenciaPromedio: element.potenciaPromedio2,
            corrientePromedio: element.corrientePromedio2,
          };
          jsonExport1.push(expData);
        }

        if (this.chartsEnables[2]) {
          const expData: any = {
            hora: element.hora,
            potenciaPromedio: element.potenciaPromedio3,
            corrientePromedio: element.corrientePromedio3,
          };
          jsonExport1.push(expData);
        }

      });

      const jsonExport2: any[] = [];
      const tmpAny1: any = {
        energiaDia: this.energiaDia,
        potenciaMaxima: this.potenciaMax + ' Hora:' + this.horaMax,
        potenciaMinima: this.potenciaMin + ' Hora:' + this.horaMin,
      };
      jsonExport2.push(tmpAny1);
      if (this.chartsEnables[3]) {
        this.excelService.exportAsExcelFile(jsonExportC, day + '-' + month + '-' + year + ' ' + 'datos-eenergias', jsonExport1,
                                          jsonExport2, 'E1', 'I1' );
      } else {
        this.excelService.exportAsExcelFile(this.exportList, day + '-' + month + '-' + year + ' ' + 'datos-eenergias');
      }
    } else {
      this.snackBar.open('Por favor espere', 'Advertencia', {
        duration: 2000,
      });
    }
  }

  cambiarCircuitos(c: string) {
    if (c === this.listCircuitos[0]) {
      this.chartsEnables = [true, true, true, false];
    }

    if (c === this.listCircuitos[1]) {
      this.chartsEnables = [true, false, false, true];
    }


    if (c === this.listCircuitos[2]) {
      this.chartsEnables = [false, true, false, true];
    }

    if (c === this.listCircuitos[3]) {
      this.chartsEnables = [false, false, true, true];
    }
    this.getValuesTable();
  }

  public totalAverage() {
    this.averageData = [];
    let contador = 0;
    let acumulador: DatosPromedioEenergias = new DatosPromedioEenergias();
    let acmH = 0;
    this.fullDataList.forEach(el1 => {
      if (!isNaN(Number(el1.potencia1)) &&
          !isNaN(Number(el1.potencia2)) &&
          !isNaN(Number(el1.potencia3)) &&
          !isNaN(Number(el1.corriente1)) &&
          !isNaN(Number(el1.corriente2)) &&
          !isNaN(Number(el1.corriente3))) {
          contador++;
          acumulador.potenciaPromedio1 += Number(el1.potencia1);
          acumulador.potenciaPromedio2 += Number(el1.potencia2);
          acumulador.potenciaPromedio3 += Number(el1.potencia3);
          acumulador.corrientePromedio1 += Number(el1.corriente1);
          acumulador.corrientePromedio2 += Number(el1.corriente2);
          acumulador.corrientePromedio3 += Number(el1.corriente3);

          const horaDato = ConvertHours.toConver24(el1.hora);
          if (acmH === 0) {
            acmH = horaDato.getHours();
          }
          if (horaDato.getHours() === acmH) {
            let tmpAcmH = acmH + 1;
            acumulador.potenciaPromedio1 = Math.round (acumulador.potenciaPromedio1 / contador * 1000) / 1000;
            acumulador.potenciaPromedio2 = Math.round (acumulador.potenciaPromedio2 / contador * 1000) / 1000;
            acumulador.potenciaPromedio3 = Math.round (acumulador.potenciaPromedio3 / contador * 1000) / 1000;
            acumulador.corrientePromedio1 = Math.round (acumulador.corrientePromedio1 / contador * 1000) / 1000;
            acumulador.corrientePromedio2 = Math.round (acumulador.corrientePromedio2 / contador * 1000) / 1000;
            acumulador.corrientePromedio3 = Math.round( (acumulador.corrientePromedio3) / contador *  1000 ) / 1000 ;
            if (tmpAcmH === 24) {
              tmpAcmH = 0;

            }
            acumulador.hora = acmH + ' a ' + tmpAcmH;
            this.averageData.push(acumulador);
            acumulador = new DatosPromedioEenergias();
            acmH++;

            contador = 0;

          } else {
            if (horaDato.getHours() - 1 > acmH || acmH === 0) {
              acmH = horaDato.getHours() + 1;
            }
          }
      }

    });
  }

  public getValuesTable() {
    let sortListPotencia1: DatosPromedioEenergias[] = [];
    let sortListPotencia2: DatosPromedioEenergias[] = [];
    let sortListPotencia3: DatosPromedioEenergias[] = [];
    this.energiaDia = 0;
    this.averageData.forEach(element => {
      sortListPotencia1.push(element);
      sortListPotencia2.push(element);
      sortListPotencia3.push(element);
    });

    sortListPotencia1 = this.sortByPotenciaMax1(sortListPotencia1);
    sortListPotencia2 = this.sortByPotenciaMax2(sortListPotencia2);
    sortListPotencia3 = this.sortByPotenciaMax3(sortListPotencia3);

    if (this.chartsEnables[0]) {
      this.potenciaMin = sortListPotencia1[0].potenciaPromedio1;
      this.potenciaMax = sortListPotencia1[sortListPotencia1.length - 1].potenciaPromedio1;
      this.horaMin = sortListPotencia1[0].hora;
      this.horaMax = sortListPotencia1[sortListPotencia1.length - 1].hora;
    }
    if (this.chartsEnables[1]) {
      this.potenciaMin = sortListPotencia2[0].potenciaPromedio2;
      this.potenciaMax = sortListPotencia2[sortListPotencia2.length - 1].potenciaPromedio2;
      this.horaMin = sortListPotencia2[0].hora;
      this.horaMax = sortListPotencia2[sortListPotencia2.length - 1].hora;
    }
    if (this.chartsEnables[2]) {
      this.potenciaMin = sortListPotencia3[0].potenciaPromedio3;
      this.potenciaMax = sortListPotencia3[sortListPotencia3.length - 1].potenciaPromedio3;
      this.horaMin = sortListPotencia3[0].hora;
      this.horaMax = sortListPotencia3[sortListPotencia3.length - 1].hora;
    }


    this.averageData.forEach(element => {
      if (this.chartsEnables[0]) {
        this.energiaDia += element.potenciaPromedio1;
      }
      if (this.chartsEnables[1]) {
        this.energiaDia += element.potenciaPromedio2;
      }
      if (this.chartsEnables[2]) {
        this.energiaDia += element.potenciaPromedio3;
      }

    });


  }
  public sortByPotenciaMax1(array: DatosPromedioEenergias[]): DatosPromedioEenergias[] {
    return array.sort((a: DatosPromedioEenergias, b: DatosPromedioEenergias) => {
      return a.potenciaPromedio1 - b.potenciaPromedio1;

    });
  }

  public sortByPotenciaMax2(array: DatosPromedioEenergias[]): DatosPromedioEenergias[] {
    return array.sort((a: DatosPromedioEenergias, b: DatosPromedioEenergias) => {
      return a.potenciaPromedio2 - b.potenciaPromedio2;

    });
  }

  public sortByPotenciaMax3(array: DatosPromedioEenergias[]): DatosPromedioEenergias[] {
    return array.sort((a: DatosPromedioEenergias, b: DatosPromedioEenergias) => {
      return a.potenciaPromedio3 - b.potenciaPromedio3;
    });
  }



}
