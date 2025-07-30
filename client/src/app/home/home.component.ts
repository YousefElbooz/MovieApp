import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Movie } from '../model/movie';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { WatchlistService } from '../services/watchlist.service';
import { NavBarComponent } from '../nav-bar-component/nav-bar-component';
import { SearchComponent } from '../search-component/search-component';
import { MovieCard } from "../movie-card/movie-card.component";
import { MovieListComponent } from '../movie-list/movie-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ NgFor, MovieListComponent,SearchComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  likedMovies: Set<string> = new Set();

  currentPage = 1;
  totalPages = 1;
  limit = 8;
  skip = 0;
pageWindowStart = 1;
pageWindowSize = 6; // how many page buttons to show

  constructor(
    private movieService: MovieService,
    private authService: AuthService,
    private router: Router,
    private watchlistService: WatchlistService
  ) {}

  ngOnInit(): void {
    this.loadMovies();
  }
loadMovies(): void {
  this.movieService.getAllMovies(this.limit, this.skip).subscribe({
    next: (res) => {
      this.movies = res.data;
      this.filteredMovies = res.data;

      const total = res.total || res.data.length;
      this.totalPages = Math.ceil(total / this.limit);

      // Watchlist check if logged in
      if (this.authService.isLoggedIn()) {
        this.watchlistService.getWatchlist().subscribe({
          next: (list) => {
            this.likedMovies = new Set(list.map((m) => m._id));
          },
          error: (err) => console.error('Watchlist load error:', err),
        });
      }
    },
    error: (err) => console.error('Movies load error:', err),
  });
}


  onSearch(searchText: string) {
    this.filteredMovies = this.movies.filter(movie =>
      movie.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  onLike(movieId: number) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/watchlist']);
    }
  }

  getImageUrl(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

  onToggleLike(movieId: string) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.watchlistService.toggle(movieId).subscribe({
      next: () => {
        if (this.likedMovies.has(movieId)) {
          this.likedMovies.delete(movieId);
        } else {
          this.likedMovies.add(movieId);
        }
        this.router.navigate(['/watchlist']);
      },
      error: (err) => console.error('Toggle like failed:', err)
    });
  }


nextPages() {
  if (this.pageWindowStart + this.pageWindowSize <= this.totalPages) {
    this.pageWindowStart += this.pageWindowSize;
  }
}

prevPages() {
  if (this.pageWindowStart > 1) {
    this.pageWindowStart -= this.pageWindowSize;
  }
}


goToPage(page: number) {
  this.currentPage = page;
  this.skip = (page - 1) * this.limit;
  this.loadMovies();

  if (page >= this.pageWindowStart + this.pageWindowSize) {
    this.pageWindowStart = page;
  }
}


getPageNumbers(): number[] {
  const pages = [];
  const end = Math.min(this.pageWindowStart + this.pageWindowSize - 1, this.totalPages);

  for (let i = this.pageWindowStart; i <= end; i++) {
    pages.push(i);
  }

  return pages;
}


}
