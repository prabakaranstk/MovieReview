import { Component, EventEmitter, Output, inject } from '@angular/core';

import { AsyncPipe } from '@angular/common';
import { MovieService } from './movie.service';
import { Router } from '@angular/router';
import { CardComponent } from "../shared/card/card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private movieService = inject(MovieService);
  private router = inject(Router)
  movies =  this.movieService.filterdMovies.asReadonly();

  navigateMoviePage(movieId:string){
    this.router.navigate(['movie',{ id: movieId }]);
  }

  getImage(){
    const numbers = ["images/shawshank.jpg", "images/godfather.jpg", "images/dark_knight.jpg", "images/pulp_fiction.jpg"];
    const randomIndex = Math.floor(Math.random() * numbers.length);
    return numbers[randomIndex];
  }

}
