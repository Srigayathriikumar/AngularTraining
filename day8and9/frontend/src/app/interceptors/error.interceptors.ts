import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);
  const router = inject(Router);
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('HTTP Error:', error);
      
      let errorMessage = 'An unexpected error occurred';
      let summary = 'Error';
      let severity: 'error' | 'warn' = 'error';
      
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Network Error: ${error.error.message}`;
        summary = 'Connection Error';
      } else {
        // Server-side error
        switch (error.status) {
          case 0:
            errorMessage = 'Unable to connect to server. Please check your internet connection.';
            summary = 'Connection Failed';
            break;
          case 401:
            errorMessage = 'Your session has expired. Please log in again.';
            summary = 'Authentication Required';
            setTimeout(() => router.navigate(['/login']), 2000);
            break;
          case 403:
            errorMessage = 'You do not have permission to perform this action.';
            summary = 'Access Denied';
            severity = 'warn';
            break;
          case 404:
            errorMessage = 'The requested resource was not found.';
            summary = 'Not Found';
            break;
          case 409:
            errorMessage = 'Conflict: The resource already exists or is being used.';
            summary = 'Conflict Error';
            break;
          case 422:
            errorMessage = 'Invalid data provided. Please check your input.';
            summary = 'Validation Error';
            severity = 'warn';
            break;
          case 429:
            errorMessage = 'Too many requests. Please try again later.';
            summary = 'Rate Limited';
            severity = 'warn';
            break;
          case 500:
            errorMessage = 'Internal server error. Please try again later.';
            summary = 'Server Error';
            break;
          case 502:
            errorMessage = 'Bad gateway. The server is temporarily unavailable.';
            summary = 'Service Unavailable';
            break;
          case 503:
            errorMessage = 'Service temporarily unavailable. Please try again later.';
            summary = 'Service Unavailable';
            break;
          default:
            errorMessage = error.error?.message || `HTTP ${error.status}: ${error.statusText}`;
            summary = `Error ${error.status}`;
        }
      }
      
      // Show toast message
      messageService.add({
        severity: severity,
        summary: summary,
        detail: errorMessage,
        life: severity === 'error' ? 5000 : 3000 // Error messages stay longer
      });
      
      return throwError(() => error);
    })
  );
};