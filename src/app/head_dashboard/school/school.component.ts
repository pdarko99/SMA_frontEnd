import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {
  headRegistrationForm: FormGroup;
  data: any
  constructor(private fb: FormBuilder, private adminservice: AdminService) { }

  ngOnInit(): void {
    this.headRegistrationForm = this.fb.group({
      teachers: '',
      headmasters: '',
      accounts: '',
      classGroup: this.fb.array([ this.buildclasses])
    })

    this.adminservice.schoolData$
    .pipe(map(data => data[0]))
    .subscribe(
      res => {
        this.data = res;
        // console.log(this.data)
        this.UpdateForm();

      }
      // res => console.log(res)
    )
  }

  UpdateForm(): void {
    this.clearFormArray()
    this.data.classGroup.forEach(element => {
      let availableClass: FormGroup = this.buildclasses;
      this.classes.push(availableClass)
      // this.setClass(element.class)


       element.subjects.forEach((ele, index) => {
            (availableClass.get('subjects') as FormArray).push(this.buildIndividualSubjects)
            // this.addIndividualSubs(teacher)
            console.log(index, 'from index')
            console.log(ele, 'from elel')

        });

    

    });

    this.headRegistrationForm.patchValue(this.data)
  }

  clearFormArray(): void {
    this.classes.clear()
  }

  get buildclasses(): FormGroup {
    return this.fb.group({
      class: '',
      subjects: this.fb.array([ this.buildIndividualSubjects])
    })
  }

  get buildIndividualSubjects(): FormGroup {
    return this.fb.group({
      subject: ''
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
    // if(this.headRegistrationForm.valid){
    //   this.adminservice.submitData(this.headRegistrationForm.value).subscribe(
    //     res => console.log(res),
    //     err => console.log(err)
    //   )
    // }
  }

}
