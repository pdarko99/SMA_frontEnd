import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { merge, of } from 'rxjs';
import { map, scan, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { ClassDetailsService } from 'src/app/dashboard/class-details.service';
import { students } from 'src/app/shared/studentsClass';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-head-students-data',
  templateUrl: './head-students-data.component.html',
  styleUrls: ['./head-students-data.component.css']
})
export class HeadStudentsDataComponent implements OnInit {
initial_column = of(['FIRSTNAME', 'LASTNAME'])

  headClass: students[]
  private _queryClass: string
  get queryClass(): string {
    return this._queryClass
  }
  set queryClass(value: string){
    this._queryClass = value;
    this.classdetails.getClassData(this.queryClass).subscribe(
      res => {
        this.headClass = res;
        this.dataSource = new MatTableDataSource<students>(this.headClass)
        // console.log(this.displayClass)
      },
      err => console.log(err)
    )
  }

  subjects$ = this.adminservice.schoolData$
  .pipe(
    map(data=> data.map(item => item.classGroup.find(items => items.class ===  this.queryClass)?.subjects)),
    map(data => data.map(x => x.map(y => y.subject))),
    map(data => data[0]),
  
    tap(info => console.log(info, 'logiing in from heroro'))

  )

  combinedSubjects$ = merge(
    this.initial_column,
    this.subjects$
    ).pipe(
      scan((column, subject) => [...column, ...subject]),
      tap(x => console.log(x, 'lgoo from dsaklfjapeoejfaeo'))
    )

 dataSource : MatTableDataSource<students>
 constructor(private route: ActivatedRoute, private authservice: AuthService, private adminservice: AdminService,  private classdetails: ClassDetailsService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.queryClass = params.class
      console.log(this.queryClass)
   })
  }

}
