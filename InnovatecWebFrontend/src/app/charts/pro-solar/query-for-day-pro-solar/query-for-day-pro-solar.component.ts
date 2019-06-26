import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BaseChartDirective, Color, Label } from 'ng2-charts';
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import { DatosProSolar } from 'src/app/shared/models/datos-pro-solar';
import { MatSnackBar } from '@angular/material';
import { DatosProSolarService } from 'src/app/shared/services/datos-pro-solar.service';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';
import { DatosExportarProsolar } from 'src/app/shared/models/datos-exportar-prosolar';
import { FilterDataProSolar } from 'src/app/shared/models/filter-data-pro-solar';
import { DatosPromedioProSolar } from 'src/app/shared/models/datos-promedio-pro-solar';
import { ConvertHours } from 'src/app/shared/utilities/convert-hours';

@Component({
  selector: 'app-query-for-day-pro-solar',
  templateUrl: './query-for-day-pro-solar.component.html',
  styleUrls: ['./query-for-day-pro-solar.component.css']
})
export class QueryForDayProSolarComponent implements OnInit {

  modos: number[] = [1, 2, 4];
  chartsEnables: boolean[] = [true, false, false, false];

  public realTimeList: DatosProSolar[] = [];
  public dataValues: number[] = [];
  public realData: FilterDataProSolar[];
  public averageData: DatosPromedioProSolar[];
  public irradianciaGlobal: number;
  public potenciaGlobal: number;
  public horasSol: number;

  colorLine: string;
  colorBorder: string;
  valueLabel: string;
  public estadisticas: string[] = [];
  public exportList: DatosExportarProsolar[] = [];
  public charDataSets: ChartDataSets = { data: this.dataValues, label: this.valueLabel };
  public lineChartData = [this.charDataSets] ;
  public lineChartLabels: Label[] = [];

  public dataValues1: number[] = [];

  colorLine1: string;
  colorBorder1: string;
  valueLabel1: string;

  public charDataSets1: ChartDataSets = { data: this.dataValues1, label: this.valueLabel1 };
  public lineChartData1 = [this.charDataSets] ;
  public lineChartLabels1: Label[] = [];

  public dataValues2: number[] = [];

  colorLine2: string;
  colorBorder2: string;
  valueLabel2: string;

  public charDataSets2: ChartDataSets = { data: this.dataValues2, label: this.valueLabel2 };
  public lineChartData2 = [this.charDataSets] ;
  public lineChartLabels2: Label[] = [];

  public dataValues3: number[] = [];

  colorLine3: string;
  colorBorder3: string;
  valueLabel3: string;

  public charDataSets3: ChartDataSets = { data: this.dataValues3, label: this.valueLabel3 };
  public lineChartData3 = [this.charDataSets] ;
  public lineChartLabels3: Label[] = [];

  public deteccion = false;
  public solo1 = true;
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

  @ViewChild('datePicker') datePicker: ElementRef;

  constructor(private snackBar: MatSnackBar, public infoList: DatosProSolarService, private excelService: ExportExcelService) {
    this.InizialiteValues();
   }

  ngOnInit() {
  }


