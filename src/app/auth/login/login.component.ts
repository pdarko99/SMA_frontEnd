import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import {login} from '../../shared/loginClass'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string;
  loginData:login = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService) { }


  onSubmit(): void{
    console.log(this.loginData, 'from normal loggin')
    this.authService.loginService(this.loginData)
      .subscribe(res => console.log(res),
                err => this.errorMessage = err)
  }

  ngOnInit(): void {
  }

}
