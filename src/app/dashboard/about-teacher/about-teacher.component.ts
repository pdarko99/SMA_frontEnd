import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { combineLatest, EMPTY, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { AdminService } from 'src/app/head_dashboard/admin.service';

@Component({
  selector: 'app-about-teacher',
  templateUrl: './about-teacher.component.html',
  styleUrls: ['./about-teacher.component.css']
})
export class AboutTeacherComponent implements OnInit {
  private classSubjects = new Subject<string>();
  insertedSubjects$ = this.classSubjects.asObservable();
  teachersData: any;
  subjectGroup: any;
  data: any;
  prince: any = []

 classWithSubjects: any;
  teacherUpdateForm: FormGroup

  constructor(private authservice: AuthService, private fb: FormBuilder, private adminservice: AdminService) { }

  ngOnInit(): void {
//     <div *ngFor="let classes of teachersData.data.subjectGroup">
//     <p>
//         {{classes.class}}
//     </p>
//     <div *ngFor= "let subjects of classes.subjects">
//         {{classes.class}}
//         <a [routerLink]="['subjectDetails', subjects.subject]" [queryParams]="{class:classes.class}">{{subjects.subject}}</a>
//     </div>
// </div>

    this.teacherUpdateForm = this.fb.group({
      status: '',
      classTeacher: '',
      subjectGroup : this.fb.array(
       [this.buildClasses])
    })

    this.authservice.getTeachersData().pipe(
      map(data => data[0].data),
      tap(data => console.log(data, 'logging from data'))
    ).subscribe(
      res => {
        this.data = res
        console.log(this.data, 'from mian data')
        this.subjectGroup = res.subjectGroup
        this.subjectGroup.forEach(element => {
          this.prince.push(element.subjects)
        });
        console.log(this.prince.length, 'from prince')
       this.UpdateForm()
        console.log(this.subjectGroup, 'form info')
  


      }

      

      
      
    )
  this.adminservice.schoolData$.pipe(
      map(data => data[0].classGroup),
      ).subscribe(
        res => this.teachersData = res
      )

      combineLatest([
        this.adminservice.schoolData$,
        this.insertedSubjects$
      ])
      .pipe(
          map(([data, individualClass]) => data.map(item => item.classGroup.find(items => items.class === individualClass).subjects)),
          map(info => info[0]) ,
          tap(finalinfo => console.log(finalinfo))
      ).subscribe(
        res => this.classWithSubjects = res
      )

  }


  UpdateForm(): void {
    this.clearFormArray()
    this.subjectGroup.forEach(element => {
      let teacher: FormGroup = this.buildClasses;
      this.subjects.push(teacher)
      this.setClass(element.class)


       element.subjects.forEach((ele, index) => {
            (teacher.get('subjects') as FormArray).push(this.buildIndividualSubjects)
            // this.addIndividualSubs(teacher)
            console.log(index, 'from index')
            console.log(ele, 'from elel')

        });

    

    });

    this.teacherUpdateForm.patchValue(this.data)
  }

  clearFormArray(): void {
    this.subjects.clear()
  }

  get buildClasses():FormGroup{
    const group = this.fb.group({
      class: '',
      subjects: this.fb.array([ this.buildIndividualSubjects])
    })
    return group

}


get buildIndividualSubjects(): FormGroup{
  return this.fb.group({
    subject:  '', 
  })
}

setClass(data:string): void{
  this.classSubjects.next(data)
}

addIndividualSubs(subs): void {
subs.get("subjects").push(this.buildIndividualSubjects)
}
addSubjects(): void{
  this.subjects.push(this.buildClasses);
}

get subjects(): FormArray {
  return <FormArray>this.teacherUpdateForm.get('subjectGroup');
}

onSubmit(): void {
  console.log('not yet implemented')
}
}
