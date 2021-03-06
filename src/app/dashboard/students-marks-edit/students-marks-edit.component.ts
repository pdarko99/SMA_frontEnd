import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { students } from 'src/app/shared/studentsClass';

@Component({
  selector: 'app-students-marks-edit',
  templateUrl: './students-marks-edit.component.html',
  styleUrls: ['./students-marks-edit.component.css']
})
export class StudentsMarksEditComponent implements OnInit {
  currentStudent: students
  subject: string
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }
  marks = {
    classScore: '',
    examScore: '',
    totalScore: 0
  }
  ngOnInit(): void {
    this.currentStudent = this.data.element
    this.subject = this.data.subject

    this.marks.classScore = this.currentStudent[this.subject].classScore;
    this.marks.examScore = this.currentStudent[this.subject].examScore;
  }

  OnEdit(): void{
    console.log('not yet implemented')
  }

}
