import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Workout} from "../../../shared/services/workouts.service";

@Component({
  selector: 'app-workout-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="workout-form">
      <form [formGroup]="form">
        <div class="workout-form__name">
          <label>
            <h3>Workout Name</h3>
            <input
              type="text"
              placeholder="e.g. English Breakfast"
              formControlName="name"
            />
            <div class="error" *ngIf="required">
              Workout name is required
            </div>
          </label>
          <label>
            {{form.value | json}}
            <h3>Type</h3>
            <app-workout-type formControlName="type"></app-workout-type>
          </label>
        </div>

        <div class="workout-form__submit">
          <div>
            <button *ngIf="!exists" type="button" class="button" (click)="createWorkout()">Create Workout</button>
            <button *ngIf="exists" type="button" class="button" (click)="updateWorkout()">Save</button>
            <a class="button button--cancel" [routerLink]="['../']">Cancel</a>
          </div>
          <div class="workout-form__delete" *ngIf="exists">
            <div *ngIf="toggled">
              <p>Delete item ?</p>
              <button class="confirm" type="button" (click)="removeWorkout()">Yes</button>
              <button class="cancel" type="button" (click)="toggle()">No</button>
            </div>

            <button class="button button--delete" type="button" (click)="toggle()">
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./workout-form.component.scss']
})
export class WorkoutFormComponent implements OnInit, OnChanges {

  toggled = false;

  exists = false;

  @Input()
  workout: Workout;

  @Output()
  create = new EventEmitter<Workout>();

  @Output()
  update = new EventEmitter<Workout>();

  @Output()
  remove = new EventEmitter<Workout>();

  form = this.fb.group({
    name: this.fb.control('', Validators.required),
    type: 'strength'
  });

  constructor(private fb: FormBuilder) {
  }

  // Need this because we do not re instantiate the component each time
  // Just the @Input will change... so we need to implement the logic in onChange callback, not in onInit ^^
  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes', changes);
    if (this.workout && this.workout.name) {
      this.exists = true;

      const value = this.workout;
      this.form.patchValue(value);
    }
  }

  get required() {
    const nameControl = this.form.get('name');
    return (
      nameControl.hasError('required')
      && nameControl.touched
    );
  }

  ngOnInit() {
  }

  createWorkout() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  updateWorkout() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeWorkout() {
    this.remove.emit(this.form.value);
  }

  toggle() {
    this.toggled = !this.toggled;
  }


}
