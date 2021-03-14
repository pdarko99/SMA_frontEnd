import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { students } from 'src/app/shared/studentsClass';

@Component({
  selector: 'app-students-info-edit',
  templateUrl: './students-info-edit.component.html',
  styleUrls: ['./students-info-edit.component.css']
})
export class StudentsInfoEditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<StudentsInfoEditComponent>, @Inject(MAT_DIALOG_DATA) public data: students) { }
  deleteOrUpdate: students | string = '';
  delOrUpdate: students | string;
  studentsData: students = {
    _id: this.data._id,
    firstname: this.data.firstname,
    lastname: this.data.lastname,
    age: this.data.age,
    gender: this.data.gender,
    guardians_tel:this.data.guardians_tel,
  }
  ngOnInit(): void {
    console.log(this.data._id, 'from data');
  }

  delete(): void {
    this.deleteOrUpdate = ' '
    // this.deleteOrUpdate = this.data._id
    this.delOrUpdate = this.data._id
    console.log(this.deleteOrUpdate, 'from this.update or delete')
    this.closeDialog()
  }

  editStudent(): void {
    this.deleteOrUpdate = this.studentsData
    this.delOrUpdate = this.studentsData
    this.closeDialog();
  }

  
  closeDialog() {
    console.log(this.delOrUpdate)
    this.dialogRef.close({
      event: 'close', data : this.delOrUpdate
    }) 
    console.log(this.deleteOrUpdate, 'from button')
  }




}
