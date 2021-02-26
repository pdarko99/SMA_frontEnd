import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassDetailsService } from 'src/app/dashboard/class-details.service';
import { students } from 'src/app/shared/studentsClass';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
students: students[]
private _queryClass: string
get queryClass(): string {
  return this._queryClass
}
set queryClass(value: string){
  this._queryClass = value;
  this.classdetails.getClassData(this.queryClass).subscribe(
    res => {
      this.students = res;
      // console.log(this.displayClass)
    },
    err => console.log(err)
  )
}

  constructor(private route: ActivatedRoute, private classdetails: ClassDetailsService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.queryClass = params.class
   })
  }

}
