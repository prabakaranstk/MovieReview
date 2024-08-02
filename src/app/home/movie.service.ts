import { Injectable, signal } from "@angular/core";
import { Observable, of } from 'rxjs';
import { Movie } from "./movie.model";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class MovieService {
  filterdMovies = signal<Movie[] | undefined>(undefined);
  AllMovies = signal<Movie[] | undefined>(undefined);

  constructor(private http: HttpClient) { }

  fetchMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`https://dummyapi.online/api/movies`);
  }

  setMovies(movies:Movie[]) {
   this.AllMovies.set(movies);
   this.filterdMovies.set(movies);
  }

  searchMovies(searchText:string){
    if(searchText){
      const filterdMovies = this.AllMovies()?.filter(item => item.movie.toLowerCase().includes(searchText.toLowerCase()));
      this.filterdMovies.set(filterdMovies);
    }else{
      this.filterdMovies.set(this.AllMovies());
    }
  }

  getMovieById(movieId:string | null){
    return this.AllMovies()?.find(item=> item.id == movieId);
  }

  updateMovieRating(selectedIndex:number, movieId:string){
    this.AllMovies()?.find(item=> {
      if(item.id == movieId){
        item.rating = String(selectedIndex);
      }
    })
  }

  getSelectedMovie(movieId:string | null){
    if(movieId){
      const selectedMovie = this.AllMovies()?.find(item=> item.id == movieId);
      if(selectedMovie){
        this.filterdMovies.set([selectedMovie]);
      }
    } else {
      this.filterdMovies.set(this.AllMovies());
    }
  }

  getImage(id:string){
    const numbers = ["images/lotr_return_king.jpg","images/shawshank.jpg", "images/godfather.jpg", "images/dark_knight.jpg"];
    return numbers[Number(id)%4];
  }

}