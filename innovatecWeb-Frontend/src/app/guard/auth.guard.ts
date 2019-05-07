import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// --- services --- //
import { CuentaService } from '../services/cuenta.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private cuentaService: CuentaService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.cuentaService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/logIn']);
      return false;
    }
  }

}