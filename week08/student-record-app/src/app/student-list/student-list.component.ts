import { Component, OnInit } from '@angular/core';
import { StudentService, Student } from '../student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  // Fetch students from the service
  getStudents(): void {
    this.studentService.getStudents().subscribe((students: Student[]) => {
      this.students = students;
    });
  }

  // Delete a student
  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.students = this.students.filter(student => student.id !== id);
    });
  }
}
