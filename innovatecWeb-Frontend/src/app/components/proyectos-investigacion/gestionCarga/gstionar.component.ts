import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    templateUrl: './gestionar.component.html'
})

export class GestionarComponent implements OnInit {

    constructor(
        private titleService: Title
    ) {
        this.titleService.setTitle('Innovatec - Proyectos de investigación - Gestión de carga');
    }

    imgs: any = [];

    ngOnInit() {
        this.getImagenes();
    }

    getImagenes() {
        this.imgs = [
            { src: "https://github.com/STIVEN24/innovatecWeb-Frontend/blob/master/src/assets/media/imgs/gestionCargas/gestion1.jpg?raw=true", title: "img1", subtitle: "img1" },
            { src: "https://github.com/STIVEN24/innovatecWeb-Frontend/blob/master/src/assets/media/imgs/gestionCargas/gestion2.jpg?raw=true", title: "img2", subtitle: "img2" },
            { src: "https://github.com/STIVEN24/innovatecWeb-Frontend/blob/master/src/assets/media/imgs/gestionCargas/gestion3.jpg?raw=true", title: "img3", subtitle: "img3" },
            { src: "https://github.com/STIVEN24/innovatecWeb-Frontend/blob/master/src/assets/media/imgs/gestionCargas/gestion4.jpg?raw=true", title: "img4", subtitle: "img4" },
            { src: "https://github.com/STIVEN24/innovatecWeb-Frontend/blob/master/src/assets/media/imgs/gestionCargas/gestion5.jpg?raw=true", title: "img5", subtitle: "img5" },
            { src: "https://github.com/STIVEN24/innovatecWeb-Frontend/blob/master/src/assets/media/imgs/gestionCargas/gestion6.jpg?raw=true", title: "img6", subtitle: "img6" }
        ]
    }

}