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
  UserObject: User = null

  constructor(private authService: AuthService, private router: Router) { }


  onSubmit(): void{
    console.log(this.loginData, 'from normal loggin')
    this.authService.loginService(this.loginData)
      .subscribe(res => {
        // this.UserObject = res;
        console.log(res)
        this.authService.UserObject = res;
        localStorage.setItem('userInfo', JSON.stringify(res))
        this.router.navigate([`user/${res.position}`])
        // console.log(res)
      },
        err => this.errorMessage = err)
  }

  ngOnInit(): void {
  }

  

}
