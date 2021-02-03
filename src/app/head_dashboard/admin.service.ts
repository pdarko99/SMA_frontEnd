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
  schoolData$ = this.http.get<admin[]>(this.Url + '/admin')
  
  private classSubjects = new Subject<string>();
  insertedSubjects$ = this.classSubjects.asObservable();

  classWithSubjects$ = combineLatest([
    this.schoolData$,
    this.insertedSubjects$
]).pipe(
  map(([data, individualClass]) => data.find(item => item.classGroup.class == individualClass)),
  tap(info =>console.log(info))
  )


// .pipe(
//    map(([data, individualClass]) => data.map(items => ({
//       items.find(item => item.class === individualClass)
//    }) )),
//    tap(info => console.log(info))
// )

// data.find(item => item.class === individualClass
 
  constructor(private http: HttpClient) { }

  submitData(data: admin): Observable<any>{
    return this.http.post<admin>(this.Url + '/admin', data)
  }

  selectedClass(individualClass:string): void{
    this.classSubjects.next(individualClass)
  }
  
}
