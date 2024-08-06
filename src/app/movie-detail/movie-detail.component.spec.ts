import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { MovieDetailComponent } from './movie-detail.component';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../home/movie.service';
import { CardComponent } from '../shared/card/card.component';
import { DebugElement} from '@angular/core';
import { By } from '@angular/platform-browser';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
  let el: DebugElement;
  let movieService: any;
  let getMovieByIdSpy: jasmine.Spy;
  let updateMovieRatingSpy: jasmine.Spy;


  class mockMovieService {
    getImage(){
      return {};
    }
    updateMovieRating(){

    }
    getMovieById(){
      return {
        "id": "1",
        "movie": "The Shawshank Redemption",
        "rating": "9.2",
        "image": "images/shawshank.jpg",
        "imdb_url": "https://www.imdb.com/title/tt0111161/"
    };
    }
  }

  class mockActivatedRoute {
  snapshot = {
      paramMap: {get: function(){}}
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardComponent],
      providers: [
        {provide: ActivatedRoute, useClass: mockActivatedRoute},
        {provide: MovieService, useClass: mockMovieService}
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(MovieDetailComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      movieService = TestBed.inject(MovieService);
      getMovieByIdSpy = spyOn(movieService, 'getMovieById').and.callThrough();
      updateMovieRatingSpy = spyOn(movieService, 'updateMovieRating').and.callThrough();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get selected Movie while ng init', () => {
    fixture.detectChanges();
    expect(getMovieByIdSpy).toHaveBeenCalled(); 
  });

  it('should show selected Movie details', fakeAsync(() => {
    fixture.detectChanges();
    const cardsText = el.queryAll(By.css(".card-text"));   
    const cardsTitle = el.queryAll(By.css(".card-title"));
    expect(cardsText[1].nativeElement.textContent).toBe("IMDB Rating: 9.2/10");
    expect(cardsTitle[0].nativeElement.textContent).toBe("The Shawshank Redemption");
  }));

  it('should call updateMovieRating service method while choosing rating', () => {
    fixture.detectChanges();
    const ratingIcon= el.query(By.css('span[id="empty-star-4"]'));  
    ratingIcon.nativeElement.click();
    expect(updateMovieRatingSpy).toHaveBeenCalledWith(5,'1'); 
  });
});
