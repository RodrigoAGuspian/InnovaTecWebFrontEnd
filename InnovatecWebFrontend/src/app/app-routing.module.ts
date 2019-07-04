
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import all the components for which navigation service has to be activated
import { SignInComponent } from '../app/components/sign-in/sign-in.component';
import { SignUpComponent } from '../app/components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from '../app/components/forgot-password/forgot-password.component';
import { SecureInnerPagesGuard } from './shared/guard/secure-inner-pages.guard.ts.guard';
import { AuthGuard } from './shared/guard/auth.guard';
import { IndexComponent } from './components/index/index.component';
import { PanelDeControlComponent } from './components/panel-de-control/panel-de-control.component';

const routes: Routes = [
{ path: '', component: IndexComponent },
{ path: 'iniciar-sesion', component: SignInComponent, canActivate: [SecureInnerPagesGuard] },
{ path: 'registro-de-usuario', component: SignUpComponent, canActivate: [SecureInnerPagesGuard] },
{ path: 'recuperar-clave', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard] },
{ path: 'panel-de-control', component: PanelDeControlComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
