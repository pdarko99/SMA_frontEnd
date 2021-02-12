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
  


  
// .pipe(
//   tap(([data, individualClass]) => console.log(data[0].classGroup))
//   map(([data, individualClass]) => data.find(item => item.classGroup.class == individualClass)),
//   tap(info =>console.log(info))
//   )


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

  // selectedClass(individualClass:string): void{
  //   this.classSubjects.next(individualClass)
  //   console.log(this.classSubjects.next(individualClass))
  // }
  
}
