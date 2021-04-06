import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { FeedbackComponent } from 'src/app/feedback/feedback/feedback.component';
import { AdminService } from 'src/app/head_dashboard/admin.service';
import { admin } from 'src/app/shared/adminClass';
import { User } from 'src/app/shared/userClass';
import {login} from '../../shared/loginClass'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  teachersData: admin[]
  errorMessage: string;
  loginData:login = {
    email: '',
    password: ''
  };
  UserObject: User = new User;

  constructor(private authService: AuthService, private router: Router, private adminservice: AdminService) { }


  onSubmit(): void{
    this.authService.loginService(this.loginData)
      .subscribe(res => {
        this.authService.UserObject = res;
        localStorage.setItem('userInfo', JSON.stringify(res))
        if (res.position === 'teacher'){
          if(res.data){
            return  this.router.navigate([`user/${res.position}`])
          }
          return this.router.navigate(['teacher/registration'])
        }
        if(res.position === 'head'){
          if(this.teachersData[0] !== null){
            return this.router.navigate([`user/${res.position}`])
          }
         return this.router.navigate(['head/registration'])

      }
        this.router.navigate([`user/${res.position}`])
      },
        err => this.errorMessage = 'Invalid email or password')
  }

  ngOnInit(): void {
    this.adminservice.schoolData$.subscribe(
     res => this.teachersData = res
   )

  }





}
