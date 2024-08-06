import { Component, inject } from '@angular/core';
import { MovieService } from './movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private movieService = inject(MovieService);
  private router = inject(Router)
  // getting movies data once App component retrieved from API call 
  movies =  this.movieService.filterdMovies;
  getImage = this.movieService.getImage;

  navigateMoviePage(movieId:string){
    this.router.navigate(['movie',{ id: movieId }]);
  }

}
