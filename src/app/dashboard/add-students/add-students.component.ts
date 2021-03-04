import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { students } from 'src/app/shared/studentsClass';
import { ClassDetailsService } from '../class-details.service';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.css']
})
export class AddStudentsComponent implements OnInit {
  teachersData = this.authservice.UserObject
  studentsData: students = {
    firstname: '',
    lastname: '',
    age: 0,
    gender: '',
    guardians_tel:0
  }
  constructor(private authservice: AuthService, private classdetails: ClassDetailsService) { }

  ngOnInit(): void {
  }

  addStudent(): void{
    this.classdetails.addStudent(this.teachersData.data.classTeacher, this.studentsData).subscribe(
      res => console.log(res)
    )
  }
  

}
