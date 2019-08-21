import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-forgot-password',
  templateUrl: './dialog-forgot-password.component.html',
  styleUrls: ['./dialog-forgot-password.component.css']
})
export class DialogForgotPasswordComponent implements OnInit {
  formForgotPassword: FormGroup;
  constructor(public fb: FormBuilder, private authService: AuthService) {
    this.formForgotPassword = this.fb.group({
    email: ['', [Validators.required, Validators.email]],

  });
}

  ngOnInit() {
  }

  onSubmit() {
    this.authService.ForgotPassword(this.formForgotPassword.value.email);
  }

}
