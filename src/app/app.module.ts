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
import { StudentsDataComponent } from './dashboard/students-data/students-data.component';
import { AddStudentsComponent } from './dashboard/add-students/add-students.component';
import { SubjectMarksComponent } from './dashboard/subject-marks/subject-marks.component';
import { AddMarksComponent } from './dashboard/add-marks/add-marks.component';
import { HeadieDetailsComponent } from './head_dashboard/headie-details/headie-details.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { AccountModule } from './account_dashboard/account.module';
import { HttpInterceptorModule } from './auth/http-interceptor';
import { AuthModule } from './auth/auth.module';
import { AccountComponent } from './account_dashboard/account/account.component';
import { HeadModule } from './head_dashboard/head.module';
import { TeacherModule } from './dashboard/teacher.module';

@NgModule({
  declarations: [
    AppComponent,
    // RegisterComponent,
    // LoginComponent,
    // TeacherComponent,
    // HeadmasterComponent,
    // TeacherRegistrationComponent,
    // HeadRegistrationComponent,
    // TeacherComponent,

    // ClassDetailsComponent,
    // SubjectDetailsComponent,
    // StudentsDataComponent,
    // AddStudentsComponent,
    // SubjectMarksComponent,
    // AddMarksComponent,
    // HeadmasterComponent,

    // HeadieDetailsComponent,
    // AccountComponent,
    // AccountDetailsComponent,
    // PaymentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: 'user/account', component: AccountComponent,
          loadChildren: () => 
            import ('./account_dashboard/account.module').then(m => m.AccountModule)
      },
      {
        path: 'user/head', component: HeadieDetailsComponent,
          loadChildren: () => 
            import('./head_dashboard/head.module').then(m => m.HeadModule)
      },
      {
        path: 'user/teacher', component: TeacherComponent,
          loadChildren: () => 
            import('./dashboard/teacher.module').then(m => m.TeacherModule)
      }
      
      // { path: 'login', component: LoginComponent},
      // { path: 'user/account', component: AccountComponent, children: [
      //   {
      //     path: 'class', component: AccountDetailsComponent
      //   }
      // ]},
      // { path: 'user/head', component: HeadieDetailsComponent, children: [
      //   {
      //     path: 'class', component: StudentsDataComponent
      //   }
      // ]},
      // { path: 'user/teacher',  component: TeacherComponent, children:[
      //   {
      //     path: 'classDetails', component: ClassDetailsComponent, children: [
      //       {path: 'studentsData', component: StudentsDataComponent},
      //       {path: 'addStudents', component: AddStudentsComponent}
      //     ]
      //   },
      //   {
      //     path: 'subjectDetails/:subject', children: [
      //       {path: '', component: SubjectMarksComponent},
      //       {path: 'add', component: AddMarksComponent},
      //     ]
      //   }
      // ]},
      // { path: 'user/teacher/registration',  component: TeacherRegistrationComponent},
      // { path: 'user/head/registration',  component: HeadRegistrationComponent},
      // { path: 'register', component: RegisterComponent}
    ]),
    BrowserAnimationsModule,
    MaterialModule,
    AccountModule,
    HttpInterceptorModule,
    AuthModule,
    HeadModule,
    TeacherModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
