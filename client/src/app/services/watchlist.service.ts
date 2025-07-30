import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WatchlistService {
  private API = 'http://localhost:3000/api/users/watchlist';

  constructor(private http: HttpClient) {}

  toggle(movieId: string) {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.API}/${movieId}`, {}, { headers });
  }

  getWatchlist() {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(this.API, { headers });
  }

  private getAuthHeaders() {
    return {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };
  }
}
