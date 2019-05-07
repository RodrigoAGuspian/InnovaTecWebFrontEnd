import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// --- services --- //
import { RolService } from '../../../../services/rol.service';
import { ToastService } from 'src/app/services/elements/toasts.service';

import { Router } from '@angular/router';

// import { MustMatch } from '../../../../_helpers/must-match.validator';

@Component({
    templateUrl: 'rol.component.html'
})

export class RolFormComponent {

    // registerForm: FormGroup;
    // submitted = false;

    // constructor(private formBuilder: FormBuilder) { }

    // ngOnInit() {
    //     this.registerForm = this.formBuilder.group({
    //         firstName: ['', Validators.required],
    //         lastName: ['', Validators.required],
    //         email: ['', [Validators.required, Validators.email]],
    //         password: ['', [Validators.required, Validators.minLength(6)]],
    //         confirmPassword: ['', Validators.required]
    //     }, {
    //         validator: MustMatch('password', 'confirmPassword')
    //     });
    // }

    // get f() { return this.registerForm.controls; }

    // onSubmit() {
    //     this.submitted = true;

    //     if (this.registerForm.invalid) {
    //         return;
    //     }

    //     alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
    // }

    formRol: FormGroup;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private rolService: RolService,
        private router: Router,
        private toasts: ToastService
    ) { }

    ngOnInit() {
        this.formRol = this.formBuilder.group({
            nombre_rol: ['', Validators.required]
        });
    }

    get f() { return this.formRol.controls }

    createRol() {
        this.submitted = true;
        if (this.formRol.invalid) { return }
        this.rolService.createRol(this.formRol.value)
            .subscribe(
                res => this.router.navigate(['/admin/roles']),
                err => this.toasts.CreateElementToast('Rol ya registrado')
            );
    }

}