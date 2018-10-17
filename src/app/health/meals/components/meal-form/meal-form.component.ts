import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
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
            <button type="button" class="button" (click)="createMeal()">Create Meal</button>
            <a class="button button--cancel" [routerLink]="['../']">Cancel</a>
          </div>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./meal-form.component.scss']
})
export class MealFormComponent implements OnInit {

  @Output()
  create = new EventEmitter<Meal>();

  form = this.fb.group({
    name: this.fb.control('', Validators.required),
    ingredients: this.fb.array([''])
  });

  constructor(private fb: FormBuilder) {
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

  createMeal() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  addIngredient() {
    this.ingredients.push(new FormControl(''))
  }

  removeIngredient(i: number) {
    this.ingredients.removeAt(i);
  }
}
