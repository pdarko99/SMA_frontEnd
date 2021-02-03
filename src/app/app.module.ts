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

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    TeacherComponent,
    HeadmasterComponent,
    TeacherRegistrationComponent,
    HeadRegistrationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent},
      { path: 'user/teacher',  component: TeacherComponent},
      { path: 'user/teacher/registration',  component: TeacherRegistrationComponent},
      { path: 'user/head/registration',  component: HeadRegistrationComponent},
      { path: 'register', component: RegisterComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
