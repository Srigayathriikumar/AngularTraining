import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, map } from "rxjs";
import { AuthService } from './auth.service';

export interface Comment{
    id?: number;
    author: string;
    message: string;
    createdAt?: string;
}

export interface BugStats{
    openVsClosed: { open: number; closed: number };
    bugsByPriority: { HIGH: number; MEDIUM: number; LOW: number };
    bugsByProject: { [projectName: string]: number };
    bugByStatus: { [status: string]: number };
}

export interface Bug {
    id: number | null;
    title: string; 
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    status: string;
    assignee: string;
    project: string;
    comments?:Comment[];
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
                console.log('Handled by global error interceptor');
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

   deleteBug(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/admin/${id}`, { headers: this.getHeaders() }).pipe(
            catchError(err => {
                console.error('Error deleting bug:', err);
                throw err;
            })
        );
    }



    getBugById(id: number): Observable<Bug> {
        return this.http.get<Bug>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
            catchError(err => {
                console.error('Error fetching bug by ID:', err);
                throw err;
            })
        );
    }

    addcomment(bugId: number, comment: Comment): Observable<Comment> {
        return this.http.post<Comment>(`${this.apiUrl}/${bugId}/comments`, comment);
}

getBugStats(): Observable<BugStats> {
    return this.http.get<BugStats>(`${this.apiUrl}/stats`, { headers: this.getHeaders() }).pipe(
        catchError(err => {
            console.error('Error fetching bug stats:', err);
            throw err;
        })
    );
}
} 