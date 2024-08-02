import { Component, effect, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from './home/movie.model';
import { MovieService } from './home/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 

  constructor(private movieService: MovieService,  private router: Router) {
    
  }

  ngOnInit(): void {
    this.movieService.fetchMovies().subscribe(movies => {
      this.movieService.setMovies(movies);
    });
  }

}
