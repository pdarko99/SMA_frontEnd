import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-about-head',
  templateUrl: './about-head.component.html',
  styleUrls: ['./about-head.component.css']
})
export class AboutHeadComponent implements OnInit {
  // headInfo$ = this.authservice.getTeachersData().pipe(
  //   map(data => data[0]),
  //   tap(datas => console.log(datas))
  // )
  headUpdateForm: FormGroup
  constructor(private authservice: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.headUpdateForm = this.fb.group({
      firstname: '',
      lastname: '',
      email: '',
      password: '******' 
  })

  this.authservice.getTeachersData().pipe(
    map(data => data[0])
  ).subscribe(
    res => this.headUpdateForm.patchValue(res)
  )

}

onSubmit(): void {
  console.log('not yet')
}
  

}
