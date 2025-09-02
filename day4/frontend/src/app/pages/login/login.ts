import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  message = '';
  isLoading = false;

  constructor(private auth: AuthService, private router: Router) {}

  login(usernameInput: HTMLInputElement, passwordInput: HTMLInputElement) {
    if (usernameInput.value && passwordInput.value) {
      this.isLoading = true;
      this.message = 'Logging in...';
      
      this.auth.login(usernameInput.value, passwordInput.value).subscribe({
        next: (response) => {
          this.auth.storeToken(response.token);
          this.isLoading = false;
          this.message = 'Login successful!';
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.message = 'Login failed. Check credentials.';
          this.isLoading = false;
        }
      });
    } else {
      this.message = 'Please enter username and password';
    }
  }
}