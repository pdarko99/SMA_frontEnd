import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { students } from 'src/app/shared/studentsClass';

@Component({
  selector: 'app-students-info-edit',
  templateUrl: './students-info-edit.component.html',
  styleUrls: ['./students-info-edit.component.css']
})
export class StudentsInfoEditComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: students) { }
  studentsData: students = {
    firstname: this.data.firstname,
    lastname: this.data.lastname,
    age: this.data.age,
    gender: this.data.gender,
    guardians_tel:this.data.guardians_tel
  }
  ngOnInit(): void {
    console.log(this.data);
  }

  editStudent(): void {
    console.log('sudnet added')
  }

  // update(data): void {
  //   this.servicce.update(data)
  // }

}
