import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AdminService } from 'src/app/head_dashboard/admin.service';

@Component({
  selector: 'app-teacher-registration',
  templateUrl: './teacher-registration.component.html',
  styleUrls: ['./teacher-registration.component.css']
})
export class TeacherRegistrationComponent implements OnInit {

  teacherRegisterForm :FormGroup
  errMsg: string;


  teachersData$ = this.adminservice.schoolData$.pipe(
    catchError(err => {
      this.errMsg = err;
      return EMPTY
    })
 )


  constructor(private fb: FormBuilder, private adminservice: AdminService) { }

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

    // this.teacherRegisterForm.get('subjectGroup.class').valueChanges.subscribe(
    //   value => this.setClass(value)
    // )
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
    return this.fb.group({
      class: ['', [Validators.required]],
      subjects: this.fb.array([ this.buildIndividualSubjects])
    })
  }

  get buildIndividualSubjects(): FormGroup{
    return this.fb.group({
      subject:  ['', [Validators.required]]
    })
  }

  setClass(data:string): void{
    this.adminservice.selectedClass(data)
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
  }

}
