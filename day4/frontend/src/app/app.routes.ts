import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { BugsComponent } from './pages/bugs/bugs';
import { LoginComponent } from './pages/login/login';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'dashboard',component:DashboardComponent,title:'Dashboard',canActivate:[AuthGuard]},
    {path:'bugs',component:BugsComponent,title:'Bugs',canActivate:[AuthGuard]},
    {path:'login',component:LoginComponent,title:'Login'},
    {path:'**',redirectTo:'login'} // fallback route

];
