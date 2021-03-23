import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  combineLatest, EMPTY, Subject } from 'rxjs';
import { catchError, map, pairwise, startWith, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { AdminService } from 'src/app/head_dashboard/admin.service';

@Component({
  selector: 'app-teacher-registration',
  templateUrl: './teacher-registration.component.html',
  styleUrls: ['./teacher-registration.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeacherRegistrationComponent implements OnInit {
  private _currentClass: string;
  get currentClass(): string{
    return this._currentClass
  }

  subjectss: any
  _count = 0
  get count(): number{
    return this._count
  }

  set count(value: number){
    this._count = value
  }

  set currentClass(value: string){
    this._currentClass = value
  }
  teacherRegisterForm :FormGroup
  errMsg: string;
  private classSubjects = new Subject<string>();
  insertedSubjects$ = this.classSubjects.asObservable();

    teachersData$ = this.adminservice.schoolData$.pipe(
    map(data => data[0].classGroup),
    catchError(err => {
      this.errMsg = err;
      return EMPTY
    })
 )

  classWithSubjects$ = combineLatest([
    this.adminservice.schoolData$,
    this.insertedSubjects$
])
.pipe(
      map(([data, individualClass]) => data.map(item => item.classGroup.find(items => items.class === individualClass).subjects)),
      map(info => info[0]) ,
      tap(finalinfo => console.log(finalinfo))
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
    group.get('class').valueChanges.subscribe(res => {
   
      let _this = this;
      this.currentClass = res
      this.subjectss = setInterval(function(){
         _this.setClass(res)
      },2500)
    })

    return group
  }

  get buildIndividualSubjects(): FormGroup{
    const group = this.fb.group({
      subject:  ['', [Validators.required]]
    })
    return group
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
    // this.count +=1
  }

  get subjects(): FormArray {
    return <FormArray>this.teacherRegisterForm.get('subjectGroup');
  }

  onSubmit(): void {
    clearInterval(this.subjectss)
    console.log(this.teacherRegisterForm.value, 'from thes.value')
    if (this.teacherRegisterForm.valid){
     console.log('logging in a funct', this.teacherRegisterForm.value)

      this.authservice.updateRegisterService(this.teacherRegisterForm.value).subscribe(res => console.log(res))
    }
  }

}
