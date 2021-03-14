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
import { StudentsInfoComponent } from './students-info/students-info.component';
import { StudentsInfoEditComponent } from './students-info-edit/students-info-edit.component';
import { StudentsMarksEditComponent } from './students-marks-edit/students-marks-edit.component';
import { AboutTeacherComponent } from './about-teacher/about-teacher.component';
import { AboutComponent } from './about/about.component';
import { AboutInfoComponent } from './about-info/about-info.component';
import { ClassPerformanceComponent } from './class-performance/class-performance.component';
import { ReportsComponent } from './reports/reports.component';




@NgModule({
  declarations: [
    TeacherComponent,
    StudentsDataComponent,
    ClassDetailsComponent,
    SubjectDetailsComponent,
    SubjectMarksComponent,
    AddMarksComponent,
    AddStudentsComponent,
    StudentsInfoComponent,
    StudentsInfoEditComponent,
    StudentsMarksEditComponent,
    AboutTeacherComponent,
    AboutComponent,
    AboutInfoComponent,
    ClassPerformanceComponent,
    ReportsComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: 'aboutTeacher', component: AboutComponent, children: [
          {
            path: '', redirectTo: 'info', pathMatch: 'full'
          },
          {
            path: 'info', component: AboutInfoComponent
          },
          {
            path: 'class', component: AboutTeacherComponent
          }
        ]
      },
      // { path: 'user/teacher',  component: TeacherComponent, children:[
        {
          path: 'classDetails', component: ClassDetailsComponent, children: [
            {path: 'studentsData', component: StudentsDataComponent},
            {path: 'studentsInfo', component: StudentsInfoComponent},
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
