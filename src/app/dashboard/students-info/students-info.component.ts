import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { students } from 'src/app/shared/studentsClass';
import { ClassDetailsService } from '../class-details.service';
import { StudentsInfoEditComponent } from '../students-info-edit/students-info-edit.component';

@Component({
  selector: 'app-students-info',
  templateUrl: './students-info.component.html',
  styleUrls: ['./students-info.component.css']
})
export class StudentsInfoComponent implements OnInit {
  teachersData = this.authservice.UserObject 
  classData$ = this.classdetails.getClassData(this.teachersData.data?.classTeacher ).pipe(
    tap(data => console.log(data))
  )

  displayColumns: string[] = ['firstname', 'lastname','age', 'gender', 'number', 'edit']
  constructor(private authservice: AuthService, private classdetails: ClassDetailsService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(element: students) {
    const dialogRef = this.dialog.open(StudentsInfoEditComponent, {
      width: '60%',
      height: '60%',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  

}

}
