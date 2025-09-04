import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, map } from "rxjs";
import { AuthService } from './auth.service';

export interface Bug {
    id: number | null;
    title: string; 
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    status: string;
    assignee: string;
    project: string;
}

@Injectable({ providedIn: 'root' })
export class BugService {
    private apiUrl = 'http://localhost:9092/api/bugs';
    
    constructor(private http: HttpClient, private authService: AuthService) { }
    
    private getHeaders(): HttpHeaders {
        const token = this.authService.getToken();
        return new HttpHeaders({
            'Authorization': token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json'
        });
    }
    
    getBugs(): Observable<Bug[]> {
        return this.http.get<any>(`${this.apiUrl}`, { headers: this.getHeaders() }).pipe(
            map(response => {
                console.log('API Response:', response);
                return response.content || response || [];
            }),
            catchError(err => {
                console.error('Error fetching bugs:', err);
                throw err;
            })
        );
    }

    createBug(bug: Bug): Observable<Bug> {
        return this.http.post<Bug>(`${this.apiUrl}/admin`, bug, { headers: this.getHeaders() }).pipe(
            catchError(err => {
                console.error('Error creating bug:', err);
                throw err;
            })
        );
    }
    
    updateBug(id: number, bug: Bug): Observable<Bug> {
        return this.http.put<Bug>(`${this.apiUrl}/developer/${id}`, bug, { headers: this.getHeaders() }).pipe(
            catchError(err => {
                console.error('Error updating bug:', err);
                throw err;
            })
        );
    }

}
 