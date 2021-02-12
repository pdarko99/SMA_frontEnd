import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  combineLatest, EMPTY, Subject } from 'rxjs';
import { catchError, debounceTime, map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { AdminService } from 'src/app/head_dashboard/admin.service';
import { subject } from 'src/app/shared/adminClass';

@Component({
  selector: 'app-teacher-registration',
  templateUrl: './teacher-registration.component.html',
  styleUrls: ['./teacher-registration.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeacherRegistrationComponent implements OnInit {
  teacherRegisterForm :FormGroup
  errMsg: string;
  private classSubjects = new Subject<string>();
  insertedSubjects$ = this.classSubjects.asObservable();

    teachersData$ = this.adminservice.schoolData$.pipe(
    // tap(data => console.log(data[0].classGroup)),
    map(data => data[0].classGroup),
    catchError(err => {
      this.errMsg = err;
      return EMPTY
    })
 )

  classWithSubjects$ = combineLatest([
    this.adminservice.schoolData$
      .pipe(
        tap(data => console.log('logiing', data))
      ),
    this.insertedSubjects$
      .pipe(
        // debounceTime(1000),
        tap(data => console.log('logiing from class',data))
      )
]).pipe(
  
  map(([data, individualClass]) => data.map(item => item.classGroup.find(items => items.class === individualClass).subjects)),
  map(info => info[0]) ,
  tap(final => console.log(final))
)

  constructor(private fb: FormBuilder, private adminservice: AdminService, private authservice: AuthService) { }

  ngOnInit(): void {
    this.teacherRegisterForm = this.fb.group({
      status: ['', [Validators.required]],
      classTeacher: ['', [Validators.required]],
      subjectGroup : this.fb.array(
       [this.buildClasses])
    })
    this.teacherRegisterForm.get('status').valueChanges.subscribe(
      value => this.setValidation(value)
    )
    this.teacherRegisterForm.get('subjectGroup').valueChanges.subscribe(res => {
      let _this = this;
      setTimeout(function(){
       _this.setClass(res[0].class)
      },2500)
    })
  
  }

  setValidation(value: string): void{
    const classTeacher = this.teacherRegisterForm.get('classTeacher');
    if(value === 'subject teacher only'){
      //how to disabled a text field to be googled
      classTeacher.disabled;
      classTeacher.clearValidators
    }
    classTeacher.updateValueAndValidity()
  }

  get buildClasses():FormGroup{
    const group = this.fb.group({
      class: ['', [Validators.required]],
      subjects: this.fb.array([ this.buildIndividualSubjects])
    })
    // group.get('class').valueChanges.subscribe(res => this.setClass(res))

    return group
    // this.buildClasses.get('class').valueChanges.subscribe(res => console.log(res))
  }

  get buildIndividualSubjects(): FormGroup{
    return this.fb.group({
      subject:  ['', [Validators.required]]
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
    return <FormArray>this.teacherRegisterForm.get('subjectGroup');
  }

  onSubmit(): void {
    console.log(this.teacherRegisterForm.value)
    if (this.teacherRegisterForm.valid){
     console.log('logging in a funct', this.teacherRegisterForm.value)

      this.authservice.updateRegisterService(this.teacherRegisterForm.value).subscribe(res => console.log(res))
    }
  }

}
