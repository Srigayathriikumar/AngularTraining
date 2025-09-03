import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { BugsComponent } from './pages/bugs/bugs';
import { LoginComponent } from './pages/login/login';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { DeveloperGuard } from './guards/developer.guard';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'dashboard',component:DashboardComponent,title:'Dashboard',canActivate:[DeveloperGuard]},
    {path:'bugs',component:BugsComponent,title:'Bugs',canActivate:[AdminGuard]},
    {path:'unauthorized',component:UnauthorizedComponent,title:'Unauthorized'},
    {path:'login',component:LoginComponent,title:'Login'},
    {path:'**',redirectTo:'login'} // fallback route

];
