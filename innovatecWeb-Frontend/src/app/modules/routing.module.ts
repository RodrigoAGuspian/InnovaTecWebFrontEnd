import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { indexComponent } from '../components/index/index.component';

// Import all the components for which navigation service has to be activated
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from '../components/verify-email/verify-email.component';

// Import canActivate guard services
import { SecureInnerPagesGuard } from '../shared/guard/secure-inner-pages.guard.ts.guard';
// --- guard --- //
import { AuthGuard } from '../guard/auth.guard';

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




const routes: Routes = [
  { path: '', component: indexComponent },


  // --- proyectos de investigación --- //
  { path: 'proyectos_investigacion/potabilizacion', component: PotabilizacionComponent },
  { path: 'proyectos_investigacion/alumbrado', component: AlumbradoComponent },
  { path: 'proyectos_investigacion/integracion', component: IntegracionComponent },
  { path: 'proyectos_investigacion/reguladores', component: ReguladoresComponent },
  { path: 'proyectos_investigacion/refrigeracion', component: RefrigeracionComponent },
  { path: 'proyectos_investigacion/gestionar', component: GestionarComponent },
  { path: 'proyectos_investigacion/solares', component: SolarComponent },
  { path: 'proyectos_investigacion/agricultura', component: AgriculturaComponent },

  // --- Login and Register --- //
  { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'register-user', component: SignUpComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard] },

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
