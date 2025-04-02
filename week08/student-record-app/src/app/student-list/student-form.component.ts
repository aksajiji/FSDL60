import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService, Student } from '../student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  student: Student = { id: 0, name: '', age: 0, course: '' };

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const studentId = this.route.snapshot.paramMap.get('id');
    if (studentId) {
      this.getStudentById(+studentId);
    }
  }

  // Fetch student details for editing
  getStudentById(id: number): void {
    this.studentService.getStudents().subscribe(students => {
      const foundStudent = students.find(student => student.id === id);
      if (foundStudent) {
        this.student = foundStudent;
      }
    });
  }

  // Handle form submission for adding or updating student
  onSubmit(): void {
    if (this.student.id === 0) {
      this.studentService.addStudent(this.student).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.studentService.updateStudent(this.student).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
