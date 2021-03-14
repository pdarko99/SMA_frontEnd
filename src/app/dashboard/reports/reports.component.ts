import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { AdminService } from 'src/app/head_dashboard/admin.service';
import { students } from 'src/app/shared/studentsClass';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  teachersData = this.authservice.UserObject 
  student: students;
  position:number

  // dataSource : MatTableDataSource<>
  displayColumns = ['subjects', 'classScore', 'examScore', 'totalScore', 'grade']
  subjects$ = this.adminservice.schoolData$
  .pipe(
    map(data=> data.map(item => 
      item.classGroup.find(items => 
      items.class === this.teachersData.data?.classTeacher).subjects.map(data => 
      data.subject
      ))[0])
  )
  constructor(private adminservice: AdminService, private authservice: AuthService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.student = this.data.data
    console.log(this.data.index)
    this.position = this.data.index + 1
    console.log(this.position, 'coming from position')
  }

}
