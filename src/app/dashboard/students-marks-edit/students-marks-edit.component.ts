import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { students } from 'src/app/shared/studentsClass';
import { ClassDetailsService } from '../class-details.service';

@Component({
  selector: 'app-students-marks-edit',
  templateUrl: './students-marks-edit.component.html',
  styleUrls: ['./students-marks-edit.component.css']
})
export class StudentsMarksEditComponent implements OnInit {
  currentStudent: students
  subject: string;
  currentClass: string;
  delete = false
  constructor(public dialogRef: MatDialogRef<StudentsMarksEditComponent>, @Inject(MAT_DIALOG_DATA) public data:any, private classdetails: ClassDetailsService) { }
  marks = {
    classScore: '',
    examScore: '',
    totalScore: 0
  }
  ngOnInit(): void {
    this.currentStudent = this.data.element
    this.subject = this.data.subject
    this.currentClass = this.data.currentClass;

    this.marks.classScore = this.currentStudent[this.subject].classScore;
    this.marks.examScore = this.currentStudent[this.subject].examScore;
  }

  OnEdit(): void{
    console.log('not yet implemented')
    this.preEdit()
    this.classdetails.sendMarks(this.marks).subscribe(
      res => console.log('updated marks'),
      err => console.log(err)
    )
    this.closeDialog()
  }

  // onDelete(): void {
  //   this.delete = true;
  //   this.closeDialog();
  // }

  closeDialog() {
    
    this.dialogRef.close({
      event: 'close', data : {data: this.marks, id: this.currentStudent._id, delete: this.delete}
    })
  }   

  preEdit(): void {
    this.classdetails.subject = this.subject;
    this.classdetails.class = this.currentClass;
    this.classdetails.id = this.currentStudent._id
    this.classdetails.status = '';
    this.marks.totalScore = (+this.marks.classScore) + (+this.marks.examScore) 
  }

}
