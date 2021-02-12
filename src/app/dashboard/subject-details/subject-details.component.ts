import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { students } from 'src/app/shared/studentsClass';
import { ClassDetailsService } from '../class-details.service';


@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.css']
})
export class SubjectDetailsComponent implements OnInit {
  studentsData: students[];
  get currentClass(): string{
    return this._currentClass
  }
  set currentClass(value: string){
    this._currentClass = value;
    this.classdetails.getClassData(this.currentClass).subscribe(
      res => {
        this.studentsData = res
        console.log(this.studentsData)
      },
      err => console.log(err)
    )

  }
  _currentClass: string;
  subject: string;
  constructor(private route: ActivatedRoute, private classdetails: ClassDetailsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(subject => {
      this.subject = subject.subject
    })

    this.route.queryParams.subscribe(params => {
      this.currentClass = params.class
    })

  }

}
