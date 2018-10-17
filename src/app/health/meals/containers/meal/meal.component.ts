import {Component, OnInit} from '@angular/core';
import {Meal, MealsService} from "../../../shared/services/meals.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-meal',
  template: `
    <div class="meal">
      <div class="meal__title">
        <h1>
          <img src="assets/img/food.svg"/>
          <span>Create Meal</span>
        </h1>
      </div>
      <app-meal-form (create)="addMeal($event)"></app-meal-form>
    </div>
  `,
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {

  constructor(private mealService: MealsService, private router: Router) {
  }

  ngOnInit() {
  }

  async addMeal(meal: Meal) {
    await this.mealService.addMeal(meal);
    this.backToMeals();
  }

  private backToMeals() {
    this.router.navigate(['meals']);
  }
}
