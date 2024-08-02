import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../home/movie.service';
import { Movie } from '../home/movie.model';
import { CardComponent } from '../shared/card/card.component';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CardComponent],
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
    this.movieId = this.route.snapshot.paramMap.get('id');
    this.selectedMovie = this.movieService.getMovieById(this.movieId);
  }

  updateSlider(selectedIndex:number, movieId:string){
    this.selectedRating = selectedIndex;
    this.movieService.updateMovieRating(selectedIndex+1,movieId);
  }

  

}
