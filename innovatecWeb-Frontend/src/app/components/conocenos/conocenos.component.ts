import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
	templateUrl : './conocenos.component.html'
})

export class ConocenosComponent implements OnInit {

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
        private titleService: Title
	) {
		this.titleService.setTitle('Innovatec - Conócenos');
	}

	ngOnInit() {

	}

}