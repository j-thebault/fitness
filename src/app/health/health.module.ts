import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

export const ROUTES: Routes = [
  {path: 'meals', loadChildren: './meals/meals.module#MealsModule'},
  {path: 'workouts', loadChildren: './workouts/workouts.module#WorkoutsModule'},
  {path: 'schedule', loadChildren: './schedule/schedule.module#ScheduleModule'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: []
})
export class HealthModule {
}