  graficar() {
    this.solo1 = true;
    const dateValue = this.datePicker.nativeElement.value;
    if ( dateValue.length > 0) {
      const infoDate = dateValue.split('/');
      this.infoList.getDataForDay(infoDate[1], infoDate[0], infoDate[2]).snapshotChanges().subscribe(item => {
        this.realTimeList = [];
        this.exportList = [];
        // tslint:disable-next-line: no-shadowed-variable
        item.forEach(element => {
          const x = element.payload.toJSON();
          // tslint:disable-next-line: no-string-literal
          x['skey'] = element.key;

          const tmpExportData = new DatosExportarProsolar();
          // tslint:disable-next-line: no-string-literal
          tmpExportData.hora = x['hora'];
          // tslint:disable-next-line: no-string-literal
          tmpExportData.irradiancia = x['irradiancia'];
          // tslint:disable-next-line: no-string-literal
          tmpExportData.humedad = x['humedad'];
          // tslint:disable-next-line: no-string-literal
          tmpExportData.corrientePanel = x['corrientePanel'];
          // tslint:disable-next-line: no-string-literal
          tmpExportData.voltajePanel = x['voltajePanel'];
          // tslint:disable-next-line: no-string-literal
          tmpExportData.temperatura = x['temperatura'];

          this.exportList.push(tmpExportData);
          this.realTimeList.push(x as DatosProSolar);

        });

        if (this.solo1) {
          this.cleanValues();
          this.InizialiteValues();
          this.InputValuesChart();
          this.totalAverage();
          this.solo1 = false;
        }

      });
    } else {
      this.snackBar.open('Por favor seleccione una fecha para poder graficar', 'Advertencia', {
        duration: 2000,
      });
    }
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
    this.charDataSets = { data: this.dataValues, label: this.valueLabel };
    this.charDataSets1 = { data: this.dataValues1, label: this.valueLabel1 };
    this.charDataSets2 = { data: this.dataValues2, label: this.valueLabel2 };
    this.charDataSets3 = { data: this.dataValues3, label: this.valueLabel3 };
    this.lineChartData = [this.charDataSets] ;
    this.lineChartData1 = [this.charDataSets1] ;
    this.lineChartData2 = [this.charDataSets2] ;
    this.lineChartData3 = [this.charDataSets3] ;

  }
  cleanValues() {
    this.dataValues = [];
    this.dataValues1 = [];
    this.dataValues2 = [];
    this.dataValues3 = [];

    this.lineChartLabels = [];
    this.lineChartLabels1 = [];
    this.lineChartLabels2 = [];
    this.lineChartLabels3 = [];
  }
  InputValuesChart() {
    const listSort = this.realTimeList;
    for (const element of listSort) {
      switch (this.modoGraficar) {
        case 0:
          this.dataValues.push(Number(element.humedad));
          this.valueLabel = 'Humedad';
          break;

        case 1:
          this.dataValues.push(Number(element.temperatura));
          this.valueLabel = 'Temperatura';
          break;

        case 2:
          this.dataValues.push(Number(element.irradiancia));
          this.valueLabel = 'Irradiancia';
          break;


        case 3:
          this.dataValues.push(Number(element.corrientePanel));
          this.valueLabel = 'Corriente';
          break;

        case 4:
          this.dataValues.push(Number(element.voltajePanel));
          this.valueLabel = 'Voltaje';
          break;

        default:
          break;
      }

      switch (this.modoGraficar1) {
        case 0:
          this.dataValues1.push(Number(element.humedad));
          this.valueLabel1 = 'Humedad';
          break;

        case 1:
          this.dataValues1.push(Number(element.temperatura));
          this.valueLabel1 = 'Temperatura';
          break;

        case 2:
          this.dataValues1.push(Number(element.irradiancia));
          this.valueLabel1 = 'Irradiancia';
          break;


        case 3:
          this.dataValues1.push(Number(element.corrientePanel));
          this.valueLabel1 = 'Corriente';
          break;

        case 4:
          this.dataValues1.push(Number(element.voltajePanel));
          this.valueLabel1 = 'Voltaje';
          break;

        default:
          break;
      }

      switch (this.modoGraficar2) {
        case 0:
          this.dataValues2.push(Number(element.humedad));
          this.valueLabel2 = 'Humedad';
          break;

        case 1:
          this.dataValues2.push(Number(element.temperatura));
          this.valueLabel2 = 'Temperatura';
          break;

        case 2:
          this.dataValues2.push(Number(element.irradiancia));
          this.valueLabel2 = 'Irradiancia';
          break;


        case 3:
          this.dataValues2.push(Number(element.corrientePanel));
          this.valueLabel2 = 'Corriente';
          break;

        case 4:
          this.dataValues2.push(Number(element.voltajePanel));
          this.valueLabel2 = 'Voltaje';
          break;

        default:
          break;
      }

      switch (this.modoGraficar3) {
        case 0:
          this.dataValues3.push(Number(element.humedad));
          this.valueLabel3 = 'Humedad';
          break;

        case 1:
          this.dataValues3.push(Number(element.temperatura));
          this.valueLabel3 = 'Temperatura';
          break;

        case 2:
          this.dataValues3.push(Number(element.irradiancia));
          this.valueLabel3 = 'Irradiancia';
          break;


        case 3:
          this.dataValues3.push(Number(element.corrientePanel));
          this.valueLabel3 = 'Corriente';
          break;

        case 4:
          this.dataValues3.push(Number(element.voltajePanel));
          this.valueLabel3 = 'Voltaje';
          break;

        default:
          break;
      }

      this.lineChartLabels.push(element.hora);
      this.lineChartLabels1.push(element.hora);
      this.lineChartLabels2.push(element.hora);
      this.lineChartLabels3.push(element.hora);
      this.deteccion = true;


    }
    this.charDataSets = { data: this.dataValues, label: this.valueLabel };
    this.charDataSets1 = { data: this.dataValues1, label: this.valueLabel1 };
    try {this.chart.chart.update(); } catch (error) {}

  }


