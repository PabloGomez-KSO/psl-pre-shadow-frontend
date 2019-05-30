import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";

//Components
import { LoginComponent } from './login/login.component';

//Modules.
import { AdminModule } from '../admin/admin.module';

//Enviroment.
import {  environment } from '../../environments/environment';


import {AuthGuard} from './guards/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    AuthGuard
  ],
  exports: [
    LoginComponent
  ]
})
export class CoreModule { }
