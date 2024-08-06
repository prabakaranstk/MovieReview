import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../home/movie.service';
import { Movie } from '../home/movie.model';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent {
  movieId?:string | null;
  selectedMovie?:Movie | undefined;
  sliderMax?:number = 10;
  selectedRating!:number;
  getImage!:Function;

  constructor(private route:ActivatedRoute, private movieService:MovieService){
    this.getImage = this.movieService.getImage;
  }

  ngOnInit(){
    // extracting movie id from route
    this.movieId = this.route.snapshot.paramMap.get('id');
    this.selectedMovie = this.movieService.getMovieById(this.movieId);
  }

  updateRating(selectedIndex:number, movieId:string){
    this.selectedRating = selectedIndex;
    this.movieService.updateMovieRating(selectedIndex+1,movieId);
  }
}
