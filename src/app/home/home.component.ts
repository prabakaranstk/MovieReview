import { Component, inject } from '@angular/core';

import { AsyncPipe } from '@angular/common';
import { MovieService } from './movie.service';
import { Router } from '@angular/router';
import { CardComponent } from "../shared/card/card.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private movieService = inject(MovieService);
  private router = inject(Router)
  movies =  this.movieService.filterdMovies;
  getImage = this.movieService.getImage;

  navigateMoviePage(movieId:string){
    this.router.navigate(['movie',{ id: movieId }]);
  }

}
