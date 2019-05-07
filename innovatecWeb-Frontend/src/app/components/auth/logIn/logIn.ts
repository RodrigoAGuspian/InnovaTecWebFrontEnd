import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// --- Services --- //
import { CuentaService } from 'src/app/services/cuenta.service';
import { ToastService } from '../../../services/elements/toasts.service';

@Component({
	templateUrl: './logIn.html'
})
export class logIn implements OnInit {

	submitted = false;

	logInFormGroup: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private toasts: ToastService,
		private cuentaService: CuentaService,
		private router: Router
	) {
		if (this.cuentaService.logged) {
			this.toasts.CreateElementToast("Ya tienes sesión abierta");
			this.router.navigate(['/'])
		};
	}

	ngOnInit() {
		this.logInFormGroup = this.formBuilder.group({
			correo: ['', [Validators.required, Validators.email]],
			documento: ['', [Validators.required]]
		});
	}

	get getErrors() { return this.logInFormGroup.controls; }

	logIn() {
		this.submitted = true;
		if (this.logInFormGroup.invalid) {
			return;
		}
		this.cuentaService.logIn(this.logInFormGroup.value).subscribe(
			(res:any) => {
				localStorage.setItem("authToken", res.token);
				localStorage.setItem('authTokenUsuarioRol', res.usuario[0].nombre_rol);
				this.router.navigate(['/']);
			},
			err => this.toasts.CreateElementToast(err.error.text)
		)
	}

}