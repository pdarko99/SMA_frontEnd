import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {  merge, Subject } from 'rxjs';
import { scan, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { students } from 'src/app/shared/studentsClass';
import { AddStudentsComponent } from '../add-students/add-students.component';
import { ClassDetailsService } from '../class-details.service';
import { StudentsInfoEditComponent } from '../students-info-edit/students-info-edit.component';

@Component({
  selector: 'app-students-info',
  templateUrl: './students-info.component.html',
  styleUrls: ['./students-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentsInfoComponent implements OnInit {
  addedStudent: students;
  updateStu: boolean = true;

  private insertedStudent = new Subject<students | string>()
  insertedStudentAction$ = this.insertedStudent.asObservable().pipe(
    tap(data => console.log(data, 'form inserted subje ation'))
  )
  teachersData = this.authservice.UserObject 
  classData$ = this.classdetails.getClassData(this.teachersData.data?.classTeacher ).pipe(
    tap(data => console.log(data))
  )
  
  classDatawithAdds$ = merge(
    this.classData$.pipe(
      tap(data => console.log(data, 'from data and i cant be'))
    ),
    this.insertedStudentAction$.pipe(
      tap(data => console.log(data, 'from actions$'))
    )
  ).pipe(
    scan((stds: students[], std: students | string) => this.modifyProducts(stds, std))
   
  )

  displayColumns: string[] = ['firstname', 'lastname','age', 'gender', 'number', 'edit']
  constructor(private authservice: AuthService, private classdetails: ClassDetailsService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  modifyProducts(stds: students[], std: students | string): students[]{
    if (typeof(std) === 'object'){
      if(!this.updateStu){
          this.updateStu = true;
           return [...stds, std]
      }

      let index: number = stds.findIndex(student => student._id === std._id)
      stds[index] = std;
      this.classdetails.updateStudent(std, this.teachersData.data?.classTeacher).subscribe(
        res => {
          console.log(res);
          console.log('updaed successg')
        },
        err => console.log(err, 'from error')
      )
      return [...stds]
     
    }

      let index: number = stds.findIndex(student => student._id === std)
      stds.splice(index, 1)
      this.classdetails.deleteStudent(std, this.teachersData.data?.classTeacher ).subscribe(
        res => {
          console.log('student deleted')
        }
      )
      return [...stds];
  }

  updateStudent(element: students) {
    const dialogRef = this.dialog.open(StudentsInfoEditComponent, {
      width: '60%',
      height: '60%',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      this.insertedStudent.next(result.data)
    });

  

}

AddStudents() {
  const dialogRef = this.dialog.open(AddStudentsComponent, {
    width: '60%',
    height: '70%'
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
    this.addedStudent = result.data
    console.log(this.addedStudent, 'from this.added stud')
    this.updateStu = false
    this.insertedStudent.next(this.addedStudent)

    console.log(typeof(this.addedStudent))
    console.log('after inserted sut')
  });

}


}
