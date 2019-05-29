import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Components
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ]
})
export class CoreModule { }
