import { Injectable, signal } from "@angular/core";
import { Observable, of } from 'rxjs';
import { Movie } from "./movie.model";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class MovieService {
  movies = signal<Movie[] | undefined>(undefined);
  AllMovies! :Movie[]| undefined;
  filterdMovies! :Movie[]| undefined;

  constructor(private http: HttpClient) { }

  fetchMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`https://dummyapi.online/api/movies`);
  }

  setMovies(movies:Movie[]) {
   this.AllMovies = movies;
   this.movies.set(movies);
  }

  searchMovies(searchText:string){
    if(searchText){
      this.filterdMovies = this.AllMovies?.filter(item => item.movie.toLowerCase().includes(searchText.toLowerCase()));
      this.movies.set(this.filterdMovies);
    }else{
      this.movies.set(this.AllMovies);
    }
  }

  getMovieById(movieId:string | null){
    return this.AllMovies?.find(item=> item.id == movieId);
  }

  updateMovieRating(selectedIndex:number, movieId:string){
    this.AllMovies?.find(item=> {
      if(item.id == movieId){
        item.rating = String(selectedIndex);
      }
    })
  }

}