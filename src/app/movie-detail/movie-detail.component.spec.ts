import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailComponent } from './movie-detail.component';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../home/movie.service';
import { CardComponent } from '../shared/card/card.component';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
  const movieServiceSpy = jasmine.createSpyObj('MovieService', ['getImage'])
  class mockMovieService {

    getImage(){
      return {};
    }
    getMovieById(){
      return [];
    }
  }

  class mockActivatedRoute {

    snapshot = {
      paramMap: {get: function(){}}
    }

  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieDetailComponent, CardComponent],
      providers: [
        {provide: ActivatedRoute, useClass: mockActivatedRoute},
        {provide: MovieService, useClass: mockMovieService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
