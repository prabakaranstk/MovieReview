import { Component, inject } from '@angular/core';
import { MovieService } from '../home/movie.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  searchText!:string;
  selectedId!:string;
  title = 'MovieReview';
  
  private movieService = inject(MovieService);
  //getting all movies details to show it movie names dropdown
  allMovies =  this.movieService.AllMovies.asReadonly();
  
  onChangeSearchText(){
    this.movieService.searchMovies(this.searchText);
  }

  onChooseMovieName(selectedId:string){
    this.selectedId = selectedId;
    this.movieService.getSelectedMovie(selectedId);
  }
  
}
