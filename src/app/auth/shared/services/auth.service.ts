import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {tap} from "rxjs/internal/operators";
import {Store} from "../../../store";

export interface User {
  email: string;
  uid: string;
  authenticated: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth$ = this.af.authState.pipe(
    tap((fbUser) => {
      if(!fbUser){
        this.store.set('user', null)
      } else {
        const user: User = {
          email : fbUser.email,
          uid : fbUser.uid,
          authenticated: true
        };
        this.store.set('user', user);
      }
    })
  );

  constructor(private af : AngularFireAuth, private store : Store) {

  }

  createUser(email: string, password: string){
    return this.af.auth.createUserWithEmailAndPassword(email,password);
  }

  loginUser(email: string, password: string){
    return this.af.auth.signInWithEmailAndPassword(email,password);
  }
}
