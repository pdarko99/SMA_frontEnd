import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, scan, startWith, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { AdminService } from 'src/app/head_dashboard/admin.service';
import { students } from 'src/app/shared/studentsClass';
import { ClassDetailsService } from '../class-details.service';
import {MatTableDataSource} from '@angular/material/table'
import {combineLatest, merge, of, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ReportsComponent } from '../reports/reports.component';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { StudentsPerformanceComponent } from '../students-performance/students-performance.component';

const SMALL_WIDTH_BREAKPOINT = 720;
@Component({
  selector: 'app-students-data',
  templateUrl: './students-data.component.html',
  styleUrls: ['./students-data.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentsDataComponent implements OnInit {
  isScreenSmall: boolean
  initial_column = of(['FIRSTNAME', 'LASTNAME'])
  private searchedItem = new Subject<string>();
  searchedItemAction$ = this.searchedItem.asObservable();

  teachersData = this.authservice.UserObject 
  classData$ = this.classdetails.getClassData(this.teachersData.data?.classTeacher ).pipe(
    map(data => data.sort((x,y) => {
      return y.grandScore - x.grandScore
    }))
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
  constructor(private route: ActivatedRoute, private authservice: AuthService, private adminservice: AdminService, public dialog: MatDialog,  private classdetails: ClassDetailsService, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.breakpointObserver.observe([
      `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`
    ]).subscribe(
      (state: BreakpointState) =>  {
        this.isScreenSmall = state.matches
      }
    )
 
    }

    onSelected(firstname: string) {
      this.searchedItem.next(firstname)
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

    openPerformance() {
      const dialogRef = this.dialog.open(StudentsPerformanceComponent, {
        width: '70%',
        height: '95%',
        data: {
          data: this.classData$,
          subjects : this.subjects$
        }
        // data: {data: element, index}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
  
    
  
    
    }

    
  }

