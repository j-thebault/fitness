import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "./store";
import {AuthService, User} from "./auth/shared/services/auth.service";
import {Observable, Subscription} from "rxjs/index";

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h1>{{user$ | async | json}}</h1>
      <div class="wrapper">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  user$: Observable<User>;
  private subscription: Subscription;


  constructor(private store: Store, private authService: AuthService) {
  }

  // will never occurs as we are in root component
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // initialize the subscription to fire up the request in service
  // but we subscribe to the STORE. The data always come from the store
  ngOnInit(): void {
    this.subscription = this.authService.auth$.subscribe();
    this.user$ = this.store.select('user');
  }

}
