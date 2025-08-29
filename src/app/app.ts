import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenubarModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  items: MenuItem[] = [
    { label: 'Register', routerLink: '/register' },
    { label: 'Students', routerLink: '/students' }
  ];
}
