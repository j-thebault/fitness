import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  template: `
    <div>
      <app-auth-form (submitted)="loginUser($event)">
        <h1>Login</h1>
        <a routerLink="/auth/register">Not registered ?</a>
        <button type="submit">
          Login
        </button>
        <div class="error" *ngIf="error">
          {{error}}
        </div>
      </app-auth-form>
    </div>
  `
})
export class LoginComponent implements OnInit {
  error: string;

  constructor(private authService: AuthService, private router : Router) {
  }

  ngOnInit() {
  }

  async loginUser(event: FormGroup) {
    console.log(event.value);
    const {email, password} = event.value;
    try {
      await this.authService.loginUser(email, password);
      this.router.navigate(['/']);
    } catch (e) {
      this.error = e.message;
    }
  }
}
