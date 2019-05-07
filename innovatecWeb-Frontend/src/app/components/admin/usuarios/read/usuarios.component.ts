import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// --- services --- //
import { CuentaService } from '../../../../services/cuenta.service';
import { RolService } from '../../../../services/rol.service';

@Component({
  selector: 'app-user-read',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {

  usuariosList: any = [];
  rolesList: any = [];

  rolesBool: boolean = false;
  usuariosBool: boolean = false;

  constructor(
    private cuentaService: CuentaService,
    private rolService: RolService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    if (this.cuentaService.getTokenUsuarioRol() != 'administrador') {
      this.router.navigate(['/'])
    }
  }

  ngOnInit() {

    const params = this.activatedRoute.snapshot.params.usuarios;

    if (params === 'roles') {
      this.getRoles();
      this.rolesBool = true;
    }
    if (params === 'usuarios') {
      this.getUsuarios();
      this.usuariosBool = true;
    }

  }

  getUsuarios() {
    this.cuentaService.getUsers().subscribe(
      res => this.usuariosList = res,
      err => console.log(err)
    )
  }

  getRoles() {
    this.rolService.getRols().subscribe(
      res => this.rolesList = res,
      err => console.log(err)
    )
  }

  deleteUser(id: number) {
    this.cuentaService.deleteUser(id).subscribe(
      res => {
        this.getUsuarios()
      },
      err => console.log(err)
    )
  }

}