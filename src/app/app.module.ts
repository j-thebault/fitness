import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AuthModule} from "./auth/auth.module";
import {RouterModule, Routes} from "@angular/router";
import {Store} from "./store";
import {HeaderComponent} from './components/header/header.component';
import {NavComponent} from './components/nav/nav.component';
import {HealthModule} from "./health/health.module";

export const ROUTES: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'schedule'}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    HealthModule,
    RouterModule.forRoot(ROUTES)
  ],
  // here i declare that app module will provide a store object in root injector
  // all injectors derived from the root injector will be provided with the same instance of the Store class
  // this is just a singleton
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule {
}
