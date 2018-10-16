import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-auth-form',
  template: `
    <div class="auth-form">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <ng-content select="h1"></ng-content>
        
        <label>
          <input type="text" placeholder="Email Address" formControlName="email"/>
        </label>
        <label>
          <input type="password" placeholder="Enter Password" formControlName="password"/>
        </label>
        
        <ng-content select=".error"></ng-content>

        <div class="auth-form__action">
          <ng-content select="button"></ng-content>
        </div>

        <div class="auth-form__toggle">
          <ng-content select="a"></ng-content>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {

  form = this.fb.group({
    email : ['', Validators.email],
    password : ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
  }

  onSubmit() {

  }

}
