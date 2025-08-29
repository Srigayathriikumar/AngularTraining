import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { throwError } from "rxjs/internal/observable/throwError";
import { catchError } from "rxjs/internal/operators/catchError";

@Injectable({providedIn :'root'})
export class AuthService{
    private apiUrl = "https://localhost:9092/api/Auth";
    constructor(private http: HttpClient){}

    login(username: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
          catchError((err) => {
            console.error("Error during login", err);
            return throwError(() => new Error("Login failed"));
          })
        );
}
}