import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    templateUrl: './reguladores.component.html'
})

export class ReguladoresComponent implements OnInit {

    constructor(
        private titleService: Title
    ) {
        this.titleService.setTitle('Innovatec - Proyectos de investigación - Reguladores FV');
    }

    imgs: any = [];

    ngOnInit() {
        this.getImagenes();
    }

    getImagenes() {
        this.imgs = [
            { src: "https://github.com/STIVEN24/innovatecWeb-Frontend/blob/master/src/assets/media/imgs/reguladores/reguladores1.jpg?raw=true", title: "img1", subtitle: "img1" },
            { src: "https://github.com/STIVEN24/innovatecWeb-Frontend/blob/master/src/assets/media/imgs/reguladores/reguladores2.jpg?raw=true", title: "img2", subtitle: "img2" },
            { src: "https://github.com/STIVEN24/innovatecWeb-Frontend/blob/master/src/assets/media/imgs/reguladores/reguladores3.jpg?raw=true", title: "img3", subtitle: "img3" },
            { src: "https://github.com/STIVEN24/innovatecWeb-Frontend/blob/master/src/assets/media/imgs/reguladores/reguladores4.jpg?raw=true", title: "img4", subtitle: "img4" },
            { src: "https://github.com/STIVEN24/innovatecWeb-Frontend/blob/master/src/assets/media/imgs/reguladores/reguladores5.jpg?raw=true", title: "img5", subtitle: "img5" },
            { src: "https://github.com/STIVEN24/innovatecWeb-Frontend/blob/master/src/assets/media/imgs/reguladores/reguladores6.jpg?raw=true", title: "img6", subtitle: "img6" }
        ]
    }

}