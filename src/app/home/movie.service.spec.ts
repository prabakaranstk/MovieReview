import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { MovieService } from "./movie.service";
import { TestBed } from "@angular/core/testing";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

describe('MovieService', () => {

  let movieService: MovieService,
      httpTestingController: HttpTestingController;
  const mockResponse = [
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
    }];

  beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [],
        providers: [
            MovieService,
            provideHttpClient(withInterceptorsFromDi()),
            provideHttpClientTesting()
        ]
      });
      movieService = TestBed.inject(MovieService),
      httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should initialize with undefined', () => {
    expect(movieService.AllMovies()).toBeUndefined();
    expect(movieService.filterdMovies()).toBeUndefined();
  });

  it('should retrieve data from the API via GET', () => {
    movieService.fetchMovies().subscribe(data => {
      expect(data).toEqual(mockResponse);
    });
    const req = httpTestingController.expectOne(movieService['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);  
  });

  it('should set movies correctly', () => {  
    movieService.setMovies(mockResponse);
    expect(movieService.AllMovies()).toEqual(mockResponse);
    expect(movieService.filterdMovies()).toEqual(mockResponse);
  });

  it('should search movie name', () => {  
    movieService.AllMovies.set(mockResponse);
    movieService.searchMovies("God");
    expect(movieService.filterdMovies()).toEqual([{
      "id": "2",
      "movie": "The Godfather",
      "rating": "9.2",
      "image": "images/godfather.jpg",
      "imdb_url": "https://www.imdb.com/title/tt0068646/"
    }]); 
  });

  it('should update movie rating', () => {  
    movieService.AllMovies.set([{
      "id": "2",
      "movie": "The Godfather",
      "rating": "9.2",
      "image": "images/godfather.jpg",
      "imdb_url": ""
    }]);
    movieService.updateMovieRating(4,"2");
    expect(movieService.AllMovies()).toEqual([{
      "id": "2",
      "movie": "The Godfather",
      "rating": "4",
      "image": "images/godfather.jpg",
      "imdb_url": ""
    }]);
  });

});  