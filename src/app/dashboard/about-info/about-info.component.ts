import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-about-info',
  templateUrl: './about-info.component.html',
  styleUrls: ['./about-info.component.css']
})
export class AboutInfoComponent implements OnInit {
teacherUpdateForm: FormGroup
  constructor(private fb: FormBuilder, private authservice: AuthService) { }

  ngOnInit(): void {
    this.teacherUpdateForm = this.fb.group({
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    })

    this.authservice.getTeachersData()
    .pipe(map(data => data[0]))
    .subscribe(
      res => this.teacherUpdateForm.patchValue(res)
    )
  }

  onSubmit(): void {
    console.log('not yet implemented')
  }

}
