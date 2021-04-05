import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { account, students } from '../shared/studentsClass';
import { marks } from '../shared/marksClass';
import { scan } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ClassDetailsService {
  url = 'sm-a.herokuapp.com/students'
  subject: string;
  class:string;
  id: string;
  status: string

  constructor(private http: HttpClient) { }

  getClassData(data: string): Observable<students[]>{
    return this.http.get<students[]>(this.url + '?class=' + data)
  }

  addStudent(data, student): Observable<students>{
    return this.http.post<students>(this.url + '?class=' + data, student)
  }

  deleteStudent(id: string, stdsClass: string): Observable<any>{
    return this.http.delete<any>(this.url  + '?deletedId=' + id + '&' + 'class=' + stdsClass)

  }

  updateStudent(std: students,  stdsClass: string): Observable<any> {
       return this.http.patch<students>(this.url + '/update'  + '?updatedId=' + std._id + '&' + 'class=' + stdsClass, std)

  }

  sendMarks(data: marks): Observable<marks> {
    return this.http.post<marks>(this.url + '/marks' + '?subject=' + this.subject + '&' + 'class=' + this.class+ '&' + 'id=' + this.id + '&' + 'status=' + this.status, data)
  }

  sendFees(data: account): Observable<any> {
    return this.http.post<account>(this.url + '/fees' + '?class=' + this.class + '&' + 'id=' + this.id, data)
  }

}
