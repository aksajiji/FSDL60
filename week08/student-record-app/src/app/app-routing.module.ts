import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentFormComponent } from './student-form/student-form.component';

const routes: Routes = [
  { path: '', component: StudentListComponent },
  { path: 'edit/:id', component: StudentFormComponent },
  { path: 'add', component: StudentFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
