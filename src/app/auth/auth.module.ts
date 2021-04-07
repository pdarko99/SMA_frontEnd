import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TeacherRegistrationComponent } from '../dashboard/teacher-registration/teacher-registration.component';
import { HeadRegistrationComponent } from '../head_dashboard/head-registration/head-registration.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../shared/material.module';
import { LogoutComponent } from './logout/logout.component';
import { CredentialsComponent } from './credentials/credentials.component';




@NgModule({
  declarations: [
    LoginComponent,
    TeacherRegistrationComponent,
    HeadRegistrationComponent,
    RegisterComponent,
    LogoutComponent,
    CredentialsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: '', redirectTo: 'login', pathMatch: 'full'
      },
      { path: 'login', component: LoginComponent},
      { path: 'teacher/registration',  component: TeacherRegistrationComponent},
      { path: 'head/registration',  component: HeadRegistrationComponent},
      { path: 'register', component: RegisterComponent},
      { path: 'logout', component: LogoutComponent}

   

    ])
  ]
})
export class AuthModule { }
