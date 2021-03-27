import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {  combineLatest, merge, Subject } from 'rxjs';
import { map, scan, startWith, tap } from 'rxjs/operators';
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
  private searchedStd = new Subject<string>();
  insertedSearchedStd$ = this.searchedStd.asObservable()
  inputValue: string;


  private _selected: string 

  get selected(): string{
    return this._selected
  }

  set selected(value: string){
    this._selected = value
    // this.classDataWithSearch$
  }

  addedStudent: students;
  updateStu: boolean = true;

  private insertedStudent = new Subject<students | string>()
  insertedStudentAction$ = this.insertedStudent.asObservable()

  teachersData = this.authservice.UserObject 
  classData$ = this.classdetails.getClassData(this.teachersData.data?.classTeacher )

  
  classDatawithAdds$ = merge(
    this.classData$,
    this.insertedStudentAction$
  ).pipe(
    scan((stds: students[], std: students | string) => this.modifyProducts(stds, std))
   
  )

  classDataWithSearch$ =  combineLatest([
    this.classDatawithAdds$,
    this.insertedSearchedStd$.pipe(
      startWith('')
    )

  ])
  .pipe(
    map(([stds, std]) => stds.filter(sts => std ?  sts.firstname === std.trim().toUpperCase() : true) )
  
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
      data: element,
      disableClose: true

    });

    dialogRef.afterClosed().subscribe(result => {
      this.insertedStudent.next(result.data)
    });

}

AddStudents() {
  const dialogRef = this.dialog.open(AddStudentsComponent, {
    width: '60%',
    height: '70%',
    disableClose: true

  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
    this.addedStudent = result.data
    this.updateStu = false
    this.insertedStudent.next(this.addedStudent)

  });

}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.inputValue = filterValue;

  this.searchedStd.next(filterValue)


}



}
