import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MealsComponent} from './containers/meals/meals.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import { MealComponent } from './containers/meal/meal.component';

export const ROUTE: Routes = [
  {path: '', component: MealsComponent},
  {path: 'new', component: MealComponent}
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTE),
    SharedModule
  ],
  declarations: [MealsComponent, MealComponent]
})
export class MealsModule {
}
