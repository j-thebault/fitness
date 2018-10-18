import {Component, OnDestroy, OnInit} from '@angular/core';
import {Workout, MealsService} from "../../../shared/services/meals.service";
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
      <div *ngIf="meal$ | async as meal; else loading;">
        <app-meal-form
          [meal]="meal"
          (create)="addMeal($event)"
          (update)="updateMeal($event)"
          (remove)="removeMeal($event)"
        ></app-meal-form>
      </div>
      <ng-template #loading>
        <div class="message">
          <img src="assets/img/loading.svg"/>
          Fetching Meal...
        </div>
      </ng-template>
    </div>
  `,
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit, OnDestroy {

  meal$: Observable<Workout>;
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

  async addMeal(meal: Workout) {
    await this.mealService.addMeal(meal);
    this.backToMeals();
  }

  private backToMeals() {
    this.router.navigate(['meals']);
  }

  //the meal came from the form... it will not have an id initialized because we have no controls on $id
  async updateMeal(meal: Workout) {
    const key = this.route.snapshot.params.id;
    await this.mealService.updateMeal(key, meal);
    this.router.navigate(['meals']);
  }

  async removeMeal(meal: Workout) {
    const key = this.route.snapshot.params.id;
    await this.mealService.removeMeal(key);
    this.router.navigate(['meals']);
  }
}
