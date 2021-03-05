import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { login } from '../shared/loginClass';
import { register } from '../shared/registerClass';
import { updateRegister } from '../shared/updateRegisterClass';
import { User } from '../shared/userClass';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  UserObject: User = JSON.parse(localStorage.getItem('userInfo'))
  url = "http://localhost:3000"
  constructor(private http: HttpClient) { }


  loginService(data:login): Observable<any>{
    return this.http.post<login>(this.url + '/login', data).pipe(catchError(this.handleError))
  }
  registerService(data: register): Observable<any>{
    return this.http.post<register>(this.url + '/register', data).pipe(catchError(this.handleError))
  }

  updateRegisterService(data: updateRegister): Observable<any>{
    return this.http.put<updateRegister>(this.url + '/register', data).pipe(
      catchError(this.handleError),
      
      )
  }


  handleError(err:HttpErrorResponse){
    let message = '';

    if(err.error instanceof ErrorEvent){
      message = `an error occured: ${err.error.message}`
    }
    else{
      message =  `backend error message is: ${err.message}`
    }
    console.log(message);
    return throwError(message)


  }
}
