import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { AdminService } from 'src/app/head_dashboard/admin.service';
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
  subjects$ = this.adminservice.schoolData$
  .pipe(
    map(data=> data.map(item => item.classGroup.find(items => items.class === this.teachersData.data.classTeacher).subjects)),
    tap(info => console.log(info, 'consoleo from current info'))
  )
  constructor(private authservice: AuthService, private adminservice: AdminService,  private classdetails: ClassDetailsService) { }

  ngOnInit(): void {
  }

}
