import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { marks } from 'src/app/shared/marksClass';
import { students } from 'src/app/shared/studentsClass';
import { ClassDetailsService } from '../class-details.service';

@Component({
  selector: 'app-add-marks',
  templateUrl: './add-marks.component.html',
  styleUrls: ['./add-marks.component.css']
})
export class AddMarksComponent implements OnInit {
  studentsData: students[];
  currentStudent: students;
  get currentClass(): string{
    return this._currentClass
  }
  set currentClass(value: string){
    this._currentClass = value;
    this.classdetails.getClassData(this.currentClass).subscribe(
      res => {
        this.studentsData = res
        this.currentStudent = this.studentsData[0]
        console.log(this.currentStudent)
        console.log(this.studentsData[0], 'hey fooling around lets see if it works')
      },
      err => console.log(err)
    )
  }
  _currentClass: string;
  subject: string;
  count = 0;

  marks = {
    classScore: '',
    examScore: '',
    totalScore: 0
  }

  constructor(private route: ActivatedRoute, private classdetails: ClassDetailsService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentClass = params.class
    })
    this.route.params.subscribe(subject => {
      this.subject = subject.subject
    })
  }

  nextStudent(): void{
    this.count +=1;
    console.log(this.studentsData[this.count])
    this.currentStudent = this.studentsData[this.count]
  }

  previousStudent(): void {
    this.count -= 1;
    console.log(this.studentsData[this.count])
    this.currentStudent = this.studentsData[this.count]

  }

  onSubmit(): void {
    // this.classdetails.subject = this.subject;
    // this.classdetails.class = this.currentClass;
    // this.classdetails.id = this.currentStudent._id
    // console.log(this.marks)
    this.preSubmit();
    this.classdetails.sendMarks(this.marks).subscribe(
      res => console.log(res)
      // err => console.log(err)
    )
    this.nextStudent()
  }

  preSubmit(): void {
    this.classdetails.subject = this.subject;
    this.classdetails.class = this.currentClass;
    this.classdetails.id = this.currentStudent._id
    this.marks.totalScore = (+this.marks.classScore) + (+this.marks.examScore) 
  }
}
