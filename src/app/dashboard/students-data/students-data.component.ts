import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, scan, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { AdminService } from 'src/app/head_dashboard/admin.service';
import { students } from 'src/app/shared/studentsClass';
import { ClassDetailsService } from '../class-details.service';
import {MatTableDataSource} from '@angular/material/table'
import {merge, of } from 'rxjs';



//  THIS COMPONENT IS USED BY TWO DIFFERENT MODULES (for teacher and head)


@Component({
  selector: 'app-students-data',
  templateUrl: './students-data.component.html',
  styleUrls: ['./students-data.component.css']
})
export class StudentsDataComponent implements OnInit {

  // displayClass = true;
  teachersData = this.authservice.UserObject || null
  classData$ = this.classdetails.getClassData(this.teachersData.data?.classTeacher ).pipe(
    tap(data => console.log(data))
  )
initial_column = of(['FIRSTNAME', 'LASTNAME'])
  // for headMaster Component
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
// end of headMaster Component
private _columns: any[];
get columns(): any{
  return this._columns
}
set columns(value: any){
  this._columns = value;
  let _this = this
  // this._columns.forEach(function(i){
  //   i.forEach(function(element)  {
  //     _this.displayedColumns.push(element.subject)
  //   });
  // })
  // this._columns.forEach(i => {
  //   i.forEach(element => {
  //       _this.displayedColumns.push(element.subject)
  //   });
  // })
  // console.log(this.displayedColumns, 'this.i saidfjoep')
}


// the observable below returns data which can be used as the columns for my table
// since there was no way i could subscribe to, i silly enough did it in the tap operator :(
  // when i assign the display columns to 'info' it doesn't work (line 76)
  //  But when i assign it to ["MATHS", "ENGLISH", "SCIENCE", "SOCIAL", "BDT", "FRENCH", "RME", "TWI"] 
  //   it works which is the output of the console from line 79
  subjects$ = this.adminservice.schoolData$
  .pipe(
    map(data=> data.map(item => item.classGroup.find(items => items.class === this.teachersData.data?.classTeacher || this.queryClass)?.subjects)),
    map(data => data.map(x => x.map(y => y.subject))),
    map(data => data[0]),
    // map(data => {
    //     this.initial_column.concat(data)
    // }),
    tap(info => console.log(info, 'logiing in from heroro'))
    // tap(info => {
    //   this.displayedColumns = info[0]
    //   this.displayedColumns.push('firstname', 'lastname')
    //   console.log(this.displayedColumns)
    // })

  )

  combinedSubjects$ = merge(
    this.initial_column,
    this.subjects$
    ).pipe(
      scan((column, subject) => [...column, ...subject]),
      tap(x => console.log(x, 'lgoo from dsaklfjapeoejfaeo'))
    )

    // productsWithAdd$ = merge(
    //   this.productsWithCategories$,
    //   this.productInsertedActions$
    // )
    // .pipe(
    //   scan((acc: Product[], value: Product) => [...acc, value])
    // )

  
  dataSource : MatTableDataSource<students>
  constructor(private route: ActivatedRoute, private authservice: AuthService, private adminservice: AdminService,  private classdetails: ClassDetailsService) { }

  ngOnInit(): void {
     this.route.queryParams.subscribe(params => {
       this.queryClass = params.class
    })

    
  }
}
