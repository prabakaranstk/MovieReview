import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MovieService } from './home/movie.service';
import { signal } from '@angular/core';
import { Movie } from './home/movie.model';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of} from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'router-outlet',
  template: ''
})
export class MockRouteComponent {
}

@Component({
  selector: 'app-header',
  template: `<h1>Header</h1>`
})
export class HeaderComponent {}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  class mockMovieService {
    AllMovies = signal<Movie[] | undefined>(undefined);
    getImage(){
      return {};
    }
    getMovieById(){
      return [];
    }
    fetchMovies(){
      return of([])
    }
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, HeaderComponent, MockRouteComponent ],
      imports: [CommonModule],
      providers: [{provide: MovieService, useClass: mockMovieService}],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
     fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the header component', () => {
    const headerElement = fixture.debugElement.query(By.css('app-header'));
    expect(headerElement).toBeTruthy();
  });

  
  
});
