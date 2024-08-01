import { Component, EventEmitter, Output, inject } from '@angular/core';

import { AsyncPipe } from '@angular/common';
import { Movie } from './movie.model';
import { MovieService } from './movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  //movies!: Movie[];
  private movieService = inject(MovieService);
  movies =  this.movieService.movies.asReadonly();

  constructor(private router: Router){

  }
 
  ngOnInit(){
    
  }
  
  navigateMoviePage(movieId:string){
    this.router.navigate(['movie',{ id: movieId }]);
  }

  getImage(){
    const numbers = ["images/shawshank.jpg", "images/godfather.jpg", "images/dark_knight.jpg", "images/pulp_fiction.jpg"];
    const randomIndex = Math.floor(Math.random() * numbers.length);
    return numbers[randomIndex];
  }

}
