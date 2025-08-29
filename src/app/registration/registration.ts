import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule, InputTextModule, DropdownModule, ButtonModule, CardModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css'
})
export class Registration {
  private fb = inject(FormBuilder);
  private studentService = inject(StudentService);
  private router = inject(Router);

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    age: ['', [Validators.required, Validators.min(16), Validators.max(45)]],
    department: ['', Validators.required]
  });

  departments = this.studentService.getDepartments().map(dept => ({ label: dept, value: dept }));

  onSubmit() {
    if (this.form.valid) {
      this.studentService.addStudent(this.form.value);
      this.router.navigate(['/students']);
    }
  }

  getFieldError(field: string): string {
    const control = this.form.get(field);
    if (control?.errors && control.touched) {
      if (control.errors['required']) return `${field} is required`;
      if (control.errors['minlength']) return `${field} must be at least ${control.errors['minlength'].requiredLength} characters`;
      if (control.errors['email']) return 'Invalid email format';
      if (control.errors['min']) return `Age must be at least ${control.errors['min'].min}`;
      if (control.errors['max']) return `Age must be at most ${control.errors['max'].max}`;
    }
    return '';
  }
}
