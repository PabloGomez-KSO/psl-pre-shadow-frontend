import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//Components
import { AppComponent } from './app.component';

//Modules
import { AdminModule } from './admin/admin.module';
import { CandidateModule } from './candidate/candidate.module';
import { CoreModule } from './core/core.module';
//Routes
import { APP_ROUTES } from './app-routing.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AdminModule,
    CandidateModule,
    CoreModule,
    APP_ROUTES,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
