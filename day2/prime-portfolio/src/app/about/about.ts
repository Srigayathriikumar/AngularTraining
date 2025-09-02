import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
  personalInfo = {
    name: 'Srigayathri K',
    location: 'Coimbatore, Tamil Nadu, India',
    email: 'ksrigayathri2005@gmail.com',
    phone: '+91 90251 18409'
  };

  personalInfoArray = [
    { label: 'Location', value: 'Coimbatore, Tamil Nadu, India' },
    { label: 'Email', value: 'ksrigayathri2005@gmail.com' },
    { label: 'Phone', value: '+91 90251 18409' },
    { label: 'Languages Known', value: 'Tamil, English, Hindi' }
  ];

  education = [
    {
      degree: 'SSLC',
      institution: 'Little Angels Matriculation Higher Secondary School',
      year: '2019-2020',
      gpa: '95%'
    },
    {
      degree: 'HSC',
      institution: 'KV Matriculation Higher Secondary School',
      year: '2020-2022',
      gpa: '92.1%'
    },
    {
      degree: 'Computer Science And Engineering (B.E)',
      institution: 'Sri Ramakrishna Engineering College',
      year: '2022-2026',
      gpa: 'CGPA: 8.78/10.0'
    }
  ];

  bio = 'I am a passionate software developer with a strong foundation in modern web technologies. My journey in programming started during my college years, and I have since developed expertise in various programming languages and frameworks. I enjoy solving complex problems and creating user-friendly applications that make a difference.';
}
