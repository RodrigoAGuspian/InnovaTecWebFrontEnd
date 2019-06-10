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

const routes = [
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
