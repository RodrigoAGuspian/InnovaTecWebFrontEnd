import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, BaseChartDirective } from 'ng2-charts';
import { DatosEenergiasService } from 'src/app/shared/services/datos-eenergias.service';
import { MatSnackBar } from '@angular/material';
import { DatosEenergias } from 'src/app/shared/models/datos-eenergias';
import { FilterDataEEnergias } from 'src/app/shared/models/filter-data-eenergias';
import { DatosPromedioEenergias } from 'src/app/shared/models/datos-promedio-eenergias';
import { ConvertHours } from 'src/app/shared/utilities/convert-hours';

@Component({
  selector: 'app-resumen-eenergias-tarjeta1',
  templateUrl: './resumen-eenergias-tarjeta1.component.html',
  styleUrls: ['./resumen-eenergias-tarjeta1.component.css']
})
export class ResumenEenergiasTarjeta1Component implements OnInit {
  public fullDataList: DatosEenergias[][] = [];
  public realDataList: FilterDataEEnergias[] = [];
  public deteccion = false;
  public energiasDias: number[] = [];
  public potenciasMaxs: number[] = [];
  public potenciasMins: number[] = [];
  public horasMaxs: string[] = [];
  public horasMins: string[] = [];
  public fechas: string[] = [];

  public averageData: DatosPromedioEenergias[][] = [];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  constructor(private snackBar: MatSnackBar, public infoList: DatosEenergiasService) { }

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };

  public pieChartData1: number[] = [0, 0, 0];
  public pieChartColors1 = [
    {
      backgroundColor: ['rgba(236,64,122,1)', 'rgba(0,131,143,1)', 'rgba(74,20,140,1)'],
    },
  ];

  public pieChartData2: number[] = [0, 0, 0];
  public pieChartColors2 = [
    {
      backgroundColor: ['rgba(64,196,255,1)', 'rgba(0,176,255,1)', 'rgba(0,145,234,1)'],
    },
  ];

  public pieChartData3: number[] = [0, 0, 0];
  public pieChartColors3 = [
    {
      backgroundColor: ['rgba(140,158,255,1)', 'rgba(83,109,254,1)', 'rgba(38,59,254,1)'],
    },
  ];

  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartLabels: Label[] = ['', '', ''];

  ngOnInit() {
    this.queryResume();
  }

  queryResume() {
    const currentDate = new Date();
    this.fechas = [];
    for (let index = 3; index > 0; index--) {
      const myDate1 = new Date(currentDate.setDate(currentDate.getDate() - 1));
      const year = String(myDate1.getFullYear());
      const realMonth = String(myDate1.getMonth() + 1);
      const day = String(myDate1.getDate());
      this.fechas.push(day + '/' + realMonth + '/' + year);
      this.infoList.getDataForDay(day, realMonth, year).snapshotChanges().subscribe(item => {
        const tmpValues: DatosEenergias[] = [];
        // tslint:disable-next-line: no-shadowed-variable
        item.forEach(element => {
          const x = element.payload.toJSON();
          // tslint:disable-next-line: no-string-literal
          x['skey'] = element.key;

          tmpValues.push(x as DatosEenergias);
        });

        this.fullDataList.push(tmpValues);
        if (index === 1) {
          this.totalAverage();
        }
      });
    }
  }

  public totalAverage() {
    this.averageData = [];
    this.fullDataList.forEach(element => {
      let contador = 0;
      let acumulador: DatosPromedioEenergias = new DatosPromedioEenergias();
      let acmH = 0;
      const tmpListDE: DatosPromedioEenergias[] = [];
      element.forEach(el1 => {
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
            tmpListDE.push(acumulador);
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
      this.averageData.push(tmpListDE);
    });
    this.getValuesTables();
  }


  public getValuesTables() {
    const listPotencias: DatosPromedioEenergias[][] = [];
    const sortListPotencias: DatosPromedioEenergias[][] = [];

    this.energiasDias = [];
    this.potenciasMaxs = [];
    this.potenciasMins = [];
    this.horasMaxs = [];
    this.horasMins = [];

    this.averageData.forEach(element => {
      listPotencias.push(element);
    });

    let tmp1: DatosPromedioEenergias[] = [];
    this.sortByPotenciaMax1(listPotencias[2]).forEach(element => {
      tmp1.push(element);
    });
    sortListPotencias.push(tmp1);

    tmp1 = [];
    this.sortByPotenciaMax1(listPotencias[1]).forEach(element => {
      tmp1.push(element);
    });
    sortListPotencias.push(tmp1);

    tmp1 = [];
    this.sortByPotenciaMax1(listPotencias[0]).forEach(element => {
      tmp1.push(element);
    });
    sortListPotencias.push(tmp1);

    tmp1 = [];
    this.sortByPotenciaMax2(listPotencias[2]).forEach(element => {
      tmp1.push(element);
    });
    sortListPotencias.push(tmp1);

    tmp1 = [];
    this.sortByPotenciaMax2(listPotencias[1]).forEach(element => {
      tmp1.push(element);
    });
    sortListPotencias.push(tmp1);

    tmp1 = [];
    this.sortByPotenciaMax2(listPotencias[0]).forEach(element => {
      tmp1.push(element);
    });
    sortListPotencias.push(tmp1);

    tmp1 = [];
    this.sortByPotenciaMax3(listPotencias[2]).forEach(element => {
      tmp1.push(element);
    });
    sortListPotencias.push(tmp1);

    tmp1 = [];
    this.sortByPotenciaMax3(listPotencias[1]).forEach(element => {
      tmp1.push(element);
    });
    sortListPotencias.push(tmp1);

    tmp1 = [];
    this.sortByPotenciaMax3(listPotencias[0]).forEach(element => {
      tmp1.push(element);
    });
    sortListPotencias.push(tmp1);

    for (let i = 0; i < sortListPotencias.length; i++) {
      const element = sortListPotencias[i];
      if (i < 3) {
        let tmpAcumulador = 0;
        element.forEach(el1 => {
          tmpAcumulador += el1.potenciaPromedio1;
        });
        tmpAcumulador = Math.round(tmpAcumulador * 1000) / 1000 ;
        this.energiasDias.push(tmpAcumulador);
        this.potenciasMins.push(element[0].potenciaPromedio1);
        this.horasMins.push(element[0].hora);
        this.potenciasMaxs.push(element[element.length - 1].potenciaPromedio1);
        this.horasMaxs.push(element[element.length - 1].hora);
      }

      if (i > 2 && i < 6) {
        let tmpAcumulador = 0;
        element.forEach(el1 => {
          tmpAcumulador += el1.potenciaPromedio2;
        });
        tmpAcumulador = Math.round(tmpAcumulador * 1000) / 1000 ;
        this.energiasDias.push(tmpAcumulador);
        this.potenciasMins.push(element[0].potenciaPromedio2);
        this.horasMins.push(element[0].hora);
        this.potenciasMaxs.push(element[element.length - 1].potenciaPromedio2);
        this.horasMaxs.push(element[element.length - 1].hora);
      }

      if (i > 5) {
        let tmpAcumulador = 0;
        element.forEach(el1 => {
          tmpAcumulador += el1.potenciaPromedio3;
        });
        tmpAcumulador = Math.round(tmpAcumulador * 1000) / 1000 ;
        this.energiasDias.push(tmpAcumulador);
        this.potenciasMins.push(element[0].potenciaPromedio3);
        this.horasMins.push(element[0].hora);
        this.potenciasMaxs.push(element[element.length - 1].potenciaPromedio3);
        this.horasMaxs.push(element[element.length - 1].hora);
      }

    }
    this.graficar();

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

  graficar() {
    const tmpFechas: string[] = [];
    for (let i = this.fechas.length - 1 ; i >= 0; i--) {
      tmpFechas.push(String(this.fechas[i]));
    }
    this.fechas = tmpFechas;

    this.pieChartData1 = [];
    this.pieChartData2 = [];
    this.pieChartData3 = [];
    this.pieChartLabels = [];

    for (let i = 0; i < this.energiasDias.length; i++) {
      const element = this.energiasDias[i];
      if ( i < 3 ) {
        this.pieChartData1.push(element);
      }

      if ( i > 2 && i < 6 ) {
        this.pieChartData2.push(element);
      }

      if ( i > 5 ) {
        this.pieChartData3.push(element);
      }

    }

    this.fechas.forEach(element => {
      this.pieChartLabels.push(element);
    });

    this.chart.chart.update();

  }
}
