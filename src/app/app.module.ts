import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountModule } from './account_dashboard/account.module';
import { HttpInterceptorModule } from './auth/http-interceptor';
import { AuthModule } from './auth/auth.module';
import { HeadModule } from './head_dashboard/head.module';
import { TeacherModule } from './dashboard/teacher.module';
import { AppRoutingModuleModule } from './shared/app-routing-module.module';
import { AppComponent } from './app.component';
import { FeedbackModule } from './feedback/feedback/feedback.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HttpInterceptorModule,
    AppRoutingModuleModule,
    AccountModule,
    AuthModule,
    HeadModule,
    TeacherModule,
    FeedbackModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
