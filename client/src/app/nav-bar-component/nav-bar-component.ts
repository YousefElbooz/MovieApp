import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar-component',
  imports: [RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './nav-bar-component.html',
  styleUrl: './nav-bar-component.css'
})
export class NavBarComponent {
  constructor(public authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }
}
