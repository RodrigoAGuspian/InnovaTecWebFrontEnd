import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BaseChartDirective, Color, Label } from 'ng2-charts';
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import { DatosProSolar } from 'src/app/shared/models/datos-pro-solar';
import { MatSnackBar } from '@angular/material';
import { DatosProSolarService } from 'src/app/shared/services/datos-pro-solar.service';
import { FilterDataProSolar } from 'src/app/shared/models/filter-data-pro-solar';
import { FormControl } from '@angular/forms';
import { DatosExportarProsolar } from 'src/app/shared/models/datos-exportar-prosolar';
import { ExportExcelService } from 'src/app/shared/services/export-excel.service';

@Component({
  selector: 'app-query-for-month',
  templateUrl: './query-for-month.component.html',
  styleUrls: ['./query-for-month.component.css']
})
export class QueryForMonthComponent implements OnInit {

  modos: number[] = [1, 2, 4];
  chartsEnables: boolean[] = [true, false, false, false];

  public fullDataList: DatosProSolar[][] = [];
  public realData: FilterDataProSolar[];
  public exportList: DatosExportarProsolar[] = [];

  public dataValues: number[] = [];

  datePickerValue: string;
  datePickerValueSplit: string [];
  numDays: number;

  colorLine: string;
  colorBorder: string;
  valueLabel: string;

  public charDataSets: ChartDataSets = { data: this.dataValues, label: this.valueLabel };
  public barChartData = [this.charDataSets] ;
  public barChartLabels: Label[] = [];

  public dataValues1: number[] = [];

  colorLine1: string;
  colorBorder1: string;
  valueLabel1: string;

  public charDataSets1: ChartDataSets = { data: this.dataValues1, label: this.valueLabel1 };
  public barChartData1 = [this.charDataSets] ;

  public dataValues2: number[] = [];

  colorLine2: string;
  colorBorder2: string;
  valueLabel2: string;

  monthInputCtrl: FormControl = new FormControl();

  public charDataSets2: ChartDataSets = { data: this.dataValues2, label: this.valueLabel2 };
  public barChartData2 = [this.charDataSets] ;

  public dataValues3: number[] = [];

  colorLine3: string;
  colorBorder3: string;
  valueLabel3: string;

  public charDataSets3: ChartDataSets = { data: this.dataValues3, label: this.valueLabel3 };
  public barChartData3 = [this.charDataSets] ;

