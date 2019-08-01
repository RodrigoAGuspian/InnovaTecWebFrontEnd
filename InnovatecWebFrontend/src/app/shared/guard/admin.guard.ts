import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { RolesService } from '../services/roles.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  constructor(public authService: AuthService, public router: Router, private snackBar: MatSnackBar,
              private rolesService: RolesService) { }
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
          let rolSuperAdministrador = false;
          let rolAdministrador = false;
          this.rolesService.getSuperAdministradores().snapshotChanges().subscribe(
            item => {

              for (let i = 0; i < item.length; i++) {
                const element = item[i];
                const x = element.payload.toJSON();
                // tslint:disable-next-line: no-string-literal
                if (x['email'] === user.email ) {
                  // tslint:disable-next-line: no-string-literal
                    rolSuperAdministrador = true;
                }
                if (item.length - 1 === i) {

                  this.rolesService.getAdministradores().snapshotChanges().subscribe(
                    item1 => {
                      item1.forEach(element1 => {
                        const x1 = element1.payload.toJSON();
                        // tslint:disable-next-line: no-string-literal
                        if (x1['email'] === user.email ) {
                          // tslint:disable-next-line: no-string-literal
                            rolAdministrador = true;
                        }
                      });
                      if (rolSuperAdministrador || rolAdministrador) {
                        resolve(true);
                      } else {
                        window.alert('Usted no puede acceder a esta dirección');
                        this.router.navigate(['']);
                        resolve(false);
                      }
                    }
                  );

                }
              }
            }
          );
        }
      });


    }


}
