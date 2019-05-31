import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import all the components for which navigation service has to be activated
import { SignInComponent } from '../app/components/sign-in/sign-in.component';
import { SignUpComponent } from '../app/components/sign-up/sign-up.component';
import { DashboardComponent } from '../app/components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../app/components/forgot-password/forgot-password.component';
import { RealTimeChartComponent } from './charts/pro-solar/real-time-chart/real-time-chart.component';
import { RealTimeEenergiasComponent } from './charts/eenergias/real-time-eenergias/real-time-eenergias.component';
import { QueryForDayProSolarComponent } from './charts/pro-solar/query-for-day-pro-solar/query-for-day-pro-solar.component';
import { QueryForWeekComponent } from './charts/pro-solar/query-for-week/query-for-week.component';
import { QueryForMonthComponent } from './charts/pro-solar/query-for-month/query-for-month.component';
import { QueryForDayEeComponent } from './charts/eenergias/query-for-day-ee/query-for-day-ee.component';
import { QueryForWeekEeComponent } from './charts/eenergias/query-for-week-ee/query-for-week-ee.component';
import { QueryForMonthEeComponent } from './charts/eenergias/query-for-month-ee/query-for-month-ee.component';

const routes: Routes = [
{ path: 'sign-in', component: SignInComponent },
{ path: 'register-user', component: SignUpComponent },
{ path: 'dashboard', component: DashboardComponent },
{ path: 'forgot-password', component: ForgotPasswordComponent },
{ path: 'real-time', component: RealTimeChartComponent },
{ path: 'real-time-eenergias-tarjeta1', component: RealTimeEenergiasComponent },
{ path: 'query-for-day-prosolar', component: QueryForDayProSolarComponent },
{ path: 'query-for-week-prosolar', component: QueryForWeekComponent },
{ path: 'query-for-month-prosolar', component: QueryForMonthComponent },
{ path: 'query-for-day-eenergias', component: QueryForDayEeComponent },
{ path: 'query-for-week-eenergias', component: QueryForWeekEeComponent },
{ path: 'query-for-month-eenergias', component: QueryForMonthEeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
