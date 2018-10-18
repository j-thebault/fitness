import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Meal} from "../../services/meals.service";

@Component({
  selector: 'app-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="list-item">
      <a [routerLink]="getRoute(item)">
        <p class="list-item__name">{{item.name}}</p>
        <p class="list-item__ingredients">
          <span>
            {{item.ingredients}}
          </span>
        </p>
      </a>
      <div class="list-item__delete" *ngIf="toggled">
        <p>Delete item ?</p>
        <button class="confirm" type="button" (click)="removeItem()">Yes</button>
        <button class="cancel" type="button" (click)="toggle()">No</button>
      </div>

      <button class="trash" type="button" (click)="toggle()">
        <img src="/assets/img/remove.svg"/>
      </button>

    </div>
  `,
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @Input()
  item: any;

  @Output()
  remove = new EventEmitter<any>();

  toggled = false;

  constructor() {
  }

  ngOnInit() {
  }

  getRoute(meal: any) {
    return [`../meals`, this.item.$key]
  }

  removeItem() {
    this.remove.emit(this.item);
  }

  toggle() {
    this.toggled = !this.toggled
  }
}
