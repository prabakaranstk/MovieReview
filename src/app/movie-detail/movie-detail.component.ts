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

  constructor(private route:ActivatedRoute, private movieService:MovieService){

  }

  ngOnInit(){
    this.movieId = this.route.snapshot.paramMap.get('id');
    this.selectedMovie = this.movieService.getMovieById(this.movieId);
    console.log("mm--",this.selectedMovie);
  }




}
