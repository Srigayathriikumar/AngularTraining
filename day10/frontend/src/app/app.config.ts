import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './interceptors/jwt.interceptor';
import { errorInterceptor } from './interceptors/error.interceptors';
import { MessageService, ConfirmationService } from 'primeng/api';
// import { providePrimeNG } from 'primeng/config';
// import nora from '@primeng/themes/nora';
 
import { routes } from './app.routes';
 
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNoopAnimations(),
    provideHttpClient(withInterceptors([jwtInterceptor, errorInterceptor])),
    MessageService,
    ConfirmationService
    // providePrimeNG({
    //   theme: {
    //     preset: nora
    //   }
    // })
  ]
};