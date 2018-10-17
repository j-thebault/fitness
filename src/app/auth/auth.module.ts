import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

import {AngularFireModule, FirebaseAppConfig} from "@angular/fire";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {SharedModule} from "./shared/shared.module";

export const firebaseConfig = {
  apiKey: "AIzaSyCo5mxJmMiLsM-dVdDMC3JGaeSC0X7YvDI",
  authDomain: "fitness-81401.firebaseapp.com",
  databaseURL: "https://fitness-81401.firebaseio.com",
  projectId: "fitness-81401",
  storageBucket: "fitness-81401.appspot.com",
  messagingSenderId: "645051855577"
};

export const ROUTES: Routes = [
  {
    path : "auth",
    children : [
      {path : '', pathMatch: 'full', redirectTo: 'login'},
      {path : 'login', loadChildren:'./login/login.module#LoginModule'},
      {path : 'register', loadChildren:'./register/register.module#RegisterModule'}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot()
  ],
  declarations: []
})
export class AuthModule { }
