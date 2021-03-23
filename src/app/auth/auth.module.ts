import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TeacherRegistrationComponent } from '../dashboard/teacher-registration/teacher-registration.component';
import { HeadRegistrationComponent } from '../head_dashboard/head-registration/head-registration.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../shared/material.module';




@NgModule({
  declarations: [
    LoginComponent,
    TeacherRegistrationComponent,
    HeadRegistrationComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([
      { path: 'teacher/registration',  component: TeacherRegistrationComponent},
      { path: 'login', component: LoginComponent},
      { path: 'head/registration',  component: HeadRegistrationComponent},
      { path: 'register', component: RegisterComponent}
    ])
  ]
})
export class AuthModule { }
