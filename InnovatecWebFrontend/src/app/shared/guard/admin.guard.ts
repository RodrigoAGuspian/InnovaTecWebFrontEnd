import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { AdminService } from '../services/admin.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  constructor(public authService: AuthService, public router: Router, private snackBar: MatSnackBar,
              private consultarUsuario: AdminService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return new Promise((resolve, reject) => {
        if (this.authService.isLoggedIn !== true) {
          window.alert('Usted no puede acceder a esta dirección');
          this.router.navigate(['']);
          resolve(false);
        } else {
          const user = JSON.parse(localStorage.getItem('user'));
          console.log(user.email);
          let rol = ' ';
          this.consultarUsuario.getUsers().snapshotChanges().subscribe(
            item => {
              item.forEach(element => {
                const x = element.payload.toJSON();
                // tslint:disable-next-line: no-string-literal
                if (x['email'] === user.email ) {
                  // tslint:disable-next-line: no-string-literal
                  rol = x['rol'];
                }
              });
              if (!(rol === 'Administrador' || rol === 'Super-Administrador' )) {
                window.alert('Usted no puede acceder a esta dirección');
                AdminService.accessAdmin = false;
                this.router.navigate(['']);
                resolve(false);
              } else {
                AdminService.accessAdmin = true;
                resolve(true);
              }
            }
          );
        }
      });


    }


}
