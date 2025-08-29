import { Injectable, signal } from '@angular/core';

export interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
  department: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students = signal<Student[]>([]);
  private nextId = 1;

  getStudents() {
    return this.students.asReadonly();
  }

  addStudent(student: Omit<Student, 'id'>) {
    const newStudent = { ...student, id: this.nextId++ };
    this.students.update(students => [...students, newStudent]);
  }

  updateStudent(id: number, student: Omit<Student, 'id'>) {
    this.students.update(students => 
      students.map(s => s.id === id ? { ...student, id } : s)
    );
  }

  getDepartments() {
    return ['Computer Science', 'Engineering', 'Business', 'Arts', 'Science'];
  }
}