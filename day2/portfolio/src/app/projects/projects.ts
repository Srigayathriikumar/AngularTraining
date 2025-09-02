import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects {
  projects = [
    {
      title: 'AUTOMATIC PREVENTION OF DROWNING BY INFLATABLE WRIST BAND SYSTEM',
      description: 'A system that intends to save a drowning victim by automatic opening of airbag system in the hand. By the detection of the motion and heart rate of the person’s body using different sensors.',
      image: 'Media (1).jpg',
      technologies: ['Aurdino', 'C++', 'Sensors'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Inventory Management System for Ruei Industries pvt ltd',
      description: 'A system to maintain tools and equipment stock details in the company. It invloves managing stock inside the company and delivering products to other authorities .',
      image: 'Media (2).jpg',
      technologies: ['React', 'Nodejs','MongoDB'],
      
    },
    {
      title: 'Jet Set Go - Travel Customization Platform',
      description: 'An idea of developing a travel booking platform designed to plan and reserve travel accomodation. It also facilitates In choosing their travel guide and designing itinerary for exploring.',
      image: 'Media (3).jpg',
      technologies: ['HTML', 'CSS', 'JavaScript','SpringBoot'],
      
    },
    {
      title: 'Book My Slot',
      description: 'A modern, responsive parking system with camera based number plate detection,with slot booking and more enhanced facilities to make the cutomers save time in searching places to book their cars and other vehicles. This system basically connects the nearby parking areas available in certain location and helps the user to book their slot in advance.',
      image: 'Media (4).jpg',
      technologies: ['React', 'Nodejs','MongoDB'],
      liveUrl: 'https://cloud.protopie.io/p/8514a8144ed3a78d20cb5718'
    }
  ];
}
