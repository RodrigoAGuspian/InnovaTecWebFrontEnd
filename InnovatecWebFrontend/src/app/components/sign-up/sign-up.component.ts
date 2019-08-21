import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { UserInfo } from 'src/app/shared/models/user-info';
import { MustMatch } from 'src/app/shared/models/must-match.validator';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  formSignUp: FormGroup;
  userInfo: UserInfo;
  esLineal = false;
  tipos: string[] = ['Académico', 'Empresarial', 'Comercial', 'Otro'];
  default = 'Académico';

  constructor(public fb: FormBuilder, public authService: AuthService ) {
    this.formSignUp = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      cpassword: ['', [Validators.required]],
      primerN: ['', [Validators.required]],
      segundoN: [''],
      primerA: ['', [Validators.required]],
      segundoA: [''],
      tipoDeUso: [''],
      institucion: [''],
      pais: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
    }, { validator: MustMatch('password', 'cpassword') });

    this.formSignUp.controls.tipoDeUso.setValue(this.default, {onlySelf: true});
   }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.SignUp(this.formSignUp);
  }

}
