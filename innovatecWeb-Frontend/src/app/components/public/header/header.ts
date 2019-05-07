import { Component } from '@angular/core';
import { Router } from '@angular/router';

// --- services --- //
import { CuentaService } from 'src/app/services/cuenta.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.html'
})

export class header {

	constructor(
		private cuentaService: CuentaService,
		private router: Router
	) {}

	logOut() {
		this.cuentaService.logOut();
	}

}