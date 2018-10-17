import {BehaviorSubject, Observable} from "rxjs/index";
import {distinctUntilChanged, pluck} from "rxjs/internal/operators";
import {User} from "./auth/shared/services/auth.service";
import {Meal} from "./health/shared/services/meals.service";

export interface State {
  // definition of type that have key properties as string and value any
  // just like a plain old js object
  user: User;
  meals: Meal[];

  [key: string]: any
}

const initialState: State = {
  user: undefined,
  meals: undefined
};

export class Store {
  // The subject is our internal behavior subject that store the state object.
  // we can retrive the state object from the BehaviorSubject with a call to value property
  // As behavior subject it has an initial value and will transmit last emitted value to new subscribers
  private subject = new BehaviorSubject<State>(initialState);
  private store = this.subject.asObservable().pipe(
    distinctUntilChanged()
  );

  get value() {
    return this.subject.value;
  }

  // Reactive select so we must return an Observable
  // Returning just the value will not be reactive indeed
  select<T>(key: string): Observable<T> {
    return this.store.pipe(
      pluck(key)
    )
  }

  // here we emit the new value by retrieving the previous state inside our behavior subject
  // and we create a new state object (immutability) by reassigning old properties to new object and mixin the new ones
  set(name: string, newStateSlice: any) {
    // spread operator on previous values and use of type script [] notation to dynamically add properties
    // like object[prop] = value in plain old js in syntax, but the real effect is immutable like an object assign
    this.subject.next({...this.value, [name]: newStateSlice})
  }
}
