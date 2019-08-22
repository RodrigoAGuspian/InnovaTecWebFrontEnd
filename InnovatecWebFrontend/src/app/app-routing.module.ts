import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import all the components for which navigation service has to be activated
import { SignInComponent } from '../app/components/sign-in/sign-in.component';
import { SignUpComponent } from '../app/components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from '../app/components/forgot-password/forgot-password.component';
import { SecureInnerPagesGuard } from './shared/guard/secure-inner-pages.guard.ts.guard';
import { AuthGuard } from './shared/guard/auth.guard';
import { PerfilComponent } from './components/panel-de-control/perfil/perfil.component';
import { CrudNovedadesComponent } from './components/panel-de-control/crud-novedades/crud-novedades.component';
import { InicioPanelDeControlComponent } from './components/panel-de-control/inicio-panel-de-control/inicio-panel-de-control.component';
import { InfoIndexComponent } from './components/info-index/info-index.component';
import { NovedadesComponent } from './components/novedades/novedades.component';
import { CrudProyectosComponent } from './components/panel-de-control/crud-proyectos/crud-proyectos.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { ListaDeProyectosComponent } from './components/lista-de-proyectos/lista-de-proyectos.component';
import { AdministrarRolesComponent } from './components/panel-de-control/administrar-roles/administrar-roles.component';
import { AdminGuard } from './shared/guard/admin.guard';
// tslint:disable-next-line: max-line-length
import { SemilleroDeInvestigacionComponent } from './components/panel-de-control/semillero-de-investigacion/semillero-de-investigacion.component';
import { SemilleroDeInvestigacionPComponent } from './components/semillero-de-investigacion-p/semillero-de-investigacion-p.component';
import { EnsayoCloudMesseComponent } from './components/ensayo-cloud-messe/ensayo-cloud-messe.component';


const routes: Routes = [
  { path: '', component: InfoIndexComponent },
  { path: 'iniciar-sesion', component: SignInComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'registro-de-usuario', component: SignUpComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'recuperar-clave', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'panel-de-control', component: InicioPanelDeControlComponent, canActivate: [AuthGuard] },
  { path: 'panel-de-control/perfil', component: PerfilComponent, canActivate: [AdminGuard] },
  { path: 'panel-de-control/registro-de-novedades', component: CrudNovedadesComponent, canActivate: [AdminGuard] },
  { path: 'panel-de-control/registro-de-proyectos', component: CrudProyectosComponent, canActivate: [AdminGuard] },
  { path: 'novedades/:id', component: NovedadesComponent },
  { path: 'proyectos', component: ListaDeProyectosComponent },
  { path: 'proyectos/:id', component: ProyectosComponent },
  { path: 'panel-de-control/administar-roles', component: AdministrarRolesComponent, canActivate: [AdminGuard]},
  { path: 'panel-de-control/registro-semillero-de-investigacion', component: SemilleroDeInvestigacionComponent, canActivate: [AdminGuard]},
  { path: 'semillero-de-investigacion', component: SemilleroDeInvestigacionPComponent },
  { path: 'ensayo', component: EnsayoCloudMesseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
