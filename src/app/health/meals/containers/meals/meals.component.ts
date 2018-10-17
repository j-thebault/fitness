import {Component, OnDestroy, OnInit} from '@angular/core';
import {Meal, MealsService} from "../../../shared/services/meals.service";
import {Observable, Subscription} from "rxjs/index";
import {Store} from "../../../../store";

@Component({
  selector: 'app-meals',
  template: `
    <div class="meals">
      <div class="meals__title">
        <h1>
          <img src="assets/img/food.svg"/>
          Your meals
        </h1>
        <a
          class="btn__add"
          [routerLink]="['../meals/new']"
        >
          <img src="assets/img/add-white.svg">
          NEW MEAL
        </a>
      </div>
      <!--{{ meals$ | async | json}}-->
      <div *ngIf="meals$ | async as meals; else loading;">
        <div class="message" *ngIf="!meals.length">
          <img src="assets/img/face.svg"/>
          No meals, add a new meal to start
        </div>
        <ng-template #loading>
          <div class="message">
            <img src="assets/img/loading.svg">
            Fetching meals...
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent implements OnInit, OnDestroy {

  meals$: Observable<Meal[]>;
  subscription: Subscription;

  constructor(private mealsService: MealsService, private store: Store) {
  }

  ngOnInit() {
    this.subscription = this.mealsService.meals$.subscribe();
    this.meals$ = this.store.select<Meal[]>('meals');
  }

  ngOnDestroy(): void {
  }
}
