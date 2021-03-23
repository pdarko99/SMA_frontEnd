import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { admin } from '../shared/adminClass';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  Url  = 'http://localhost:3000'
  schoolData$ = this.http.get<admin[]>(this.Url + '/admin').pipe(
    tap(data => console.log(data))
  )
  

 
  constructor(private http: HttpClient) { }

  submitData(data: admin): Observable<any>{
    return this.http.post<admin>(this.Url + '/admin', data)
  }

  
}
