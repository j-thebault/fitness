import { Component, OnInit } from '@angular/core';
import {Store} from "../../../../store";
import {Meal, MealsService} from "../../../shared/services/meals.service";
import {Observable, Subscription} from "rxjs/index";
import {Workout, WorkoutsService} from "../../../shared/services/workouts.service";

@Component({
  selector: 'app-workouts',
  template: `
    <div class="workouts">
      <div class="workouts__title">
        <h1>
          <img src="assets/img/food.svg"/>
          Your workouts
        </h1>
        <a
          class="btn__add"
          [routerLink]="['../workouts/new']"
        >
          <img src="assets/img/add-white.svg">
          NEW WORKOUT
        </a>
      </div>
      <!--{{ meals$ | async | json}}-->
      <div *ngIf="workouts$ | async as workouts; else loading;">
        <div class="message" *ngIf="!workouts.length">
          <img src="assets/img/face.svg"/>
          No workouts, add a new workout to start
        </div>
        <app-list-item *ngFor="let workout of workouts" [item]="workout" (remove)="removeWorkouts($event)"></app-list-item>
        <ng-template #loading>
          <div class="message">
            <img src="assets/img/loading.svg">
            Fetching Workouts...
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styleUrls: ['./workouts.component.scss']
})
export class WorkoutsComponent implements OnInit {

  workouts$: Observable<Workout[]>;
  subscription: Subscription;

  constructor(private workoutsService: WorkoutsService, private store: Store) {
  }

  ngOnInit() {
    this.subscription = this.workoutsService.workouts$.subscribe();
    this.workouts$ = this.store.select<Workout[]>('workouts');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  removeWorkouts(event: Meal) {
    this.workoutsService.removeWorkout(event.$key);
  }

}
