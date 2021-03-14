import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-head-registration',
  templateUrl: './head-registration.component.html',
  styleUrls: ['./head-registration.component.css']
})
export class HeadRegistrationComponent implements OnInit {

  headRegistrationForm: FormGroup
  constructor(private fb: FormBuilder, private adminservice: AdminService) { }

  ngOnInit(): void {
      this.headRegistrationForm = this.fb.group({
        teachers: ['', [Validators.required]],
        headmasters: ['', [Validators.required]],
        accounts: ['', [Validators.required]],
        classGroup: this.fb.array([ this.buildclasses])
      })
  }

  get buildclasses(): FormGroup {
    return this.fb.group({
      class: ['', [Validators.required]],
      subjects: this.fb.array([ this.buildIndividualSubjects])
    })
  }

  get buildIndividualSubjects(): FormGroup {
    return this.fb.group({
      subject: ['', [Validators.required]]
    })
  }

  addIndividualSubjects(subs): void {
    subs.get('subjects').push(this.buildIndividualSubjects)
  }

  get classes(): FormArray{
    return <FormArray>this.headRegistrationForm.get('classGroup')
  }

  addClasses(): void {
    this.classes.push(this.buildclasses)
  }

  onSubmit(): void{
    // console.log(this.headRegistrationForm.value)
    if(this.headRegistrationForm.valid){
      this.adminservice.submitData(this.headRegistrationForm.value).subscribe(
        res => console.log(res),
        err => console.log(err)
      )
    }
  }

}
