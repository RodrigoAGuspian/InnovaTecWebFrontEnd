import { AdminComponent } from './components/admin/admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import all the components for which navigation service has to be activated
import { SignInComponent } from '../app/components/sign-in/sign-in.component';
import { SignUpComponent } from '../app/components/sign-up/sign-up.component';
import { DashboardComponent } from '../app/components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../app/components/forgot-password/forgot-password.component';
import { SecureInnerPagesGuard } from './shared/guard/secure-inner-pages.guard.ts.guard';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
{ path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard] },
{ path: 'register-user', component: SignUpComponent, canActivate: [SecureInnerPagesGuard] },
{ path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard] },
{ path: 'panel-de-control', component: AdminComponent, canActivate: [AuthGuard] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
