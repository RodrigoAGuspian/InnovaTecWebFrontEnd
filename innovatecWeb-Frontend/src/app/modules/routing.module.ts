import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { indexComponent } from '../components/index/index.component';

// --- --- admin --- --- //
// --- usuarios --- //
import { UsuariosComponent } from '../components/admin/usuarios/read/usuarios.component';

// --- roles --- //
import { RolFormComponent } from '../components/admin/roles/forms/rol.component';

// --- auth --- //
import { logIn } from '../components/auth/logIn/logIn';
import { signUp } from '../components/auth/signUp/signUp';

// --- proyectos de investigación --- //
import { PotabilizacionComponent } from '../components/proyectos-investigacion/potabilizacion/potabilizacion.component';
import { AlumbradoComponent } from '../components/proyectos-investigacion/alumbrado/alumbrado.component';
import { IntegracionComponent } from '../components/proyectos-investigacion/integracion/integracion.component';
import { ReguladoresComponent } from '../components/proyectos-investigacion/reguladores/reguladores.component';
import { RefrigeracionComponent } from '../components/proyectos-investigacion/refrigeracion/refrigeracion.component';
import { GestionarComponent } from '../components/proyectos-investigacion/gestionCarga/gstionar.component';
import { SolarComponent } from '../components/proyectos-investigacion/solares/solar.component';
import { AgriculturaComponent } from '../components/proyectos-investigacion/agricultura/agricultura.component';

// --- conocenos --- //
import { ConocenosComponent } from '../components/conocenos/conocenos.component';

// --- guard --- //
import { AuthGuard } from '../guard/auth.guard';

const routes: Routes = [
  { path: '', component: indexComponent },

  // --- --- admin --- --- //
  // --- usuarios --- //
  { path: 'admin', component: UsuariosComponent, canActivate: [AuthGuard] },
  { path: 'admin/:usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
  { path: 'admin/usuarios/create', component: signUp, canActivate: [AuthGuard] },
  { path: 'admin/usuario/update/:id', component: signUp, canActivate: [AuthGuard] },
  // --- rols --- //
  { path: 'admin/:roles', component: UsuariosComponent },
  { path: 'admin/rol/create', component: RolFormComponent },

  // --- auth --- //
  { path: 'logIn', component: logIn },
  { path: 'signUp', component: signUp },
  { path: 'update/:id', component: signUp, canActivate: [AuthGuard] },

  // --- proyectos de investigación --- //
  { path: 'proyectos_investigacion/potabilizacion', component: PotabilizacionComponent },
  { path: 'proyectos_investigacion/alumbrado', component: AlumbradoComponent },
  { path: 'proyectos_investigacion/integracion', component: IntegracionComponent },
  { path: 'proyectos_investigacion/reguladores', component: ReguladoresComponent },
  { path: 'proyectos_investigacion/refrigeracion', component: RefrigeracionComponent },
  { path: 'proyectos_investigacion/gestionar', component: GestionarComponent },
  { path: 'proyectos_investigacion/solares', component: SolarComponent },
  { path: 'proyectos_investigacion/agricultura', component: AgriculturaComponent },

  // --- contáctanos --- //
  { path: 'conocenos', component: ConocenosComponent },

  // --- page not found --- //
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class routingModule { }