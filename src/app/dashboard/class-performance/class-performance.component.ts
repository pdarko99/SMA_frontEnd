import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-class-performance',
  templateUrl: './class-performance.component.html',
  styleUrls: ['./class-performance.component.css']
})
export class ClassPerformanceComponent implements OnInit {
  //this data should have been fetched from the backend it would be done in next updates :)
  rangeOfGrades = [
    {
      start: 80,
      end: 100,
      grade: 'A'
    },
    {
      start: 70,
      end: 79,
      grade: 'B'
    },
    {
      start: 40,
      end: 69,
      grade: 'C'
    },
    {
      start: 0,
      end: 39,
      grade: 'F'
    }
  ]
  gradesOfStudents = []
  rating: number
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    this.stdentsInfo(this.rangeOfGrades)

  }

  stdentsInfo(grades): any {
    grades.forEach(element => {
      let count = this.data.data.filter((i) => {
        return (i[this.data.subject]?.totalScore >= element.start &&  i[this.data.subject].totalScore <= element.end) 
      })
      this.gradesOfStudents.push({grade: element.grade, number: count.length})
    });
    return this.gradesOfStudents
  }


  // Moved to head dashboard
  // totalMarks(): number{
  //   let sum = this.data.data
  //   let acc = 0
  //   sum.forEach(element => {
  //     if(element[this.data.subject])
  //        acc += element[this.data.subject].totalScore
  //   });

  //   return acc
 
  // }

  // calcPerformance(): number{
  //   let accMarks = this.totalMarks()
  //   let lengthOfClass = this.data.data.length
  //   let performance = (accMarks / (lengthOfClass * 100)) * 100 
  //   return performance

  // }

}
