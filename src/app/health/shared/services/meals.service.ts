import {Injectable} from '@angular/core';
import {Store} from "../../../store";
import {AngularFireDatabase} from "@angular/fire/database";
import {AuthService} from "../../../auth/shared/services/auth.service";
import {Observable} from "rxjs/index";
import {tap} from "rxjs/internal/operators";

export interface Meal {
  name: string;
  ingredients: string[];
  timestamp: number;
  key: string;
  $exists: () => boolean;
}

@Injectable()
export class MealsService {

  meals$: Observable<Meal[]> = this.db.list<Meal>(`meals/${this.uid}`).valueChanges().pipe(
    tap(x => console.log(x)),
    tap((meals: Meal[]) => this.store.set('meals', meals))
  );

  constructor(private store: Store, private db: AngularFireDatabase, private authService: AuthService) {
  }

  get uid(){
    return this.authService.user.uid;
  }
}
