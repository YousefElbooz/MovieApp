import { Component, Input } from '@angular/core';
import { Movie } from '../model/movie';
import { DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [NgIf, DatePipe],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCard {
  @Input() movie!: Movie;
  @Input() likedMovies!: Set<string>;
  @Input() getImageUrl!: (path: string) => string;
  @Input() onToggleLike!: (movieId: string) => void;

  toggleLike(event: Event) {
    event.stopPropagation();
    this.onToggleLike(this.movie._id!);
  }
}
