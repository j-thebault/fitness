import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs/index";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs/internal/operators";
import {Workout, WorkoutsService} from "../../../shared/services/workouts.service";

@Component({
  selector: 'app-workout',
  template: `
    <div class="workout">
      <div class="workout__title">
        <h1>
          <img src="assets/img/workout.svg"/>
          <span *ngIf="workout$ | async as workout; else title;">
           {{workout.name ? 'Edit' : 'Create'}} Workout
          </span>
          <ng-template #title>Loading...</ng-template>
        </h1>
      </div>
      <div *ngIf="workout$ | async as workout; else loading;">
        <app-workout-form
          [workout]="workout"
          (create)="addWorkout($event)"
          (update)="updateWorkout($event)"
          (remove)="removeWorkout($event)"
        ></app-workout-form>
      </div>
      <ng-template #loading>
        <div class="message">
          <img src="assets/img/loading.svg"/>
          Fetching Meal...
        </div>
      </ng-template>
    </div>
  `,
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit, OnDestroy {

  workout$: Observable<Workout>;
  subscription: Subscription;

  constructor(private workoutsService: WorkoutsService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.workoutsService.workouts$.subscribe();
    this.workout$ = this.route.params.pipe(
      switchMap(params => {
        return this.workoutsService.getWorkout(params.id);
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async addWorkout(workout: Workout) {
    await this.workoutsService.addWorkout(workout);
    this.backToWorkouts();
  }

  private backToWorkouts() {
    this.router.navigate(['workouts']);
  }

  //the workout came from the form... it will not have an id initialized because we have no controls on $id
  async updateWorkout(workout: Workout) {
    const key = this.route.snapshot.params.id;
    await this.workoutsService.updateWorkout(key, workout);
    this.backToWorkouts();
  }

  async removeWorkout(workout: Workout) {
    const key = this.route.snapshot.params.id;
    await this.workoutsService.removeWorkout(key);
    this.backToWorkouts();
  }



}
