import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { ClassDetailsService } from '../class-details.service';

@Component({
  selector: 'app-students-data',
  templateUrl: './students-data.component.html',
  styleUrls: ['./students-data.component.css']
})
export class StudentsDataComponent implements OnInit {
  teachersData = this.authservice.UserObject
  classData$ = this.classdetails.getClassData(this.teachersData.data.classTeacher).pipe(
    tap(data => console.log(data))
  )
  constructor(private authservice: AuthService,  private classdetails: ClassDetailsService) { }

  ngOnInit(): void {
  }

}
