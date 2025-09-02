import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  contactInfo = {
    email: 'ksrigayathri2005@gmail.com',
    phone: '+91 90251 18409',
    linkedin: 'https://www.linkedin.com/in/srigayathrikumar',
    github: 'https://github.com/Srigayathriikumar',
    location: 'Coimbatore, Tamil Nadu, India'
  };

  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  sendEmail() {
    // Create mailto link with form data
    const subject = encodeURIComponent(this.formData.subject);
    const body = encodeURIComponent(
      `Name: ${this.formData.name}\n` +
      `Email: ${this.formData.email}\n\n` +
      `Message:\n${this.formData.message}`
    );
    
    const mailtoLink = `mailto:ksrigayathri2005@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    
    // Reset form
    this.formData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}
