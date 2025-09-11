import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = 'http://localhost:9092/api/auth';
    private tokenKey = 'jwt_token';
    
    constructor(private http: HttpClient, private router: Router) { }
    
    login(username: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
            catchError(err => {
                console.error('Login failed');
                throw err;
            })
        );
    }
    
    logout(): void {
        this.removeToken();
        this.router.navigate(['/login']);
    }
    
    isAuthenticated(): boolean {
        return !!this.getToken();
    }
    
    getUsername(): string {
        const token = this.getToken();
        if (token && token.split('.').length === 3) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                return payload.sub || 'User';
            } catch (e) {
                return 'User';
            }
        }
        return 'User';
    }
    
    isAdmin(): boolean {
        const token = this.getToken();
        if (token && token.split('.').length === 3) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                return payload.roles && payload.roles.includes('ADMIN');
            } catch (e) {
                return false;
            }
        }
        return false;
    }
    
    isDeveloper(): boolean {
        const token = this.getToken();
        if (token && token.split('.').length === 3) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                return payload.roles && payload.roles.includes('DEVELOPER');
            } catch (e) {
                return false;
            }
        }
        return false;
    }
    
    storeToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }
    
    getToken(): string | null {
        try {
            return localStorage.getItem(this.tokenKey);
        } catch (e) {
            return null;
        }
    }
    
    removeToken(): void {
        localStorage.removeItem(this.tokenKey);
    }
}

 