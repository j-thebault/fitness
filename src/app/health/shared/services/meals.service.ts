import {Injectable} from '@angular/core';
import {Store} from "../../../store";
import {AngularFireDatabase} from "@angular/fire/database";
import {AuthService} from "../../../auth/shared/services/auth.service";
import {Observable, of} from "rxjs/index";
import {filter, map, tap} from "rxjs/internal/operators";
import {SnapshotAction} from "@angular/fire/database/interfaces";

export interface Meal {
  name: string;
  ingredients: string[];
  timestamp: number;
  $key: string;
  $exists: () => boolean;
}

@Injectable()
export class MealsService {

  // with this wired observable from firebase, we don't have to update our store manualy...
  // the store is just updated each time the remote source of data is updated
  meals$: Observable<Meal[]> = this.db.list<Meal>(`meals/${this.uid}`).snapshotChanges().pipe(
    tap(x => console.log('Fetched meal from server', x)),
    map((actions: SnapshotAction<Meal>[]) => {
      return actions.map((action: SnapshotAction<Meal>) => {
        return {$key: action.key, ...action.payload.val()}
      })
    }),
    tap(x => console.log('Mapped collection ', x)),
    tap((meals: Meal[]) => this.store.set('meals', meals))
  );

  constructor(private store: Store, private db: AngularFireDatabase, private authService: AuthService) {
  }

  get uid() {
    return this.authService.user.uid;
  }

  addMeal(meal: Meal) {
    return this.db.list(`meals/${this.uid}`).push(meal);
  }

  removeMeal(meal: Meal) {
    return this.db.list(`meals/${this.uid}`).remove(meal.$key);
  }

  getMeal(key: string): Observable<any> {
    if (!key) {
      return of({})
    }
    return this.store.select<Meal[]>('meals').pipe(
      filter(value => !!value),
      map((meals: Meal[]) => meals.find(meal => meal.$key === key))
    );
  }
}
