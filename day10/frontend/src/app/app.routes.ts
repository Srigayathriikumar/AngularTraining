import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { BugsComponent } from './pages/bugs/bugs';
import { LoginComponent } from './pages/login/login';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { DeveloperGuard } from './guards/developer.guard';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { BugDetailComponent } from './bug-detail.component';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'dashboard',component:DashboardComponent,title:'Dashboard',canActivate:[AuthGuard]},
    {path:'bugs',component:BugsComponent,title:'Bugs',canActivate:[AuthGuard]},
    {path:'admin-dashboard',component:AdminDashboardComponent,title:'Admin Dashboard',canActivate:[AdminGuard]},
    {path:'bug/:id',component:BugDetailComponent,title:'Bug Details',canActivate:[AuthGuard]},
    {path:'unauthorized',component:UnauthorizedComponent,title:'Unauthorized'},
    {path:'login',component:LoginComponent,title:'Login'},
    {path:'**',redirectTo:'login'} // fallback route

];
