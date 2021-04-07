import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { AdminService } from 'src/app/head_dashboard/admin.service';
import { admin } from 'src/app/shared/adminClass';
import { User } from 'src/app/shared/userClass';
import {login} from '../../shared/loginClass'
import { CredentialsComponent } from '../credentials/credentials.component';


const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  teachersData: admin[]
  isScreenSmall: boolean

  errorMessage: string;
  loginData:login = {
    email: '',
    password: ''
  };
  UserObject: User = new User;

  constructor(private authService: AuthService, private router: Router, private adminservice: AdminService, public dialog: MatDialog, private breakpointObserver: BreakpointObserver) { }


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
   this.breakpointObserver.observe([
    `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`
  ]).subscribe(
    (state: BreakpointState) =>  {
      this.isScreenSmall = state.matches
    }
  )

  this.openFeedback()

  }

  openFeedback(): void{
    const dialogRef = this.dialog.open(CredentialsComponent, {
      // width: '70%',
      width: this.isScreenSmall ? '70%' : '40%',
      height: '60%'
     
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      
    });
  }





}
