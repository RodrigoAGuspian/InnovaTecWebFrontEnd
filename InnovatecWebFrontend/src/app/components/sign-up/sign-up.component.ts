import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { UserInfo } from 'src/app/shared/models/user-info';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  formSignUp: FormGroup;
  userInfo: UserInfo;
  constructor(public fb: FormBuilder, public authService: AuthService ) {
    this.formSignUp = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      cpassword: ['', [Validators.required]],
      primerN: ['', [Validators.required, Validators.name]],
      primerA: ['', [Validators.required, Validators.email]],
      pais: ['', [Validators.required, Validators.name]],
      departamento: ['', [Validators.required, Validators.name]],
      ciudad: ['', [Validators.required, Validators.name]],
    });
   }

  validData() {
    console.log(this.formSignUp.value);
  }
  ngOnInit() {
  }

}
