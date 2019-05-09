import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// --- modules --- //
import { routingModule } from './modules/routing.module';

import { AppComponent } from './app.component';
import { indexComponent } from './components/index/index.component';

// --- public --- //
import { header } from './components/public/header/header';
import { footer } from './components/public/footer/footer';

// --- proyectos de investigación --- //
import { PotabilizacionComponent } from './components/proyectos-investigacion/potabilizacion/potabilizacion.component';
import { AlumbradoComponent } from './components/proyectos-investigacion/alumbrado/alumbrado.component';
import { IntegracionComponent } from './components/proyectos-investigacion/integracion/integracion.component';
import { ReguladoresComponent } from './components/proyectos-investigacion/reguladores/reguladores.component';
import { RefrigeracionComponent } from './components/proyectos-investigacion/refrigeracion/refrigeracion.component';
import { GestionarComponent } from './components/proyectos-investigacion/gestionCarga/gstionar.component';
import { SolarComponent } from './components/proyectos-investigacion/solares/solar.component';
import { AgriculturaComponent, } from './components/proyectos-investigacion/agricultura/agricultura.component';

// --- connocenos --- //
import { ConocenosComponent } from './components/conocenos/conocenos.component';

// --- Firebase --- //
import { AuthService } from './shared/services/auth.service';

// --- services --- //
import { CuentaService } from './services/cuenta.service';
import { ToastService } from './services/elements/toasts.service';
import { TipoDocumentoService } from './services/tipoDocumento.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';


@NgModule({
  declarations: [
    AppComponent,
    indexComponent,
    // --- public --- //
    header,
    footer,
    // --- proyectos de investigación --- //
    PotabilizacionComponent,
    AlumbradoComponent,
    IntegracionComponent,
    ReguladoresComponent,
    RefrigeracionComponent,
    GestionarComponent,
    SolarComponent,
    AgriculturaComponent,
    // --- conocenos --- //
    ConocenosComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
  ],
  imports: [
    BrowserModule,
    routingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  providers: [
    CuentaService,
    ToastService,
    TipoDocumentoService,
    Title,
    AuthService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
