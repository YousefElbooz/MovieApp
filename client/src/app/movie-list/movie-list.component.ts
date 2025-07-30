import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../model/movie';
import { MovieCard } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MovieCard],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
  @Input() movies: Movie[] = [];
  @Input() likedMovies: Set<string> = new Set();
  @Input() getImageUrl!: (path: string) => string;
  @Input() onToggleLike!: (movieId: string) => void;
}
