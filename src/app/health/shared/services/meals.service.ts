import {Injectable} from '@angular/core';
import {Store} from "../../../store";
import {AngularFireDatabase} from "@angular/fire/database";
import {AuthService} from "../../../auth/shared/services/auth.service";
import {Observable, of} from "rxjs/index";
import {filter, map, tap} from "rxjs/internal/operators";
import {SnapshotAction} from "@angular/fire/database/interfaces";

export interface Workout {
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
  meals$: Observable<Workout[]> = this.db.list<Workout>(`meals/${this.uid}`).snapshotChanges().pipe(
    tap(x => console.log('Fetched meal from server', x)),
    map((actions: SnapshotAction<Workout>[]) => {
      return actions.map((action: SnapshotAction<Workout>) => {
        return {$key: action.key, ...action.payload.val()}
      })
    }),
    tap(x => console.log('Mapped collection ', x)),
    tap((meals: Workout[]) => this.store.set('meals', meals))
  );

  constructor(private store: Store, private db: AngularFireDatabase, private authService: AuthService) {
  }

  get uid() {
    return this.authService.user.uid;
  }

  addMeal(meal: Workout) {
    return this.db.list(`meals/${this.uid}`).push(meal);
  }

  updateMeal(key: string, meal: Workout) {
    return this.db.object(`meals/${this.uid}/${key}`).update(meal);
  }

  removeMeal(key: string) {
    return this.db.list(`meals/${this.uid}`).remove(key);
  }

  getMeal(key: string): Observable<any> {
    if (!key) {
      return of({})
    }
    return this.store.select<Workout[]>('meals').pipe(
      filter(value => !!value),
      map((meals: Workout[]) => meals.find(meal => meal.$key === key))
    );
  }
}
