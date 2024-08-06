import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { DebugElement, signal } from '@angular/core';

import { MovieService } from './movie.service';
import { Movie } from './movie.model';
import {By} from '@angular/platform-browser';
import { CardComponent } from '../shared/card/card.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let el: DebugElement;
  let movieService: any;
  class mockMovieService {
    filterdMovies = signal<Movie[] | undefined>([
      {
          "id": "1",
          "movie": "The Shawshank Redemption",
          "rating": "9.2",
          "image": "images/shawshank.jpg",
          "imdb_url": "https://www.imdb.com/title/tt0111161/"
      },
      {
          "id": "2",
          "movie": "The Godfather",
          "rating": "9.2",
          "image": "images/godfather.jpg",
          "imdb_url": "https://www.imdb.com/title/tt0068646/"
      }]);
    getImage(){
      return {};
    }
    getMovieById(){
      return [];
    }
  }

  beforeEach(async () => {
     await TestBed.configureTestingModule({
      declarations: [CardComponent],
      providers: [
        {provide: MovieService, useClass: mockMovieService}
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      movieService = TestBed.inject(MovieService);
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show cards text and title on home page if data exist',() => {
    fixture.detectChanges();
    const cardsText = el.queryAll(By.css(".card-text"));   
    const cardsTitle = el.queryAll(By.css(".card-title"));
    expect(cardsText[0].nativeElement.textContent).toBe("IMDB Rating: 9.2");
    expect(cardsTitle[0].nativeElement.textContent).toBe("The Shawshank Redemption");
  });

  it('should show cards text and title on home page if data exist',() => {
    fixture.detectChanges();
    const cardsText = el.queryAll(By.css(".card-text"));   
    const cardsTitle = el.queryAll(By.css(".card-title"));
    expect(cardsText[0].nativeElement.textContent).toBe("IMDB Rating: 9.2");
    expect(cardsTitle[0].nativeElement.textContent).toBe("The Shawshank Redemption");
  });

  it('should not show cards text and title on home page if data does not exist and show no alert',() => {
    component.movies.set([]);
    fixture.detectChanges();
    const cardsText = el.queryAll(By.css(".card-text"));   
    const cardsTitle = el.queryAll(By.css(".card-title"));
    const alertText = el.queryAll(By.css(".alert"));
    expect(alertText[0].nativeElement.textContent).toBe(" No movie found ");
    expect(cardsText.length).toBe(0);
    expect(cardsTitle.length).toBe(0);
  });
});
