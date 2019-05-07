import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

import * as CanvasJS from '../../../assets/static/js/canvasjs/canvasjs.min.js';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html'
})

export class indexComponent implements OnInit {

    public chart: any = null;

    public dataPoints = [];

    constructor(
        private http: HttpClient,
        private titleService: Title
    ) { }

    ngOnInit() {

        this.titleService.setTitle('Innovatec - Inicio');

        this.chart = new CanvasJS.Chart('chart', {
            animationEnabled: true,
            zoomEnabled: true,
            title: {
                text: "Irradiancia vs Tiempo"
            },
            axisX: {
                title: "Tiempo",
                includeZero: false
            },
            axisY: {
                title: "Voltaje",
                includeZero: false
            },
            axisY2: {
                title: "Irradiancia"
            },
            toolTip: { shared: true },
            data: [
                {
                    type: "spline",
                    name: "Voltaje",
                    xValueFormatString: "hh:mm:ss",
                    dataPoints: []
                },
                {
                    type: "spline",
                    name: "Irradiancia",
                    axisYType: "secondary",
                    dataPoints: []
                }
            ]
        });
        this.showData();

    }

    private showData(): void {
        this.getApiTimeReal().subscribe(res => {

            for (var i = 0; i < res.valores.length; i++) {

                this.chart.options.data[0].dataPoints.push({
                    x: new Date(res.valores[i].fecha_hora),
                    y: parseInt(res.valores[i].voltaje),
                });
                this.chart.options.data[1].dataPoints.push({
                    x: new Date(res.valores[i].fecha_hora),
                    y: parseInt(res.valores[i].irradiancia),
                });
            }
            this.chart.render();
        }, error => {
            console.error("ERROR: Unexpected response");
        });
    }

    private getApiTimeReal(): Observable<any> {
        return this.http.get(
            'https://innovatec-server.herokuapp.com/api/chart',
            { responseType: 'json' }
        );
    }

}