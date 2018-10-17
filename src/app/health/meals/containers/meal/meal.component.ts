import {Component, OnDestroy, OnInit} from '@angular/core';
import {Meal, MealsService} from "../../../shared/services/meals.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs/index";
import {switchMap} from "rxjs/internal/operators";

@Component({
  selector: 'app-meal',
  template: `
    <div class="meal">
      <div class="meal__title">
        <h1>
          <img src="assets/img/food.svg"/>
          <span *ngIf="meal$ | async as meal; else title;">
           {{meal.name ? 'Edit' : 'Create'}} Meal
          </span>
          <ng-template #title>Loading...</ng-template>
        </h1>
      </div>
      <app-meal-form (create)="addMeal($event)"></app-meal-form>
    </div>
  `,
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit, OnDestroy {

  meal$: Observable<Meal>;
  subscription: Subscription;

  constructor(private mealService: MealsService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.mealService.meals$.subscribe();
    this.meal$ = this.route.params.pipe(
      switchMap(params => {
        return this.mealService.getMeal(params.id);
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async addMeal(meal: Meal) {
    await this.mealService.addMeal(meal);
    this.backToMeals();
  }

  private backToMeals() {
    this.router.navigate(['meals']);
  }
}
