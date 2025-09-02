import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  // Edit these properties to customize your intro
  name = 'Srigayathri Kumar';
  title = 'Software Developer';
  intro = 'Aspiring software engineer with a strong foundation in computer science and hands-on experience in software development through academic projects. Eager to contribute innovative solutions and grow in a dynamic environment.';

  constructor(private router: Router) {}

  downloadResume() {
    const link = document.createElement('a');
    link.href = 'srigayathri_resume.pdf';
    link.download = 'srigayathri_resume.pdf';
    link.click();
  }

  viewProjects() {
    this.router.navigate(['/projects']);
  }
}