  public cambioDeChart(modo: number) {
    this.modoGraficar = modo;
    this.graficar();
    this.InizialiteValues();
    this.InputValuesChart();
  }
  public cambioDeChart1(modo: number) {
    this.modoGraficar1 = modo;
    this.InizialiteValues();
    this.graficar();
    this.InputValuesChart();
  }
  public cambioDeChart2(modo: number) {
    this.modoGraficar2 = modo;
    this.InizialiteValues();
    this.graficar();
    this.InputValuesChart();
  }
  public cambioDeChart3(modo: number) {
    this.modoGraficar3 = modo;
    this.InizialiteValues();
    this.graficar();
    this.InputValuesChart();
  }

  public totalAverage() {
    this.realData = [];
    let contador = 0;
    this.averageData = [];

    let acumulador: DatosPromedioProSolar = new DatosPromedioProSolar();

    contador = 0;
    let acmH = 0;

    this.realTimeList.forEach(el1 => {
      if (!isNaN(Number(el1.irradiancia)) &&
          !isNaN(Number(el1.humedad)) &&
          !isNaN(Number(el1.corrientePanel)) &&
          !isNaN(Number(el1.voltajePanel)) &&
          !isNaN(Number(el1.temperatura))) {
          try {
            contador++;
            acumulador.irradianciaPromedio += Number(el1.irradiancia);
            acumulador.humedadPromedio += Number(el1.humedad);
            acumulador.corrientePromedio += Number(el1.corrientePanel);
            acumulador.voltajePromedio += Number(el1.voltajePanel);
            acumulador.temperaturaPromedio += Number(el1.temperatura);
          } catch (error) {
          }
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
            this.averageData.push(acumulador);

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

    this.getGlobal();

  }




  getGlobal() {
    this.irradianciaGlobal = 0;
    this.potenciaGlobal = 0;
    this.averageData.forEach(element => {
      this.irradianciaGlobal += element.irradianciaPromedio;
      this.potenciaGlobal += element.potenciaPromedio;
    });
    this.irradianciaGlobal = Math.round(this.irradianciaGlobal * 1000 ) / 1000;
    this.horasSol = Math.round(this.irradianciaGlobal / 1000 * 1000 ) / 1000;

  }





  public mostrarCharts(cuantos: number) {
    this.cleanValues();
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

  exportar() {
    if (this.deteccion) {
      const dateSplit = this.datePicker.nativeElement.value.split('/');
      const day = dateSplit[1];
      const month = dateSplit[0];
      const year = dateSplit[2];
      const jsonExport1: any[] = [];
      this.averageData.forEach(element => {
        const expData: any = {
          hora: element.hora,
          irradianciaPromedio: element.irradianciaPromedio,
          humedadPromedio: element.humedadPromedio,
          corrientePromedio: element.corrientePromedio,
          voltajePromedio: element.voltajePromedio,
          potenciaPromedio: element.potenciaPromedio,
          temperaturaPromedio: element.temperaturaPromedio,
        };
        jsonExport1.push(expData);

      });

      const jsonExport2: any[] = [];
      const tmpAny1: any = {
        IrradianciaGlobal: this.irradianciaGlobal,
        PotenciaGlobal: this.potenciaGlobal,
        HorasDeSol: this.horasSol
      };
      jsonExport2.push(tmpAny1);
      this.excelService.exportAsExcelFile(this.exportList, day + '-' + month + '-' + year + ' ' + 'datos-prosolar', jsonExport1,
                                          jsonExport2, 'G1', 'P1' );
    } else {
      this.snackBar.open('Por favor espere', 'Advertencia', {
        duration: 2000,
      });
    }
  }
}
