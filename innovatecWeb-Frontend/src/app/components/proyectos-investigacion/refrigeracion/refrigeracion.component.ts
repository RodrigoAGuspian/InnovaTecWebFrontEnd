import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    templateUrl: './refrigeracion.component.html'
})

export class RefrigeracionComponent implements OnInit {

    constructor(
        private titleService: Title
    ) {
        this.titleService.setTitle('Innovatec - Proyectos de investigación - Refrigeración');
    }

    imgs: any = [];

    ngOnInit() {
        this.getImagenes();
    }

    getImagenes() {
        this.imgs = [
            { src: "https://github.com/STIVEN24/innovatecWeb-Frontend/blob/master/src/assets/media/imgs/refrigeracion/refrigeracion1.1.jpg?raw=true", title: "img1", subtitle: "img1" },
            { src: "https://github.com/STIVEN24/innovatecWeb-Frontend/blob/master/src/assets/media/imgs/refrigeracion/refrigeracion1.2.jpg?raw=true", title: "img2", subtitle: "img2" },
            { src: "https://github.com/STIVEN24/innovatecWeb-Frontend/blob/master/src/assets/media/imgs/refrigeracion/refrigeracion1.jpg?raw=true", title: "img3", subtitle: "img3" },
            { src: "https://github.com/STIVEN24/innovatecWeb-Frontend/blob/master/src/assets/media/imgs/refrigeracion/refrigeracion2.jpg?raw=true", title: "img4", subtitle: "img4" },
            { src: "https://github.com/STIVEN24/innovatecWeb-Frontend/blob/master/src/assets/media/imgs/refrigeracion/refrigeracion3.jpg?raw=true", title: "img5", subtitle: "img5" },
            { src: "https://github.com/STIVEN24/innovatecWeb-Frontend/blob/master/src/assets/media/imgs/refrigeracion/refrigeracion4.jpg?raw=true", title: "img6", subtitle: "img6" }
        ]
    }

}