import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { merge, of } from 'rxjs';
import { map, scan, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { ClassDetailsService } from 'src/app/dashboard/class-details.service';
import { students } from 'src/app/shared/studentsClass';
import { AdminService } from '../admin.service';
import { ClassPerformanceComponent } from '../class-performance/class-performance.component';

@Component({
  selector: 'app-head-students-data',
  templateUrl: './head-students-data.component.html',
  styleUrls: ['./head-students-data.component.css']
})
export class HeadStudentsDataComponent implements OnInit {
initial_column = of(['FIRSTNAME', 'LASTNAME'])
combinedSubjects$: any;
  inputValue : string;
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
        this.combinedSubjects$ = merge(
          this.initial_column,
          this.subjects$
          ).pipe(
            scan((column, subject) => [...column, ...subject]),
          )
      },
      err => console.log(err)
    )
  }

  subjects$ = this.adminservice.schoolData$
  .pipe(
    map(data=> data.map(item => 
      item.classGroup.find(items => 
      items.class === this.queryClass).subjects.map(data => 
      data.subject
      ))[0]),
  
    tap(info => console.log(info, 'logiing in from heroro'))

  )



 dataSource : MatTableDataSource<students>
 constructor(private route: ActivatedRoute, private authservice: AuthService, public dialog: MatDialog, private adminservice: AdminService,  private classdetails: ClassDetailsService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.queryClass = params.class
   })
  }

  performance() {
    const dialogRef = this.dialog.open(ClassPerformanceComponent, {
      width: '80%',
      height: '90%',
      data: {
        clas: this.queryClass,
        subjects: this.subjects$,
        data: this.headClass
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.inputValue = filterValue;
    // console.log(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
