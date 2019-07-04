import { ChartsRoutingModule } from './components/charts/charts-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SatPopoverModule } from '@ncstate/sat-popover';

// Routing modules
import { AppRoutingModule } from './app-routing.module';

// App Componets
import { AppComponent } from './app.component';

// Firebase Realtime Database.
import { AngularFireDatabaseModule } from '@angular/fire/database';

// Firebase services + enviorment module
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

// Firebase services + enviorment module.
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

import { CommonModule, DatePipe } from '@angular/common';
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
// tslint:disable-next-line: max-line-length
import { ResumenEenergiasTarjeta1Component } from './components/charts/eenergias/resumen-eenergias-tarjeta1/resumen-eenergias-tarjeta1.component';

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


  ],
  providers: [
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
