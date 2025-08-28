import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };
  
  rememberMe = false;
  isLoading = false;
  showDemo = true;

  constructor(private router: Router) {}

  onLogin() {
    this.isLoading = true;
    
    // Simulate API call
    setTimeout(() => {
      if (this.loginData.email === 'demo@bugdash.com' && this.loginData.password === 'demo123') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', this.loginData.email);
        this.router.navigate(['/dashboard']);
      } else {
        alert('Invalid credentials! Use demo@bugdash.com / demo123');
      }
      this.isLoading = false;
    }, 1500);
  }

  fillDemoCredentials() {
    this.loginData.email = 'demo@bugdash.com';
    this.loginData.password = 'demo123';
  }
}
