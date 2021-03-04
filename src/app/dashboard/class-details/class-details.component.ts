import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { students } from 'src/app/shared/studentsClass';
import { AddStudentsComponent } from '../add-students/add-students.component';
import { ClassDetailsService } from '../class-details.service';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.css']
})
export class ClassDetailsComponent implements OnInit {
  teachersData = this.authservice.UserObject
  classData$ = this.classdetails.getClassData(this.teachersData.data.classTeacher).pipe(
    tap(data => console.log(data))
  )

  studentsData: students = {
    firstname: '',
    lastname: '',
    age: 0,
    gender: '',
    guardians_tel:0
  }
  constructor(private authservice: AuthService, private classdetails: ClassDetailsService, public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  openDialog() {
    const dialogRef = this.dialog.open(AddStudentsComponent, {
      width: '60%',
      height: '60%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  

}

}
