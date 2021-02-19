import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { marks } from 'src/app/shared/marksClass';
import { students } from 'src/app/shared/studentsClass';
import { subjectMarks } from 'src/app/shared/subjectMarks';
import { ClassDetailsService } from '../class-details.service';

@Component({
  selector: 'app-subject-marks',
  templateUrl: './subject-marks.component.html',
  styleUrls: ['./subject-marks.component.css']
})
export class SubjectMarksComponent implements OnInit {
  studentsData: students[]
  get currentClass(): string{
    return this._currentClass
  }
  
  set currentClass(value: string){
    this._currentClass = value;
    this.classdetails.getClassData(this.currentClass)
    .subscribe(
      res => {
        this.studentsData = res;
        console.log(this.studentsData)
      },
      err => console.log(err)
    )

  }
  _currentClass: string;
   


  get subject(): string {
    return this._subject
  }
  set subject(value: string){
    this._subject = value
    // this.marks = this.studentsData.filter(x => x.tamale.filter(y => y.subjects === this._subject))
    // this.marks = this.studentsData[0].academy.filter(x => x.subjects === this._subject )
    

  }
  _subject: string;
  _index: number;

  get index(): number{
    return  this._index
  }
  set(value: number){
    this._index = value
  }
  
  constructor(private route: ActivatedRoute, private classdetails: ClassDetailsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(subject => {
      this.subject = subject.subject
    })

    this.route.queryParams.subscribe(params => {
      this.currentClass = params.class
    })
  }

  // myFunc(): void{
  //   this.studentsData.forEach(element => {
  //       element.academy.forEach((ele, index) => {
  //         if (ele.subjects = this._subject){
  //            this.marks[index].classScore = ele.classScore
  //            this.marks[index].examScore = ele.examsScore
  //         }
  //       })
  //   });
  // }

  // myFunc(item, index): void{
  //         this.studentsData[index].firstname = item.firstname
  //         this.studentsData[index].lastname = item.lastname
  //         this.studentsData[index].classScore = item.classScore
  //         this.studentsData[index].examsScore = item.examsScore
  //         this.studentsData[index].totalScore = item.totalScore
  // }

}
