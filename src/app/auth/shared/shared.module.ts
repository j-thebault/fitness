import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import {AuthService} from "./services/auth.service";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [AuthFormComponent],
  providers: [AuthService],
  exports: [AuthFormComponent]
})
export class SharedModule {
  // Will init the Shared Module so code is not bundled several times.
  // The provider section will ensure that AuthService is a singleton after .forRoot() have been called.
  // Another solution would be to import in root app module but it will defect the lazy loading goal.
  static forRoot() : ModuleWithProviders{
    return {
      ngModule : SharedModule,
      providers : [AuthService]
    }
  }
}
