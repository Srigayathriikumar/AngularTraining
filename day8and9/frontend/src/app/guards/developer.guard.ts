import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DeveloperGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isAuthenticated() && (this.auth.isAdmin() || this.auth.isDeveloper())) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}