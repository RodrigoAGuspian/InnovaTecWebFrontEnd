import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// --- models --- //
import { Cuenta } from '../../../models/Cuenta';
// --- services --- //
import { CuentaService } from '../../../services/cuenta.service';
import { RolService } from '../../../services/rol.service';
import { TipoDocumentoService } from '../../../services/tipoDocumento.service';
import { ToastService } from 'src/app/services/elements/toasts.service';

@Component({
	templateUrl: './signUp.html'
})

export class signUp implements OnInit {

	roles: any = [];
	tipos_documento: any = [];

	cuenta: Cuenta = {
	    id_cuenta: 0,
	    id_tipo_documento: 0,
	    documento: 0,
	    primer_nombre: '',
	    segundo_nombre: '',
	    primer_apellido: '',
	    segundo_apellido: '',
	    celular: 0,
	    correo: '',
	    id_rol: 0
	};

	update: boolean = false;
	submitted: boolean = false;
	signUpForm: FormGroup;

	constructor(
		private cuentaService: CuentaService,
		private rolService: RolService,
		private tipoDocumentoService: TipoDocumentoService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private formBuilder: FormBuilder,
		private toasts: ToastService
	) { }

	ngOnInit() {

		this.getTiposDocumento();
		this.getRols();

		this.signUpForm = this.formBuilder.group({
			id_tipo_documento: ['', Validators.required],
			documento: ['', [Validators.required, Validators.minLength(7)]],
			primer_nombre: ['', Validators.required],
			segundo_nombre: [''],
			primer_apellido: ['', Validators.required],
			segundo_apellido: [''],
			celular: [''],
			correo: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
			id_rol: ['', Validators.required]
		});

		const params = this.activatedRoute.snapshot.params;
		if (params.id) {
			this.cuentaService.getUser(params.id).subscribe(
				res => {
					this.cuenta = res;
					this.update = true
				},
				err => this.router.navigate(['/admin/usuarios'])
			)
		}

	}

	get getErrors() { return this.signUpForm.controls; }

	signUp() {
		this.submitted = true;
		if (this.signUpForm.invalid) {
			return;
		}
		this.cuentaService.createUser(this.signUpForm.value).subscribe(
			res => this.router.navigate(['/admin/usuarios']),
			err => {
				if (err.error.length > 0) {
					for (var i = 0; i < err.error.length; i++) {
						this.toasts.CreateElementToast(err.error[i].text);
					}
				}
			}
		)
	}

	getRols() {
		this.rolService.getRols().subscribe(
			res => {
				this.roles = res;
				if (this.roles.indexOf(this.roles[0]) > -1) this.roles.splice(this.roles.indexOf(this.roles[0]), 1);
			},
			err => console.log(err)
		);
	}

	getTiposDocumento() {
		this.tipoDocumentoService.getTiposDocumento().subscribe(
			res => {
				this.tipos_documento = res;
			},
			err => console.log(err)
		);
	}

	updateUsuario() {
		this.cuentaService.updateUser(this.cuenta.id_cuenta, this.cuenta).subscribe(
			res => {
				this.toasts.CreateElementToast('Usuarios actualizado')
				this.router.navigate(['/admin/usuarios']);
			},
			err => console.log(err),
		)
	}

	cancelarUpdate() {
		this.router.navigate(['/admin/usuarios']);
	}

}