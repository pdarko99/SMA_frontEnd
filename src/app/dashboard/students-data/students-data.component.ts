import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { AdminService } from 'src/app/head_dashboard/admin.service';
import { students } from 'src/app/shared/studentsClass';
import { ClassDetailsService } from '../class-details.service';


//  THIS COMPONENT IS USED BY TWO DIFFERENT MODULES (for teacher and head)


@Component({
  selector: 'app-students-data',
  templateUrl: './students-data.component.html',
  styleUrls: ['./students-data.component.css']
})
export class StudentsDataComponent implements OnInit {
  // displayClass = true;
  teachersData = this.authservice.UserObject || null
  classData$ = this.classdetails.getClassData(this.teachersData.data?.classTeacher ).pipe(
    tap(data => console.log(data))
  )

  // for headMaster Component
headClass: students[]
private _queryClass: string
get queryClass(): string {
  return this._queryClass
}
set queryClass(value: string){
  this._queryClass = value;
  this.classdetails.getClassData(this.queryClass).subscribe(
    res => {
      this.headClass = res;
      // console.log(this.displayClass)
    },
    err => console.log(err)
  )
}
// end of headMaster Component

  subjects$ = this.adminservice.schoolData$
  .pipe(
    map(data=> data.map(item => item.classGroup.find(items => items.class === this.teachersData.data?.classTeacher || this.queryClass)?.subjects)),
    tap(info => console.log(info, 'consoleo from current info'))
  )
  constructor(private route: ActivatedRoute, private authservice: AuthService, private adminservice: AdminService,  private classdetails: ClassDetailsService) { }

  ngOnInit(): void {
     this.route.queryParams.subscribe(params => {
       this.queryClass = params.class
    })
  }
}
