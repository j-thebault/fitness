import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <div class="wrapper">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
}
