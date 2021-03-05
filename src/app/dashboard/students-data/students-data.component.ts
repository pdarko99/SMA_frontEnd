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
  teachersData = this.authservice.UserObject 
  classData$ = this.classdetails.getClassData(this.teachersData.data?.classTeacher ).pipe(
    tap(data => console.log(data))
  )
initial_column = of(['FIRSTNAME', 'LASTNAME'])



// the observable below returns data which can be used as the columns for my table
// since there was no way i could subscribe to, i silly enough did it in the tap operator :(
  // when i assign the display columns to 'info' it doesn't work (line 76)
  //  But when i assign it to ["MATHS", "ENGLISH", "SCIENCE", "SOCIAL", "BDT", "FRENCH", "RME", "TWI"] 
  //   it works which is the output of the console from line 79
  subjects$ = this.adminservice.schoolData$
  .pipe(
    map(data=> data.map(item => item.classGroup.find(items => items.class === this.teachersData.data?.classTeacher).subjects)),
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
    //  this.route.queryParams.subscribe(params => {
    //    this.queryClass = params.class
    }

    
  }

