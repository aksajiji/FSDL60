import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

// Import the standalone components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },  // Default path to HomeComponent
      { path: 'home', component: HomeComponent } // Route to HomeComponent
    ])
  ],
  bootstrap: [AppComponent]  // Bootstrap AppComponent
})
export class AppModule { }
