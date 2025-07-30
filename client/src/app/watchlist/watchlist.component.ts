import { Component, OnInit } from '@angular/core';
import { WatchlistService } from '../services/watchlist.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css'],
  imports:[CommonModule]
})
export class WatchlistComponent implements OnInit {
  watchlist: any[] = [];

  constructor(private watchlistService: WatchlistService) {}

  ngOnInit(): void {
    this.watchlistService.getWatchlist().subscribe({
      next: (data) => (this.watchlist = data),
      error: (err) => console.error(err)
    });
  }
  removeFromWatchlist(movieId: string) {
  this.watchlistService.toggle(movieId).subscribe(() => {
    this.watchlist = this.watchlist.filter(m => m._id !== movieId);
  });
}
}
