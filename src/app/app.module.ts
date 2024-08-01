import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
      BrowserModule,
      FormsModule,
      AppRoutingModule,
      CommonModule
    ],
    providers: [
      provideHttpClient(
        withFetch(),
      ),
    ],
    declarations: [
      AppComponent
    ],
    bootstrap: [ AppComponent ]
  })
export class AppModule { }