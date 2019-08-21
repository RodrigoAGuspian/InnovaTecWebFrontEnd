import { ChartsRoutingModule } from './components/charts/charts-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SatPopoverModule } from '@ncstate/sat-popover';

// Routing modules
import { AppRoutingModule } from './app-routing.module';

// App Componets
import { AppComponent } from './app.component';

// Firebase services + enviorment module
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireMessagingModule } from '@angular/fire/messaging';

import { environment } from '../environments/environment';

// Firebase services + enviorment module.
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

// Módulos de angular material.
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatSelectModule, MatNativeDateModule} from '@angular/material';
import {MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';

// Módulos para la utilizacion de graficas.
import { LayoutModule } from '@angular/cdk/layout';
import { ChartsModule } from 'ng2-charts';

// Componentes.
import { RealTimeChartComponent } from './components/charts/pro-solar/real-time-chart/real-time-chart.component';
import { RealTimeEenergiasComponent } from './components/charts/eenergias/real-time-eenergias/real-time-eenergias.component';
import { QueryForDayProSolarComponent } from './components/charts/pro-solar/query-for-day-pro-solar/query-for-day-pro-solar.component';
import { QueryForWeekComponent } from './components/charts/pro-solar/query-for-week/query-for-week.component';
import { QueryForMonthComponent } from './components/charts/pro-solar/query-for-month/query-for-month.component';
import { QueryForWeekEeComponent } from './components/charts/eenergias/query-for-week-ee/query-for-week-ee.component';
import { QueryForMonthEeComponent } from './components/charts/eenergias/query-for-month-ee/query-for-month-ee.component';
import { QueryForDayEeComponent } from './components/charts/eenergias/query-for-day-ee/query-for-day-ee.component';
import { PanelDeControlComponent } from './components/panel-de-control/panel-de-control.component';
import { ResumenProSolarComponent } from './components/charts/pro-solar/resumen-pro-solar/resumen-pro-solar.component';
import { IndexComponent } from './components/index/index.component';
import { InicioPanelDeControlComponent } from './components/panel-de-control/inicio-panel-de-control/inicio-panel-de-control.component';
import { MultiDatepickerModule } from './utilities/multidatepicker/multidatepicker.module';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatRippleModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatStepperModule} from '@angular/material/stepper';

// Módulos para el carrusel
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { LightboxModule } from 'ngx-lightbox';

