import { Routes } from '@angular/router';
import { Registration } from './registration/registration';
import { List } from './list/list';

export const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'register', component: Registration },
  { path: 'students', component: List }
];
