import { Component, OnInit, ViewChild } from '@angular/core';
import { DatosProSolar } from 'src/app/shared/models/datos-pro-solar';
import { FilterDataProSolar } from 'src/app/shared/models/filter-data-pro-solar';
import { DatosPromedioProSolar } from 'src/app/shared/models/datos-promedio-pro-solar';
import { BaseChartDirective, Label } from 'ng2-charts';
import { MatSnackBar } from '@angular/material';
import { ChartOptions, ChartType } from 'chart.js';
import { DatosProSolarService } from 'src/app/shared/services/datos-pro-solar.service';
import { ConvertHours } from 'src/app/shared/utilities/convert-hours';
declare let $: any;

@Component({
  selector: 'app-resumen-pro-solar',
  templateUrl: './resumen-pro-solar.component.html',
  styleUrls: ['./resumen-pro-solar.component.css']
})
export class ResumenProSolarComponent implements OnInit {
  public fullDataList: DatosProSolar[][] = [];
  public realDataList: FilterDataProSolar[] = [];
  public deteccion = false;
  public irradianciasGlobs: number[] = [];
  public energiasGlobs: number[] = [];
  public horasSol: number[] = [];
  public fechas: string[] = [];

  public averageData: DatosPromedioProSolar[][] = [];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  constructor(private snackBar: MatSnackBar, public infoList: DatosProSolarService) { }

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


  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartLabels: Label[] = ['', '', ''];

  ngOnInit() {
    $('.dropdown-trigger').dropdown();
    $('.sidenav').sidenav();
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
        const tmpValues: DatosProSolar[] = [];
        // tslint:disable-next-line: no-shadowed-variable
        item.forEach(element => {
          const x = element.payload.toJSON();
          // tslint:disable-next-line: no-string-literal
          x['skey'] = element.key;

          tmpValues.push(x as DatosProSolar);
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
      let acumulador: DatosPromedioProSolar = new DatosPromedioProSolar();
      let acmH = 0;
      const tmpListDE: DatosPromedioProSolar[] = [];
      element.forEach(el1 => {
        if (!isNaN(Number(el1.irradiancia)) &&
            !isNaN(Number(el1.humedad)) &&
            !isNaN(Number(el1.corrientePanel)) &&
            !isNaN(Number(el1.voltajePanel)) &&
            !isNaN(Number(el1.temperatura))) {
          contador++;
          acumulador.irradianciaPromedio += Number(el1.irradiancia);
          acumulador.humedadPromedio += Number(el1.humedad);
          acumulador.corrientePromedio += Number(el1.corrientePanel);
          acumulador.voltajePromedio += Number(el1.voltajePanel);
          acumulador.temperaturaPromedio += Number(el1.temperatura);

          const horaDato = ConvertHours.toConver24(el1.hora);
          if (acmH === 0) {
            acmH = horaDato.getHours();
          }
          if (horaDato.getHours() === acmH) {
            let tmpAcmH = acmH + 1;
            acumulador.irradianciaPromedio = Math.round (acumulador.irradianciaPromedio / contador * 1000) / 1000;
            acumulador.humedadPromedio = Math.round (acumulador.humedadPromedio / contador * 1000) / 1000;
            acumulador.corrientePromedio = Math.round (acumulador.corrientePromedio / contador * 1000) / 1000;
            acumulador.voltajePromedio = Math.round (acumulador.voltajePromedio / contador * 1000) / 1000;
            acumulador.temperaturaPromedio = Math.round (acumulador.temperaturaPromedio / contador * 1000) / 1000;
            acumulador.potenciaPromedio = Math.round( (acumulador.voltajePromedio) * (acumulador.corrientePromedio)  * 1000 ) / 1000 ;
            if (tmpAcmH === 24) {
              tmpAcmH = 0;

            }
            acumulador.hora = acmH + ' a ' + tmpAcmH;
            tmpListDE.push(acumulador);
            acumulador = new DatosPromedioProSolar();
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
    this.irradianciasGlobs = [];
    this.energiasGlobs = [];
    this.horasSol = [];

    this.averageData.forEach(element => {
      let tmpIrradianciaGlob = 0;
      let tmpEnergiaGlob = 0;
      element.forEach(el1 => {
          tmpIrradianciaGlob += el1.irradianciaPromedio;
          tmpEnergiaGlob += el1.potenciaPromedio;
          console.log(tmpEnergiaGlob);
        });
      tmpIrradianciaGlob = Math.round(tmpIrradianciaGlob * 1000 ) / 1000;
      tmpEnergiaGlob = Math.round(tmpEnergiaGlob * 1000 ) / 1000;
      const tmpHorasSol = Math.round(tmpIrradianciaGlob / 1000 * 1000 ) / 1000;
      this.irradianciasGlobs.push(tmpIrradianciaGlob);
      this.energiasGlobs.push(tmpEnergiaGlob);
      this.horasSol.push(tmpHorasSol);
    });


    this.graficar();

  }

  graficar() {
    const tmpFechas: string[] = [];
    for (let i = this.fechas.length - 1 ; i >= 0; i--) {
      tmpFechas.push(String(this.fechas[i]));
    }

    const tmpHoras: number[] = [];
    const tmpIrradianciasGlobs: number[] = [];
    const tmpEnergiasGlobs: number[] = [];

    for (let i = this.horasSol.length - 1 ; i >= 0; i--) {
      tmpHoras.push(this.horasSol[i]);
    }

    for (let i = this.irradianciasGlobs.length - 1 ; i >= 0; i--) {
      tmpIrradianciasGlobs.push(this.irradianciasGlobs[i]);
    }

    for (let i = this.fechas.length - 1 ; i >= 0; i--) {
      tmpEnergiasGlobs.push(this.energiasGlobs[i]);
    }

    this.fechas = tmpFechas;
    this.horasSol = tmpHoras;
    this.irradianciasGlobs = tmpIrradianciasGlobs;
    this.energiasGlobs = tmpEnergiasGlobs;

    this.pieChartData1 = [];
    this.pieChartLabels = [];

    this.irradianciasGlobs.forEach(element => {
      this.pieChartData1.push(element);
    });
    this.fechas.forEach(element => {
      this.pieChartLabels.push(element);
    });

    this.chart.chart.update();

  }

}
