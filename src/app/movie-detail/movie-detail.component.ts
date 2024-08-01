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

  constructor(private route:ActivatedRoute, private movieService:MovieService){

  }

  ngOnInit(){
    this.movieId = this.route.snapshot.paramMap.get('id');
    this.selectedMovie = this.movieService.getMovieById(this.movieId);
  }

  updateSlider(selectedIndex:number, movieId:string){
    this.selectedRating = selectedIndex;
    this.movieService.updateMovieRating(selectedIndex+1,movieId);
  }



}