// tslint:disable-next-line: max-line-length
import { ResumenEenergiasTarjeta1Component } from './components/charts/eenergias/resumen-eenergias-tarjeta1/resumen-eenergias-tarjeta1.component';
import { CrudNovedadesComponent } from './components/panel-de-control/crud-novedades/crud-novedades.component';
import { ListNovedadesComponent } from './components/panel-de-control/crud-novedades/list-novedades/list-novedades.component';
import { NovedadComponent } from './components/panel-de-control/crud-novedades/novedad/novedad.component';
import { NovedadesComponent } from './components/novedades/novedades.component';
import { InfoIndexComponent } from './components/info-index/info-index.component';
import { CrudProyectosComponent } from './components/panel-de-control/crud-proyectos/crud-proyectos.component';
import { ProyectoComponent } from './components/panel-de-control/crud-proyectos/proyecto/proyecto.component';
import { ListProyectosComponent } from './components/panel-de-control/crud-proyectos/list-proyectos/list-proyectos.component';
import { ListResultadosComponent } from './components/panel-de-control/crud-proyectos/resultados/list-resultados/list-resultados.component';
import { ResultadoComponent } from './components/panel-de-control/crud-proyectos/resultados/resultado/resultado.component';
import { ListGraficasComponent } from './components/panel-de-control/crud-proyectos/graficas/list-graficas/list-graficas.component';
import { GraficaComponent } from './components/panel-de-control/crud-proyectos/graficas/grafica/grafica.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { ListaDeProyectosComponent } from './components/lista-de-proyectos/lista-de-proyectos.component';
import { AdministrarRolesComponent } from './components/panel-de-control/administrar-roles/administrar-roles.component';
import { EnsayoCloudMesseComponent } from './components/ensayo-cloud-messe/ensayo-cloud-messe.component';
// tslint:disable-next-line: max-line-length
import { SemilleroDeInvestigacionComponent } from './components/panel-de-control/semillero-de-investigacion/semillero-de-investigacion.component';
import { ProyectosPeqComponent } from './components/panel-de-control/semillero-de-investigacion/proyectos-peq/proyectos-peq.component';
// tslint:disable-next-line: max-line-length
import { ProyectoPeqComponent } from './components/panel-de-control/semillero-de-investigacion/proyectos-peq/proyecto-peq/proyecto-peq.component';
// tslint:disable-next-line: max-line-length
import { ListProyectosPeqComponent } from './components/panel-de-control/semillero-de-investigacion/proyectos-peq/list-proyectos-peq/list-proyectos-peq.component';
// tslint:disable-next-line: max-line-length
import { ObjetivosComponent } from './components/panel-de-control/semillero-de-investigacion/objetivos/objetivos.component';
// tslint:disable-next-line: max-line-length
import { ListObjetivosComponent } from './components/panel-de-control/semillero-de-investigacion/objetivos/list-objetivos/list-objetivos.component';
// tslint:disable-next-line: max-line-length
import { ObjetivoComponent } from './components/panel-de-control/semillero-de-investigacion/objetivos/objetivo/objetivo.component';
// tslint:disable-next-line: max-line-length
import { LineasInvestigacionComponent } from './components/panel-de-control/semillero-de-investigacion/lineas-investigacion/lineas-investigacion.component';
// tslint:disable-next-line: max-line-length
import { ListLineaInvestigacionComponent } from './components/panel-de-control/semillero-de-investigacion/lineas-investigacion/list-linea-investigacion/list-linea-investigacion.component';
// tslint:disable-next-line: max-line-length
import { LineaInvestigacionComponent } from './components/panel-de-control/semillero-de-investigacion/lineas-investigacion/linea-investigacion/linea-investigacion.component';
import { SemilleroDeInvestigacionPComponent } from './components/semillero-de-investigacion-p/semillero-de-investigacion-p.component';
import { DialogForImgsComponent } from './components/dialogs/dialog-for-imgs/dialog-for-imgs.component';
import { FooterComponent } from './components/footer/footer.component';
import { DialogForgotPasswordComponent } from './components/dialogs/dialog-forgot-password/dialog-forgot-password.component';


const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    RealTimeChartComponent,
    RealTimeEenergiasComponent,
    QueryForDayProSolarComponent,
    QueryForWeekComponent,
    QueryForMonthComponent,
    QueryForWeekEeComponent,
    QueryForMonthEeComponent,
    QueryForDayEeComponent,
    PanelDeControlComponent,
    ResumenEenergiasTarjeta1Component,
    ResumenProSolarComponent,
    IndexComponent,
    InicioPanelDeControlComponent,
    CrudNovedadesComponent,
    ListNovedadesComponent,
    NovedadComponent,
    NovedadesComponent,
    InfoIndexComponent,
    CrudProyectosComponent,
    ProyectoComponent,
    ListProyectosComponent,
    ListResultadosComponent,
    ResultadoComponent,
    ListGraficasComponent,
    GraficaComponent,
    ProyectosComponent,
    ListaDeProyectosComponent,
    AdministrarRolesComponent,
    EnsayoCloudMesseComponent,
    SemilleroDeInvestigacionComponent,
    ProyectosPeqComponent,
    ProyectoPeqComponent,
    ListProyectosPeqComponent,
    ObjetivosComponent,
    ListObjetivosComponent,
    ObjetivoComponent,
    LineasInvestigacionComponent,
    ListLineaInvestigacionComponent,
    LineaInvestigacionComponent,
    SemilleroDeInvestigacionPComponent,
    DialogForImgsComponent,
    FooterComponent,
    DialogForgotPasswordComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChartsModule,
    ChartsRoutingModule,
    SatPopoverModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireMessagingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ToastrModule.forRoot(),
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MultiDatepickerModule,
    MatMenuModule,
    MaterialFileInputModule,
    MatTabsModule,
    MatTableModule,
    MatRippleModule,
    SwiperModule,
    MatDialogModule,
    MatStepperModule,
    LightboxModule,
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogForImgsComponent, DialogForgotPasswordComponent],
})
export class AppModule { }
