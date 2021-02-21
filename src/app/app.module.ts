import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { TeacherComponent } from './dashboard/teacher/teacher.component';
import { HeadmasterComponent } from './headmaster/headmaster.component';
import { TeacherRegistrationComponent } from './dashboard/teacher-registration/teacher-registration.component';
import { HeadRegistrationComponent } from './head_dashboard/head-registration/head-registration.component';
import { ClassDetailsComponent } from './dashboard/class-details/class-details.component';
import { SubjectDetailsComponent } from './dashboard/subject-details/subject-details.component';
import { Subject } from 'rxjs';
import { StudentsDataComponent } from './dashboard/students-data/students-data.component';
import { AddStudentsComponent } from './dashboard/add-students/add-students.component';
import { SubjectMarksComponent } from './dashboard/subject-marks/subject-marks.component';
import { AddMarksComponent } from './dashboard/add-marks/add-marks.component';
import { HeadieDetailsComponent } from './head_dashboard/headie-details/headie-details.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    TeacherComponent,
    HeadmasterComponent,
    TeacherRegistrationComponent,
    HeadRegistrationComponent,
    ClassDetailsComponent,
    SubjectDetailsComponent,
    StudentsDataComponent,
    AddStudentsComponent,
    SubjectMarksComponent,
    AddMarksComponent,
    HeadieDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent},
      { path: 'user/head', component: HeadieDetailsComponent, children: [
        {
          path: 'class', component: StudentsDataComponent
        }
      ]},
      { path: 'user/teacher',  component: TeacherComponent, children:[
        {
          path: 'classDetails', component: ClassDetailsComponent, children: [
            {path: 'studentsData', component: StudentsDataComponent},
            {path: 'addStudents', component: AddStudentsComponent}
          ]
        },
        {
          path: 'subjectDetails/:subject', children: [
            {path: '', component: SubjectMarksComponent},
            {path: 'add', component: AddMarksComponent},
          ]
        }
      ]},
      { path: 'user/teacher/registration',  component: TeacherRegistrationComponent},
      { path: 'user/head/registration',  component: HeadRegistrationComponent},
      // { path: 'classDetails',  component: ClassDetailsComponent},
      { path: 'register', component: RegisterComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
