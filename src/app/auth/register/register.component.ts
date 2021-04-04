import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AdminService } from 'src/app/head_dashboard/admin.service';
import { admin } from 'src/app/shared/adminClass';
import { User } from 'src/app/shared/userClass';
import { AuthService } from '../auth.service';


function passwordMatcher(c: AbstractControl): { [key:string]: boolean } | null {
  
  const passwordControl = c.get('password');
  const confirmPassword = c.get('confirmPassword');

  if (passwordControl.pristine || confirmPassword.pristine){
    return null;
  }
  if (passwordControl.value === confirmPassword.value){
    return null
  }
  return {'match': true}
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  teachersData: admin[]
  UserObject: User = null
  registerForm: FormGroup
  constructor(private fb: FormBuilder, private authservice: AuthService, private router: Router, private adminservice: AdminService) { }

  ngOnInit(): void {
    this.registerForm =  this.fb.group({
      firstname : ['', [Validators.required, Validators.minLength(3)]],
      lastname : ['', [Validators.required, Validators.minLength(3)]],
      email : ['', [Validators.required, Validators.email]],
      passwordGroup : this.fb.group({
      password : ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword : ['', [Validators.required, Validators.minLength(6)]]
      }, {validators: passwordMatcher}),
      position:''
      
    })

   this.adminservice.schoolData$.subscribe(
     res => this.teachersData = res
   )
  }
  


  onSubmit(): void{
    if(this.registerForm.valid){
        this.authservice.registerService(this.registerForm.value)
            .subscribe(res => {
              this.UserObject = res;
              this.authservice.UserObject = res;
              localStorage.setItem('userInfo', JSON.stringify(res))
              if (res.position === 'teacher'){
                if(res.data){
                  return  this.router.navigate([`user/${res.position}`])
                }
                return this.router.navigate(['teacher/registration'])
              }
              if(res.position === 'head'){
                  if(this.teachersData[0] !== null){
                    return this.router.navigate([`user/${res.position}`])
                  }
                 return this.router.navigate(['head/registration'])

              }
              this.router.navigate([`user/${res.position}`])
            },
            err => console.log(err))
    }
  }

}
