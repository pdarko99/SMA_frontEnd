import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  registerForm: FormGroup
  constructor(private fb: FormBuilder, private authservice: AuthService) { }

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
  }

  onSubmit(): void{
    if(this.registerForm.valid){
        this.authservice.registerService(this.registerForm.value)
            .subscribe(res => console.log(res),
            err => console.log(err))
    }
  }

}
