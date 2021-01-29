import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-teacher-registration',
  templateUrl: './teacher-registration.component.html',
  styleUrls: ['./teacher-registration.component.css']
})
export class TeacherRegistrationComponent implements OnInit {

  teacherRegisterForm :FormGroup
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.teacherRegisterForm = this.fb.group({
      status: ['', [Validators.required]],
      classTeacher: ['', [Validators.required]],
      subjectGroup : this.fb.group({
        class: ['', [Validators.required]],
        subjects: ['', [Validators.required]]
      }),
      subjectss: this.fb.array([this.buildSubjects])
    })
    this.teacherRegisterForm.get('status').valueChanges.subscribe(
      value => this.setValidation(value)
    )
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

  buildSubjects():FormGroup{
    return this.fb.group({
      class: '',
      subjects: ''
    })
  }

  
  addAddress(): void {
    this.addressess.push(this.buildSubjects())
  }

  get addressess(): FormArray {
    return <FormArray>this.teacherRegisterForm.get('subjectss');
  }

}
