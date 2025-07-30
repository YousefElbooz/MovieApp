import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar-component/nav-bar-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
}
