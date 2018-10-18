import {ChangeDetectionStrategy, Component, OnInit, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

export const TYPE_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => WorkoutTypeComponent),
  multi: true
};

@Component({
  selector: 'app-workout-type',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TYPE_CONTROL_ACCESSOR],
  template: `
    <div class="workout-type">
      <div class="workout-type__pane"
           *ngFor="let selector of selectors"
           [class.active]="value === selector"
           (click)="setSelected(selector)"
      >
        <img src="assets/img/{{selector}}.svg" />
        <p>{{ selector }}</p>
      </div>
    </div>
  `,
  styleUrls: ['./workout-type.component.scss']
})
export class WorkoutTypeComponent implements OnInit, ControlValueAccessor {

  selectors = ['strength', 'endurance'];
  value: string;

  private onTouch : Function;
  private onModelChange : Function;

  constructor() {
  }

  ngOnInit() {
  }

  //allow us to tell angular that value has been changed
  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  //allow us to tell angular that component has been touched
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  //allow us to disable our composant if required by the form API
  setDisabledState(isDisabled: boolean): void {
  }

  //allow us to provide a value when calling set methods of Form API
  writeValue(value: string): void {
    this.value = value;
  }


  setSelected(value: string) {
    this.value = value;
    this.onModelChange(value);
    this.onTouch();
  }
}
