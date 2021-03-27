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
import { ClassPerformanceComponent } from '../class-performance/class-performance.component';


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
   
  inputValue: string;

  get subject(): string {
    return this._subject
  }
  set subject(value: string){
    this._subject = value
    this.columnData = ['firstname', 'lastname']
    this.columnData.push(this.subject + ' CLASS', this.subject + ' EXAMS', this.subject + ' TOTAL', ' GRADE', 'edit')
  }
  _subject: string;
  _index: number;



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

   
  }

  enterMarks() {
    const dialogRef = this.dialog.open(AddMarksComponent, {
      width: '60%',
      height: '60%',
      data: this.subject
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      let index: number = this.studentsData.findIndex(student => student._id === result.data.id)
      this.studentsData[index][this.subject] = {}
      this.studentsData[index][this.subject].classScore = result.data.data.classScore
      this.studentsData[index][this.subject].examScore = result.data.data.examScore
      this.studentsData[index][this.subject].totalScore = +result.data.data.examScore + (+result.data.data.classScore)

    });
  }

  performance() {
    const dialogRef = this.dialog.open(ClassPerformanceComponent, {
      width: '80%',
      height: '90%',
      data: {
        subject: this.subject,
        data: this.studentsData
      }
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
        currentClass: this.currentClass,
        subject: this.subject
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(!result.data.delete){
        let index: number = this.studentsData.findIndex(student => student._id === result.data.id)
        this.studentsData[index][this.subject].classScore = result.data.data.classScore
        this.studentsData[index][this.subject].examScore = result.data.data.examScore
        this.studentsData[index][this.subject].totalScore = +result.data.data.examScore + (+result.data.data.classScore)

        return
      }
      let index: number = this.studentsData.findIndex(student => student._id === result.data.id)
      this.studentsData.splice(index, 1);
      this.dataSource = new MatTableDataSource<students>(this.studentsData)

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.inputValue = filterValue;
  
    this.dataSource.filter = filterValue.trim().toLowerCase();

  
  
  }


}
