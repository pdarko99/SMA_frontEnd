import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TeacherComponent } from './teacher/teacher.component';
import { ClassDetailsComponent } from './class-details/class-details.component';
import { StudentsDataComponent } from './students-data/students-data.component';
import { SubjectMarksComponent } from './subject-marks/subject-marks.component';
import { AddMarksComponent } from './add-marks/add-marks.component';
import { SubjectDetailsComponent } from './subject-details/subject-details.component';
import { AddStudentsComponent } from './add-students/add-students.component';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    TeacherComponent,
    StudentsDataComponent,
    ClassDetailsComponent,
    SubjectDetailsComponent,
    SubjectMarksComponent,
    AddMarksComponent,
    AddStudentsComponent
  ],
  imports: [
    RouterModule.forChild([
      // { path: 'user/teacher',  component: TeacherComponent, children:[
        {
          path: 'classDetails', component: ClassDetailsComponent, children: [
            {path: 'studentsData', component: StudentsDataComponent},
            // {path: 'addStudents', component: StudentsDataComponent}
          ]
        },
        {
          path: 'subjectDetails/:subject', children: [
            {path: '', component: SubjectMarksComponent},
            // {path: 'add', component: AddMarksComponent},
          ]
        }
      // ]},
    ]),
    SharedModule
    
  ]
})
export class TeacherModule { }
