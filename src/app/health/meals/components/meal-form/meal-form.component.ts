import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {FormArray, FormBuilder, FormControl, Validators} from "@angular/forms";
import {Meal} from "../../../shared/services/meals.service";

@Component({
  selector: 'app-meal-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="meal-form">
      <form [formGroup]="form">
        <div class="meal-form__name">
          <label>
            <h3>Meal Name</h3>
            <input
              type="text"
              placeholder="e.g. English Breakfast"
              formControlName="name"
            />
            <div class="error" *ngIf="required">
              Meal name is required
            </div>
          </label>
        </div>

        <div class="meal-form__food">
          <div class="meal-form__subtitle">
            <h3>Food</h3>
            <button type="button" class="meal-form__add" (click)="addIngredient()">
              <img src="assets/img/add-white.svg"/>
              Add Food
            </button>
          </div>
          <div formArrayName="ingredients">
            <label *ngFor="let control of ingredients.controls; index as i;">
              <input
                [formControlName]="i"
                placeholder="e.g. Eggs"
              />
              <span class="meal-form__remove" (click)="removeIngredient(i)"></span>
            </label>
          </div>
        </div>

        <div class="meal-form__submit">
          <div>
            <button *ngIf="!exists" type="button" class="button" (click)="createMeal()">Create Meal</button>
            <button *ngIf="exists" type="button" class="button" (click)="updateMeal()">Save</button>
            <a class="button button--cancel" [routerLink]="['../']">Cancel</a>
          </div>
          <div class="meal-form__delete" *ngIf="exists">
            <div *ngIf="toggled">
              <p>Delete item ?</p>
              <button class="confirm" type="button" (click)="removeMeal()">Yes</button>
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
  styleUrls: ['./meal-form.component.scss']
})
export class MealFormComponent implements OnInit, OnChanges {

  toggled = false;

  exists = false;

  @Input()
  meal: Meal;

  @Output()
  create = new EventEmitter<Meal>();

  @Output()
  update = new EventEmitter<Meal>();

  @Output()
  remove = new EventEmitter<Meal>();

  form = this.fb.group({
    name: this.fb.control('', Validators.required),
    ingredients: this.fb.array([''])
  });

  constructor(private fb: FormBuilder) {
  }

  // Need this because we do not re instantiate the component each time
  // Just the @Input will change... so we need to implement the logic in onChange callback, not in onInit ^^
  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes', changes);
    if (this.meal && this.meal.name) {
      this.exists = true;
      this.emptyIngredients();

      const value = this.meal;
      this.form.patchValue(value);
      if (value.ingredients) {
        for (const item of value.ingredients) {
          this.ingredients.push(new FormControl(item));
        }
      }
    }
  }

  get ingredients() {
    return this.form.get('ingredients') as FormArray
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

  emptyIngredients() {
    //angular quirk with FormArray... we need to use removeAt at the head of array to empty the array of controls
    while (this.ingredients.controls.length) {
      this.ingredients.removeAt(0);
    }
  }

  createMeal() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  updateMeal() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeMeal() {
    this.remove.emit(this.form.value);
  }

  addIngredient() {
    this.ingredients.push(new FormControl(''))
  }

  removeIngredient(i: number) {
    this.ingredients.removeAt(i);
  }

  toggle() {
    this.toggled = !this.toggled;
  }


}
