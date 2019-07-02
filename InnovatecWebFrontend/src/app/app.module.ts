import { ChartsRoutingModule } from './charts/charts-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Routing modules
import { AppRoutingModule } from './app-routing.module';

// App Componets
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// Firebase services + enviorment module
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

// Firebase services + enviorment module
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

import { CommonModule, DatePipe } from '@angular/common';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import {MatButtonModule, MatCheckboxModule, MatInputModule, MatSelectModule, MatNativeDateModule} from '@angular/material';
import {MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';


import {MatCardModule} from '@angular/material/card';
import { LayoutModule } from '@angular/cdk/layout';

import { ChartsModule } from 'ng2-charts';
// Componentes.
import { RealTimeChartComponent } from './charts/pro-solar/real-time-chart/real-time-chart.component';
import { RealTimeEenergiasComponent } from './charts/eenergias/real-time-eenergias/real-time-eenergias.component';
import { QueryForDayProSolarComponent } from './charts/pro-solar/query-for-day-pro-solar/query-for-day-pro-solar.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { QueryForWeekComponent } from './charts/pro-solar/query-for-week/query-for-week.component';
import { QueryForMonthComponent } from './charts/pro-solar/query-for-month/query-for-month.component';
import { MultiDatepickerModule } from './utilities/multidatepicker/multidatepicker.module';
import { QueryForWeekEeComponent } from './charts/eenergias/query-for-week-ee/query-for-week-ee.component';
import { QueryForMonthEeComponent } from './charts/eenergias/query-for-month-ee/query-for-month-ee.component';
import { QueryForDayEeComponent } from './charts/eenergias/query-for-day-ee/query-for-day-ee.component';
import { ResumenEenergiasTarjeta1Component } from './charts/eenergias/resumen-eenergias-tarjeta1/resumen-eenergias-tarjeta1.component';

import { AdminComponent } from './components/admin/admin.component';
import { ResumenProSolarComponent } from './charts/pro-solar/resumen-pro-solar/resumen-pro-solar.component';
import { IndexComponent } from './components/index/index.component';


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
    AdminComponent,
    ResumenEenergiasTarjeta1Component,
    ResumenProSolarComponent,
    IndexComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChartsModule,
    ChartsRoutingModule,
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

  ],
  providers: [
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
