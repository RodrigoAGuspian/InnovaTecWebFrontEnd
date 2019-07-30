import { Component, OnInit } from '@angular/core';
import { RolesService } from 'src/app/shared/services/roles.service';
import { UserInfoService } from 'src/app/shared/services/user-info.service';
import { UserInfo } from 'src/app/shared/models/user-info';
import { Rol } from 'src/app/shared/models/rol';
import { UserRol } from 'src/app/shared/models/user-rol';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-administrar-roles',
  templateUrl: './administrar-roles.component.html',
  styleUrls: ['./administrar-roles.component.css']
})

export class AdministrarRolesComponent implements OnInit {
  usersList: UserInfo[];
  superAdministradores: Rol[];
  administradores: Rol[];
  invitados: Rol[];
  public usersRolList: UserRol[];
  displayedColumns: string[] = ['Correo', 'Rol'];
  dataSource = new MatTableDataSource(this.usersRolList);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private rolesService: RolesService, private userInfoService: UserInfoService) { }

  ngOnInit() {
    this.userInfoService.getUsers().snapshotChanges().subscribe(
      item => {
        this.usersList = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          // tslint:disable-next-line: no-string-literal
          x['skey'] = element.key;
          this.usersList.push(x as UserInfo);
        });
      }
    );

    this.rolesService.getSuperAdministradores().snapshotChanges().subscribe(
      item => {
        this.superAdministradores = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          // tslint:disable-next-line: no-string-literal
          x['skey'] = element.key;
          this.superAdministradores.push(x as Rol);
        });

        this.rolesService.getAdministradores().snapshotChanges().subscribe(
          item1 => {
            this.administradores = [];
            item1.forEach(element => {
              const x = element.payload.toJSON();
              // tslint:disable-next-line: no-string-literal
              x['skey'] = element.key;
              this.administradores.push(x as Rol);
            });

            this.rolesService.getInvitados().snapshotChanges().subscribe(
              item2 => {
                this.invitados = [];
                item2.forEach(element => {
                  const x = element.payload.toJSON();
                  // tslint:disable-next-line: no-string-literal
                  x['skey'] = element.key;
                  this.invitados.push(x as Rol);
                })
                ;
                this.getUsersRolList();
              }
            );
          }
        );
      }
    );


  }

  getUsersRolList() {
    this.usersRolList = [];
    this.usersList.forEach(element => {
      const userRol = new UserRol();
      userRol.user = element;
      userRol.tipoDeRol = 'No definido';
      userRol.email = element.email;
      this.usersRolList.push(userRol);
    });

    this.usersRolList.forEach(element => {
      this.superAdministradores.forEach(element1 => {
        if (element.user.email === element1.email ) {
          element.tipoDeRol = 'Super administrador';
          element.skeyRol  = element1.skey;
        }
      });

      this.administradores.forEach(element1 => {
        if (element.user.email === element1.email ) {
          element.tipoDeRol = 'Administrador';
          element.skeyRol  = element1.skey;
        }
      });

      this.invitados.forEach(element1 => {
        if (element.user.email === element1.email ) {
          element.tipoDeRol = 'Invitado';
          element.skeyRol  = element1.skey;
        }
      });
    });

    this.dataSource = new MatTableDataSource(this.usersRolList);
  }


  onEdit(userRol: UserRol) {
    this.rolesService.selectUserRol = Object.assign({}, userRol);
  }

}
