import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterLink,RouterLinkActive,DrawerModule,ButtonModule,MenubarModule,CardModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class AppComponent {
  protected readonly title = signal('BUG DASH');
  sidebarVisible=false;
  appName="Bug Dash";

  menuItems = [
    {label:'Dashboard',icon:'pi pi-home',routerLink:'/dashboard'},
    {label:'Bugs',icon:'pi pi-exclamation-triangle',routerLink:'/bugs'},
    {label:'login',icon:'pi pi-sign-in',routerLink:'/login'}
  ];
}
