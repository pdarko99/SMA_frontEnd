import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { account, students } from '../shared/studentsClass';
import { marks } from '../shared/marksClass';


@Injectable({
  providedIn: 'root'
})
export class ClassDetailsService {
  url = 'http://localhost:3000/students'
  subject: string;
  class:string;
  id: string;
  constructor(private http: HttpClient) { }

  getClassData(data: string): Observable<students[]>{
    return this.http.get<students[]>(this.url + '?class=' + data)
  }

  addStudent(data, student): Observable<students>{
    return this.http.post<students>(this.url + '?class=' + data, student)
  }

  sendMarks(data: marks): Observable<marks> {
    return this.http.post<marks>(this.url + '/marks' + '?subject=' + this.subject + '&' + 'class=' + this.class+ '&' + 'id=' + this.id, data)
  }

  sendFees(data: account): Observable<any> {
    return this.http.post<account>(this.url + '/fees' + '?class=' + this.class + '&' + 'id=' + this.id, data)
  }

}
