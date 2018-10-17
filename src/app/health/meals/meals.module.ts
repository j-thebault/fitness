import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MealsComponent} from './containers/meals/meals.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";

export const ROUTE: Routes = [
  {path: '', component: MealsComponent}
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTE)
  ],
  declarations: [MealsComponent]
})
export class MealsModule {
}
