import { Component } from '@angular/core';
import { MovieService } from './home/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 

  constructor(private movieService: MovieService) {
    
  }

  ngOnInit(): void {
    this.movieService.fetchMovies().subscribe(movies => {
      this.movieService.setMovies(movies);
    });
  }

}
