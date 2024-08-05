import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MovieService } from './home/movie.service';
import { HeaderComponent } from './header/header.component';
import { signal } from '@angular/core';
import { Movie } from './home/movie.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'router-outlet',
  template: ''
})
export class MockRouteComponent {
}

describe('AppComponent', () => {
  const movieServiceSpy = jasmine.createSpyObj('MovieService', ['getImage']);
  class mockMovieService {
    AllMovies = signal<Movie[] | undefined>(undefined);
    getImage(){
      return {};
    }
    getMovieById(){
      return [];
    }
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, HeaderComponent, MockRouteComponent ],
      providers: [{provide: MovieService, useClass: mockMovieService}],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  
});
