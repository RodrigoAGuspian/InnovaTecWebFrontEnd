import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserInfoService } from 'src/app/shared/services/user-info.service';
import { UserInfo } from 'src/app/shared/models/user-info';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  formInfoPrincipal: FormGroup;
  formInfoAdicional: FormGroup;
  userInfo = new UserInfo();
  esLineal = false;
  modificarEmail = false;
  tipos: string[] = ['Académico', 'Empresarial', 'Comercial', 'Otro'];
  default = 'Académico';
  constructor(public fb: FormBuilder, public authService: AuthService,
              public userInfoService: UserInfoService, private snackBar: MatSnackBar) {
    this.insertDataOfUser();
    this.getUser();
   }

  ngOnInit() {

  }

  public getUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.userInfoService.getUsers().snapshotChanges().subscribe(
      item => {

        item.forEach(element => {
          const x = element.payload.toJSON();
          // tslint:disable-next-line: no-string-literal
          if (x['email'] === user.email ) {
            // tslint:disable-next-line: no-string-literal
            x['skey'] = element.key;
            this.userInfo = x as UserInfo;
            this.insertDataOfUser();
          }
        });
      }
    );
  }

  public insertDataOfUser() {
    this.formInfoPrincipal = this.fb.group({
      email: [{ value: this.userInfo.email, disabled: !this.modificarEmail}],
      primerN: [this.userInfo.primerN, [Validators.required]],
      segundoN: [this.userInfo.segundoN],
      primerA: [this.userInfo.primerA, [Validators.required]],
      segundoA: [this.userInfo.segundoA],

    });

    this.formInfoAdicional = this.fb.group(
      {
        tipoDeUso: [this.userInfo.tipoDeUso],
        institucion: [this.userInfo.institucion],
        pais: [this.userInfo.pais, [Validators.required]],
        departamento: [this.userInfo.departamento, [Validators.required]],
        ciudad: [this.userInfo.ciudad, [Validators.required]],
      }
    );
  }

  updateInfoPrincipal() {
    const perfil = new UserInfo();
    perfil.skey = this.userInfo.skey;
    perfil.primerN = this.formInfoPrincipal.value.primerN;
    perfil.segundoN = this.formInfoPrincipal.value.segundoN;
    perfil.primerA = this.formInfoPrincipal.value.primerA;
    perfil.segundoA = this.formInfoPrincipal.value.segundoA;
    this.userInfoService.updateUserPrincipal(perfil);
    this.snackBar.open('Operación exitosa.', 'Se ha actualizado su información principal.' , {
      duration: 2000,
      panelClass: ['blue-snackbar']
    });
  }

  updateInfoAdicional() {
    const perfil = new UserInfo();
    perfil.skey = this.userInfo.skey;
    perfil.tipoDeUso = this.formInfoAdicional.value.tipoDeUso;
    perfil.institucion = this.formInfoAdicional.value.institucion;
    perfil.pais = this.formInfoAdicional.value.pais;
    perfil.departamento = this.formInfoAdicional.value.departamento;
    perfil.ciudad = this.formInfoAdicional.value.ciudad;
    this.userInfoService.updateUserAdicional(perfil);
    this.snackBar.open('Operación exitosa.', 'Se ha actualizado su información adicional.' , {
      duration: 2000,
      panelClass: ['blue-snackbar']
    });
  }

  cambiarContrasena() {

  }
}
