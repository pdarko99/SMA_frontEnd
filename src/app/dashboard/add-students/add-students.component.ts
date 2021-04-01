import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { students } from 'src/app/shared/studentsClass';
import { ClassDetailsService } from '../class-details.service';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.css']
})
export class AddStudentsComponent implements OnInit {

  @ViewChild(NgForm) editForm: NgForm

  get isDirty(): boolean {
    return this.editForm.dirty ? true : false
  }
  teachersData = this.authservice.UserObject
  studentsData: students = {
    firstname: '',
    lastname: '',
    age: null,
    gender: '',
    guardians_tel:null
  }
  constructor(public dialogRef: MatDialogRef<AddStudentsComponent>, private authservice: AuthService, private classdetails: ClassDetailsService) { }

  ngOnInit(): void {
  }

  addStudent(): void{
    let firstname = this.studentsData.firstname.toUpperCase()
    this.studentsData.firstname = firstname
    this.classdetails.addStudent(this.teachersData.data.classTeacher, this.studentsData).subscribe(
      res =>this.closeDialog()
    )
  }

  closeDialog() {
    this.dialogRef.close({
      event: 'close', data : this.studentsData, dirty: this.isDirty
    })
  }
  

}
