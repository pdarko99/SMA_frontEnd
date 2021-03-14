import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-about-account',
  templateUrl: './about-account.component.html',
  styleUrls: ['./about-account.component.css']
})
export class AboutAccountComponent implements OnInit {

  AccountUpdateForm : FormGroup;
  constructor(private authservice: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.AccountUpdateForm = this.fb.group({
      firstname: '',
      lastname: '',
      email: '',
      password: '******' 
  })

  this.authservice.getTeachersData().pipe(
    map(data => data[0])
  ).subscribe(
    res => this.AccountUpdateForm.patchValue(res)
  )

}

onSubmit(): void {
  console.log('not yet')
}
}
