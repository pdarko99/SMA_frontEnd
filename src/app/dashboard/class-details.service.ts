import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { students } from '../shared/studentsClass';

@Injectable({
  providedIn: 'root'
})
export class ClassDetailsService {
  url = 'http://localhost:3000/students'
  constructor(private http: HttpClient) { }

  getClassData(data:string): Observable<students[]>{
    return this.http.get<students[]>(this.url + '?class=' + data)
  }

  addStudent(data, student): Observable<students>{
    return this.http.post<students>(this.url + '?class=' + data, student)
  }
}
