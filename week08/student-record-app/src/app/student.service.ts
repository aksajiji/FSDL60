import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define a Student interface
export interface Student {
  id: number;
  name: string;
  age: number;
  course: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:3000/students'; // API URL

  constructor(private http: HttpClient) { }

  // Get all students
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  // Add a new student
  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  // Update an existing student
  updateStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${student.id}`, student);
  }

  // Delete a student
  deleteStudent(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
