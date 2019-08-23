import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MustMatch } from 'src/app/shared/models/must-match.validator';


@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent implements OnInit {
  formChangePassword: FormGroup;
  oldPassword = '';
  newPassword = '';
  constructor(public fb: FormBuilder, private authService: AuthService) {
    this.formChangePassword = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      cpassword: ['', [Validators.required]],
    }, { validator: MustMatch('newPassword', 'cpassword') });
   }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.UpdatePassword(this.formChangePassword.value.oldPassword, this.formChangePassword.value.newPassword);
    this.formChangePassword.value.oldPassword = '';
    this.formChangePassword.value.newPassword = '';
    this.formChangePassword.value.cpassword = '';
  }

}
