import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  template: `
    <div>
      <app-auth-form (submitted)="registerUser($event)">
        <h1>Register</h1>
        <a routerLink="/auth/login">Already have an account ?</a>
        <button type="submit">
          Create Account
        </button>
        <div class="error" *ngIf="error">
          {{error}}
        </div>
      </app-auth-form>
    </div>
  `
})
export class RegisterComponent implements OnInit {

  error: string;

  constructor(private authService: AuthService, private router : Router) {

  }

  ngOnInit() {
  }

  async registerUser(event: FormGroup) {
    // ES6 destructuring. Will take email and password properties from the event.value object and assign in two new variables.
    const {email, password} = event.value;
    try {
      await this.authService.createUser(email, password);
      this.router.navigate(['/']);
    } catch (e) {
      this.error = e.message;
    }
  }
}
