import { AuthGuard } from './../../shared/guard/auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RealTimeChartComponent } from './pro-solar/real-time-chart/real-time-chart.component';
import { RealTimeEenergiasComponent } from './eenergias/real-time-eenergias/real-time-eenergias.component';
import { QueryForDayProSolarComponent } from './pro-solar/query-for-day-pro-solar/query-for-day-pro-solar.component';
import { QueryForWeekComponent } from './pro-solar/query-for-week/query-for-week.component';
import { QueryForMonthComponent } from './pro-solar/query-for-month/query-for-month.component';
import { QueryForDayEeComponent } from './eenergias/query-for-day-ee/query-for-day-ee.component';
import { QueryForWeekEeComponent } from './eenergias/query-for-week-ee/query-for-week-ee.component';
import { QueryForMonthEeComponent } from './eenergias/query-for-month-ee/query-for-month-ee.component';
import { ResumenProSolarComponent } from './pro-solar/resumen-pro-solar/resumen-pro-solar.component';
import { ResumenEenergiasTarjeta1Component } from './eenergias/resumen-eenergias-tarjeta1/resumen-eenergias-tarjeta1.component';

const routes = [
  { path: 'panel-de-control/pro-solar-tiempo-real', component: RealTimeChartComponent, canActivate: [AuthGuard] },
  { path: 'panel-de-control/prosolar-consultar-por-dia', component: QueryForDayProSolarComponent, canActivate: [AuthGuard] },
  { path: 'panel-de-control/prosolar-consultar-por-semana', component: QueryForWeekComponent, canActivate: [AuthGuard] },
  { path: 'panel-de-control/prosolar-consultar-por-mes', component: QueryForMonthComponent, canActivate: [AuthGuard] },
  { path: 'panel-de-control/prosolar-resumen', component: ResumenProSolarComponent, canActivate: [AuthGuard] },
  { path: 'panel-de-control/eenergias-tarjeta1-tiempo-real', component: RealTimeEenergiasComponent, canActivate: [AuthGuard] },
  { path: 'panel-de-control/eenergias-consultar-por-dia', component: QueryForDayEeComponent, canActivate: [AuthGuard] },
  { path: 'panel-de-control/eenergias-consultar-por-semana', component: QueryForWeekEeComponent, canActivate: [AuthGuard] },
  { path: 'panel-de-control/eenergias-consultar-por-mes', component: QueryForMonthEeComponent, canActivate: [AuthGuard] },
  { path: 'panel-de-control/eenergias-resumen', component: ResumenEenergiasTarjeta1Component, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: true }
    )
  ],
  exports: [
    RouterModule
  ],
})
export class ChartsRoutingModule { }
