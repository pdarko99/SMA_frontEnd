import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/shared/userClass';
import {login} from '../../shared/loginClass'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string;
  loginData:login = {
    email: '',
    password: ''
  };
  UserObject: User = new User;

  constructor(private authService: AuthService, private router: Router) { }


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
        // if(res.position === 'head'){
        //   //get the admin data and check for completed
        //   //if completed navigate to position
        //   //else navigate to head registraion component
        // }
        this.router.navigate([`user/${res.position}`])
      },
        err => this.errorMessage = 'invalid email or password')
  }

  ngOnInit(): void {
  }

  

}
