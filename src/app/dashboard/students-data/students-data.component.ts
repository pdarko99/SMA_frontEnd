import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, scan, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { AdminService } from 'src/app/head_dashboard/admin.service';
import { students } from 'src/app/shared/studentsClass';
import { ClassDetailsService } from '../class-details.service';
import {MatTableDataSource} from '@angular/material/table'
import {merge, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ReportsComponent } from '../reports/reports.component';


@Component({
  selector: 'app-students-data',
  templateUrl: './students-data.component.html',
  styleUrls: ['./students-data.component.css']
})
export class StudentsDataComponent implements OnInit {
  initial_column = of(['FIRSTNAME', 'LASTNAME'])
  
  teachersData = this.authservice.UserObject 
  classData$ = this.classdetails.getClassData(this.teachersData.data?.classTeacher ).pipe(
    map(data => data.sort((x,y) => {
      return y.grandScore - x.grandScore
    })),
    tap(data => console.log(data))
  )



  subjects$ = this.adminservice.schoolData$
  .pipe(
    map(data=> data.map(item => 
      item.classGroup.find(items => 
      items.class === this.teachersData.data?.classTeacher).subjects.map(data => 
      data.subject
      ))[0]),
    map(data => [...data, 'TOTALSCORE']),

  )

  combinedSubjects$ = merge(
    this.initial_column,
    this.subjects$,
    ).pipe(
      scan((column, subject) => [...column, ...subject])
    )



  
  dataSource : MatTableDataSource<students>
  constructor(private route: ActivatedRoute, private authservice: AuthService, private adminservice: AdminService, public dialog: MatDialog,  private classdetails: ClassDetailsService) { }

  ngOnInit(): void {
 
    }

    openReport(element: students, index: number) {

      const dialogRef = this.dialog.open(ReportsComponent, {
        width: '70%',
        height: '95%',
        data: {data: element, index}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
  
    
  
    
    }

    
  }

