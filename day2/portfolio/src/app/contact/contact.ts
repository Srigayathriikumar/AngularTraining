import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

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

  showSuccessMessage = false;
  isLoading = false;
  errorMessage = '';

  constructor() {
    emailjs.init('Q0zfS6WV1kko8Nzqq');
  }

  sendEmail() {
    this.isLoading = true;
    this.errorMessage = '';
    
    const templateParams = {
      from_name: this.formData.name,
      from_email: this.formData.email,
      subject: this.formData.subject,
      message: this.formData.message
    };
    
    // Send main email to you
    emailjs.send('service_ctwy81g', 'template_rb3jp7b', templateParams)
      .then((response) => {
        console.log('Main email sent successfully:', response);
        
        // Send auto-reply to user
        const replyParams = {
          to_email: this.formData.email,
          to_name: this.formData.name,
          reply_subject: `Re: ${this.formData.subject}`,
          original_message: this.formData.message
        };
        
        console.log('Sending auto-reply to:', this.formData.email);
        return emailjs.send('service_ctwy81g', 'template_auto_reply', replyParams);
      })
      .then((replyResponse) => {
        console.log('Auto-reply sent successfully:', replyResponse);
        this.showSuccessMessage = true;
        this.isLoading = false;
        this.formData = { name: '', email: '', subject: '', message: '' };
        setTimeout(() => this.showSuccessMessage = false, 5000);
      })
      .catch((error) => {
        console.error('Email sending error:', error);
        
        // If auto-reply fails, still show success for main email
        if (error.text && error.text.includes('template_auto_reply')) {
          console.log('Auto-reply template not found, but main email sent');
          this.showSuccessMessage = true;
          this.formData = { name: '', email: '', subject: '', message: '' };
          setTimeout(() => this.showSuccessMessage = false, 5000);
        } else {
          this.errorMessage = 'Failed to send email. Please try again.';
        }
        
        this.isLoading = false;
      });
  }

  clearError() {
    this.errorMessage = '';
  }
}
