import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meal',
  template: `
   <div class="meals">
     create meal component
   </div>
  `,
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
