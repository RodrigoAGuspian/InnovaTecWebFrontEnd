import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    templateUrl: './potabilizacion.component.html'
})

export class PotabilizacionComponent implements OnInit {

    constructor(
        private titleService: Title
    ) {
        this.titleService.setTitle('Innovatec - Proyectos de investigación - Potabilización de agua');
    }

    imgs: any = [];

    ngOnInit() {
        this.getImagenes();
    }

    getImagenes() {
        this.imgs = [
            { src: "https://github.com/STIVEN24/innovatecWeb-Frontend/blob/master/src/assets/media/imgs/potabilizacion/aguas1.jpg?raw=true", title: "img1", subtitle: "img1" },
            { src: "https://github.com/STIVEN24/innovatecWeb-Frontend/blob/master/src/assets/media/imgs/potabilizacion/aguas2.jpg?raw=true", title: "img2", subtitle: "img2" },
            { src: "https://github.com/STIVEN24/innovatecWeb-Frontend/blob/master/src/assets/media/imgs/potabilizacion/aguas3.jpg?raw=true", title: "img3", subtitle: "img3" },
            { src: "https://github.com/STIVEN24/innovatecWeb-Frontend/blob/master/src/assets/media/imgs/potabilizacion/aguas4.jpg?raw=true", title: "img4", subtitle: "img4" },
            { src: "https://github.com/STIVEN24/innovatecWeb-Frontend/blob/master/src/assets/media/imgs/potabilizacion/aguas5.jpg?raw=true", title: "img5", subtitle: "img5" },
            { src: "https://github.com/STIVEN24/innovatecWeb-Frontend/blob/master/src/assets/media/imgs/potabilizacion/aguas6.jpg?raw=true", title: "img6", subtitle: "img6" },
            { src: "https://github.com/STIVEN24/innovatecWeb-Frontend/blob/master/src/assets/media/imgs/potabilizacion/aguas7.jpg?raw=true", title: "img7", subtitle: "img7" },
            { src: "https://github.com/STIVEN24/innovatecWeb-Frontend/blob/master/src/assets/media/imgs/potabilizacion/aguas8.jpg?raw=true", title: "img8", subtitle: "img8" }
        ]
    }

}