  public deteccion = false;
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
      backgroundColor: this.colorBorder,
      pointBorderColor: this.colorBorder,
      pointBackgroundColor: this.colorBorder,
    },
  ];
  public lineChartColors1: Color[] = [
    {
      borderColor: this.colorLine1,
      backgroundColor: this.colorBorder1,
      pointBorderColor: this.colorBorder1,
      pointBackgroundColor: this.colorBorder1,
    },
  ];

  public lineChartColors2: Color[] = [
    {
      borderColor: this.colorLine2,
      backgroundColor: this.colorBorder2,
      pointBorderColor: this.colorBorder2,
      pointBackgroundColor: this.colorBorder2,
    },
  ];

  public lineChartColors3: Color[] = [
    {
      borderColor: this.colorLine3,
      backgroundColor: this.colorBorder3,
      pointBorderColor: this.colorBorder3,
      pointBackgroundColor: this.colorBorder3,
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'bar';
  public lineChartPlugins = [];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;


  constructor(private snackBar: MatSnackBar, public infoList: DatosProSolarService, private excelService: ExportExcelService) {

    this.InizialiteValues();
   }
  ngOnInit() {
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
      const tmpValues: DatosProSolar[] = [];
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
          const tmpValues: DatosProSolar[] = [];
          datos.forEach(ele1 => {
            ele1.skey = keySplit[1];

            const tmpExportData = new DatosExportarProsolar();
            // tslint:disable-next-line: no-string-literal
            tmpExportData.hora = ele1['hora'];
            // tslint:disable-next-line: no-string-literal
            tmpExportData.irradiancia = ele1['irradiancia'];
            // tslint:disable-next-line: no-string-literal
            tmpExportData.humedad = ele1['humedad'];
            // tslint:disable-next-line: no-string-literal
            tmpExportData.corrientePanel = ele1['corrientePanel'];
            // tslint:disable-next-line: no-string-literal
            tmpExportData.voltajePanel = ele1['voltajePanel'];
            // tslint:disable-next-line: no-string-literal
            tmpExportData.temperatura = ele1['temperatura'];
            this.exportList.push(tmpExportData);

            tmpValues.push(ele1 as DatosProSolar);
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
    this.InizialiteValues();
    this.InputValuesChart();
  }

  promedioData() {
    this.realData = [];
    let contador = 0;
    for (let index = 0; index < this.numDays; index++) {
      const tmpValues: FilterDataProSolar = new FilterDataProSolar();
      this.realData.push(tmpValues);
    }
    this.fullDataList.forEach(element => {
      const acumulador: FilterDataProSolar = new FilterDataProSolar();
      acumulador.irradiancia = 0;
      acumulador.humedad = 0;
      acumulador.corrientePanel = 0;
      acumulador.voltajePanel = 0;
      acumulador.temperatura = 0;
      contador = 0;
      let tmpSkey = 0;
      element.forEach(el1 => {
        if (!isNaN(Number(el1.irradiancia)) &&
            !isNaN(Number(el1.humedad)) &&
            !isNaN(Number(el1.corrientePanel)) &&
            !isNaN(Number(el1.voltajePanel)) &&
            !isNaN(Number(el1.temperatura))) {
            try {
              contador++;
              // Injerto que no debe hacerce
              tmpSkey = Number(el1.skey);
              acumulador.irradiancia += Number(el1.irradiancia);
              acumulador.humedad += Number(el1.humedad);
              acumulador.corrientePanel += Number(el1.corrientePanel);
              acumulador.voltajePanel += Number(el1.voltajePanel);
              acumulador.temperatura += Number(el1.temperatura);
            } catch (error) {
            }
        }

      });
      acumulador.irradiancia = acumulador.irradiancia / contador;
      acumulador.humedad = acumulador.humedad / contador;
      acumulador.temperatura = acumulador.temperatura / contador;
      acumulador.corrientePanel = acumulador.corrientePanel / contador;
      acumulador.voltajePanel = acumulador.voltajePanel / contador;
      this.realData[tmpSkey] = (acumulador);
    });


  }

  InizialiteValues() {
    this.cleanValues();
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
        backgroundColor: this.colorBorder,
        pointBorderColor: this.colorBorder,
        pointBackgroundColor: this.colorBorder,
      },
    ];
    this.lineChartColors1 = [
      {
        borderColor: this.colorLine1,
        backgroundColor: this.colorBorder1,
        pointBorderColor: this.colorBorder1,
        pointBackgroundColor: this.colorBorder1,
      },
    ];

    this.lineChartColors2 = [
      {
        borderColor: this.colorLine2,
        backgroundColor: this.colorBorder2,
        pointBorderColor: this.colorBorder2,
        pointBackgroundColor: this.colorBorder2,
      },
    ];

    this.lineChartColors3 = [
      {
        borderColor: this.colorLine3,
        backgroundColor: this.colorBorder3,
        pointBorderColor: this.colorBorder3,
        pointBackgroundColor: this.colorBorder3,
      },
    ];
    this.charDataSets = { data: this.dataValues, label: this.valueLabel };
    this.charDataSets1 = { data: this.dataValues1, label: this.valueLabel1 };
    this.charDataSets2 = { data: this.dataValues2, label: this.valueLabel2 };
    this.charDataSets3 = { data: this.dataValues3, label: this.valueLabel3 };
    this.barChartData = [this.charDataSets] ;
    this.barChartData1 = [this.charDataSets1] ;
    this.barChartData2 = [this.charDataSets2] ;
    this.barChartData3 = [this.charDataSets3] ;

  }
  cleanValues() {
    this.dataValues = [];
    this.dataValues1 = [];
    this.dataValues2 = [];
    this.dataValues3 = [];

    this.barChartData = [];
    this.barChartData1 = [];
    this.barChartData2 = [];
    this.barChartData3 = [];
  }
  InputValuesChart() {
    const listSort = this.realData;
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


      this.deteccion = true;


    }
    this.charDataSets = { data: this.dataValues, label: this.valueLabel };
    this.charDataSets1 = { data: this.dataValues1, label: this.valueLabel1 };
    this.chart.chart.update();

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
    try {
      this.InputValuesChart();
    } catch (error) {
    }

  }


  exportar() {
    if (this.deteccion) {
    const datePickerValue = this.monthInputCtrl.value;
    const month = datePickerValue.getMonth();
    const year = datePickerValue.getFullYear();
    const meses =
      ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const fullNameFile =  meses[month] + '-' + year + ' datos-prosolar'  ;
    this.excelService.exportAsExcelFile(this.exportList, fullNameFile );
    } else {
      this.snackBar.open('Por favor espere', 'Advertencia', {
        duration: 2000,
      });
    }
  }


}
