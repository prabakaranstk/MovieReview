import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { CardComponent } from './shared/card/card.component';

@NgModule({
    imports: [
      BrowserModule,
      FormsModule,
      AppRoutingModule,
      CommonModule,
      CardComponent
    ],
    providers: [
      provideHttpClient(
        withFetch(),
      ),
    ],
    declarations: [
      AppComponent,
      HeaderComponent
    ],
    bootstrap: [ AppComponent ]
  })
export class AppModule { }