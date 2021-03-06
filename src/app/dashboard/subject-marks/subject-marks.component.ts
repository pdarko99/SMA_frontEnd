import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { marks } from 'src/app/shared/marksClass';
import { students } from 'src/app/shared/studentsClass';
import { subjectMarks } from 'src/app/shared/subjectMarks';
import { ClassDetailsService } from '../class-details.service';
import {MatDialog} from '@angular/material/dialog';
import { AddMarksComponent } from '../add-marks/add-marks.component';
import { StudentsMarksEditComponent } from '../students-marks-edit/students-marks-edit.component';


@Component({
  selector: 'app-subject-marks',
  templateUrl: './subject-marks.component.html',
  styleUrls: ['./subject-marks.component.css']
})
export class SubjectMarksComponent implements OnInit {
  
  studentsData: students[]
  get currentClass(): string{
    return this._currentClass
  }
  
  set currentClass(value: string){
    this._currentClass = value;
    this.classdetails.getClassData(this.currentClass)
    .subscribe(
      res => {
        this.studentsData = res;
        this.dataSource = new MatTableDataSource<students>(this.studentsData)
        console.log(this.studentsData)
      },
      err => console.log(err)
    )

  }
  _currentClass: string;
   


  get subject(): string {
    return this._subject
  }
  set subject(value: string){
    this._subject = value
    this.columnData = ['firstname', 'lastname'];
    this.columnData.push(this.subject + ' CLASS_SCORE', this.subject + ' EXAMS_SCORE', 'edit')
  }
  _subject: string;
  _index: number;

  // get index(): number{
  //   return  this._index
  // }
  // set(value: number){
  //   this._index = value
  // }

  dataSource : MatTableDataSource<students>
 columnData: string[];
  constructor(private route: ActivatedRoute, private classdetails: ClassDetailsService, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.route.params.subscribe(subject => {
      this.subject = subject.subject
    })

    this.route.queryParams.subscribe(params => {
      this.currentClass = params.class
    })

    // this.columnData.push(this.subject + ' classScore', this.subject + ' examsScore')
   
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddMarksComponent, {
      width: '60%',
      height: '60%',
      data: this.subject
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openEditDialog(element: students) {
    const dialogRef = this.dialog.open(StudentsMarksEditComponent, {
      width: '60%',
      height: '60%',
      data: {
        element,
        subject: this.subject
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}
