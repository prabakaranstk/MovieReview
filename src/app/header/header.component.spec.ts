import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { MovieService } from '../home/movie.service';
import { DebugElement, signal } from '@angular/core';
import { Movie } from '../home/movie.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {By} from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let el: DebugElement;
  let movieService: any;
  let getSelectedMovieSpy: jasmine.Spy;
  let searchMoviesSpy: jasmine.Spy;

  class mockMovieService {
    AllMovies = signal<Movie[] | undefined>([
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
    getSelectedMovie(){
    }
    searchMovies(){
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule],
      providers: [
        {provide: MovieService, useClass: mockMovieService}
      ],
      declarations: [HeaderComponent]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      movieService = TestBed.inject(MovieService);
      getSelectedMovieSpy = spyOn(movieService, 'getSelectedMovie').and.callThrough();
      searchMoviesSpy = spyOn(movieService, 'searchMovies').and.callThrough();
      
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show movie names in the dropdown',() => {
    fixture.detectChanges();
    const cardsText = el.queryAll(By.css(".dropdown-item"));   
    expect(cardsText[1].nativeElement.textContent).toBe("The Shawshank Redemption");
  });

  it('should call getSelected service method while selecting dropdown values',fakeAsync(() => {
    fixture.detectChanges();
    const cardsText = el.queryAll(By.css(".dropdown-item"));   
    cardsText[0].nativeElement.click();
    expect(getSelectedMovieSpy).toHaveBeenCalled();
  }));

  it('should call searchMovies service method while searching',fakeAsync(() => {
    fixture.detectChanges();
    const searchBox= el.query(By.css('input[name="Search"]'));   
    searchBox.nativeElement.value = 'test value';
    searchBox.nativeElement.dispatchEvent(new Event('input'));
    expect(searchMoviesSpy).toHaveBeenCalled();
  }));

});
