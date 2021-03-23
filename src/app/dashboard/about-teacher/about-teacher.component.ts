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
  currentClass: any
  availableClass: string;

 classWithSubjects: any;
  teacherUpdateForm: FormGroup

  constructor(private authservice: AuthService, private fb: FormBuilder, private adminservice: AdminService) { }
  subjectss: any

  ngOnInit(): void {
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
        this.UpdateForm();
        this.teacherUpdateForm.patchValue(this.data)
        clearInterval(this.subjectss)

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
          map(info => info[0]),
          // catchError(err => console.log(err)),
          tap(finalinfo => console.log(finalinfo))
      ).subscribe(
        res => this.classWithSubjects = res
      )

  }


  UpdateForm(): void {
    this.clearFormArray()

    this.subjectGroup.forEach((element, index) => {
      let teacher: FormGroup = this.buildClasses;
      this.subjects.push(teacher)
      // this.setClass(element.class)
      
       element.subjects.forEach((ele, index) => {
         (teacher.get('subjects') as FormArray).push(this.buildIndividualSubjects)

        });

      });
      

  }

  clearFormArray(): void {
    this.subjects.clear()
  }

  get buildClasses():FormGroup{
    const group = this.fb.group({
      class: '',
      subjects: this.fb.array([ this.buildIndividualSubjects])
    })

    group.get('class').valueChanges.subscribe(res => {
      let _this = this;
      this.availableClass = res
      this.setClass(this.availableClass)
      // this.subjectss = setInterval(function(){
      //    _this.setClass(res);
         
      // }, 2500)

   
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
  clearInterval(this.subjectss)
  this.setClass('');
  this.subjects.push(this.buildClasses);

}

get subjects(): FormArray {
  return <FormArray>this.teacherUpdateForm.get('subjectGroup');
}

onSubmit(): void {
  clearInterval(this.subjectss)
  console.log('not yet implemented')
}
}
