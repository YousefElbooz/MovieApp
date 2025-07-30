import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl:'./signup.component.css',
  standalone: true, // ✅ Must be standalone
  imports: [FormsModule,CommonModule] // ✅ Add FormsModule here
})
export class SignupComponent {
  username = '';
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  signup() {
    this.auth.signup({ username: this.username, email: this.email, password: this.password })
      .subscribe({
        next: (res: any) => {
          this.auth.saveToken(res.token);
          this.router.navigate(['/']);
        },
        error: (err) => console.log(err)
      });
  }
}
