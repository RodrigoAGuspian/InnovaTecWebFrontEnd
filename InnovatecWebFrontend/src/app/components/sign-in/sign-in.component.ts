import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogForgotPasswordComponent } from '../dialogs/dialog-forgot-password/dialog-forgot-password.component';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public breakpoint: number;
  formSignIn: FormGroup;
  constructor(public fb: FormBuilder, public authService: AuthService, public router: Router, public dialog: MatDialog
  ) {
      this.formSignIn = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
      });
   }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
  }

  enviarA() {
    this.router.navigate(['registro-de-usuario']);
  }
  enviarAO() {
    this.dialog.open(DialogForgotPasswordComponent);
  }
}
