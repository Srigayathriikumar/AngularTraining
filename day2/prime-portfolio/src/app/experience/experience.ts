import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience',
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrl: './experience.css'
})
export class Experience {
  skillCategories = [
    {
      name: 'Frontend',
      skills: [
        { name: 'Javascript', level: 90 },
        { name: 'React', level: 85 },
        { name: 'HTML/CSS', level: 95 }
      ]
    },
    {
      name: 'Backend',
      skills: [
        { name: 'Node.js', level: 80 },
        { name: 'SQL', level: 95 },
        { name: 'Java', level: 70 },
        { name: 'MongoDB', level: 85 }
      ]
    },
    {
      name: 'Tools & Others',
      skills: [
        { name: 'Git', level: 70 },
        { name: 'Docker', level: 70 },
        { name: 'Jira', level: 90 }
      ]
    }
  ];

  experiences = [
    {
      position: 'Engineering Trainee - Software',
      company: 'Eproductivity Software',
      period: '2025 - Present',
      description: 'Working as a software engineering trainee with learning and developing skills on Springboot(JAVA) for backend and Angular for frontend.',
      skills: ['Angular', 'Springboot']
    },
    {
      position: 'Web Developer Intern',
      company: 'ADHOC SOFTWARES (Coimbatore)',
      period: 'Jun 2024',
      description: 'Designed frontend framework for a bookstore website. Collaborated with frontend team to learn best practices and improve web development skills.',
      skills: ['HTML', 'CSS', 'JavaScript', 'Bootstrap']
    },
    {
      position: 'Full Stack Developer Intern',
      company: 'ETHER SERVICES (Coimbatore)',
      period: 'Jul 2024',
      description: 'Built full-stack web applications using React and SpringBoot backend. Implemented RESTful APIs and worked with SQL database.',
      skills: ['React', 'Node.js', 'Springboot', 'SQL']
    }
  ];
}
