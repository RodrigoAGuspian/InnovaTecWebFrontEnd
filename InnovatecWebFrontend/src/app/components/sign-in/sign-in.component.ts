import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  formSignIn: FormGroup;
  constructor(public fb: FormBuilder, public authService: AuthService
  ) {
      this.formSignIn = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
      });
   }

  ngOnInit() {
  }

  validateData() {
    console.log(this.formSignIn.value);
  }

}
