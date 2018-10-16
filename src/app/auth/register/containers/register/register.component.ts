import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-register',
  template: `
    <div>
      <app-auth-form>
        <h1>Register</h1>
        <a routerLink="/auth/login">Already have an account ?</a>
        <button type="submit">
          Create Account
        </button>
      </app-auth-form>
    </div>
  `
})
export class RegisterComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
