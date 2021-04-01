import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  combineLatest, EMPTY, Subject } from 'rxjs';
import { catchError, map, pairwise, startWith, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { AdminService } from 'src/app/head_dashboard/admin.service';
import { register } from 'src/app/shared/registerClass';

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
  takenClass:string 
  personalClass: string
  takenSub: string
  set currentClass(value: string){
    this._currentClass = value
  }
  teacherRegisterForm :FormGroup
  errMsg: string;
  staff: register[];
  selectedClasses: string[] = []
  selectedSubs: string[] = []
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
      map(info => info[0])
     
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

    this.teacherRegisterForm.get('classTeacher').valueChanges.subscribe(
        value => {
          const classTeacher = this.teacherRegisterForm.get('classTeacher');
          for (let staff of this.staff){
            if(staff.data?.classTeacher ===value){
              this.takenClass = `${value} has been taken please select another`
              break;
            }else{
              this.takenClass = ''
            }

          }
        }
    )

    this.authservice.getAllStaff().subscribe(
      res => {this.staff = res; }
    )


  
  }
  

  setValidation(value: string): void{
    const classTeacher = this.teacherRegisterForm.get('classTeacher');
    if(value === 'Subject Teacher only'){
      classTeacher.disable()
      classTeacher.clearValidators
    }else{
      classTeacher.enable()
    }
    classTeacher.updateValueAndValidity()
  }

  get buildClasses():FormGroup{
    const group = this.fb.group({
      class: ['', [Validators.required]],
      subjects: this.fb.array([ this.buildIndividualSubjects])
    })
    group.get('class').valueChanges.subscribe(res => {
      this.currentClass = res

     
      if(this.checkClass(this.selectedClasses, res, false))
        return

        let _this = this;
        this.subjectss = setInterval(function(){
           _this.setClass(_this.currentClass)
        },100)
    

    })

    return group
  }

  get buildIndividualSubjects(): FormGroup{
    const group = this.fb.group({
      subject:  ['', [Validators.required]]
    })
    group.get('subject').valueChanges.subscribe(value => {
      if(this.checkClass(this.selectedSubs, value, true))
      return

      let foundSub = this.staff.filter(y => y.data?.subjectGroup.find(x =>
         x.class === this.currentClass)).filter(x => 
          x.data.subjectGroup.find(x => 
            x.subjects.find(y =>
               y.subject === value)))

      if(foundSub.length){
        return this.takenSub = `${value}  has already been taken please select another subject`
      }
      return this.takenSub = ''
        
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
    this.selectedSubs = []
    clearInterval(this.subjectss)
    this.setClass('');
    this.subjects.push(this.buildClasses);
    // this.count +=1
  }

  get subjects(): FormArray {
    return <FormArray>this.teacherRegisterForm.get('subjectGroup');
  }

  removeAtIndex(index): FormArray{
    return this.subjects.at(index).get('subjects') as FormArray
  }

  removeClass(index){
    this.subjects.removeAt(index)
  }

  removeSubject(clas, subject){
    this.removeAtIndex(clas).removeAt(subject)
  }

  checkClass(arr, value, flag): string{
    if(arr.length){
      arr.forEach(element => {
        if(element === value){
          if (flag){
            this.takenSub = `it seems you previously selected ${value}`
          }else{
            this.personalClass =   `it seems you previously selected ${value}`
          }
        }else{
          arr.push(value);
          if(flag){
            this.takenSub = ''
          }else{
            this.personalClass =   ''
          }
        }
      });
    }else{
      arr.push(value)
    }

    return this.personalClass || this.takenSub

  }


  onSubmit(): void {
    clearInterval(this.subjectss)
    if (this.teacherRegisterForm.valid){
      this.authservice.updateRegisterService(this.teacherRegisterForm.value).subscribe(res => this.teacherRegisterForm.reset(this.teacherRegisterForm.value))
    }
    
  }

}
