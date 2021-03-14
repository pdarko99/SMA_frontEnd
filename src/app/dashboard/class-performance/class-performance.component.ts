import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    console.log(this.data.data)
    console.log(this.data.subject)
    this.stdentsInfo(this.rangeOfGrades)
    console.log(this.gradesOfStudents, 'from grades of stuf')

  }

  stdentsInfo(grades): any {
    grades.forEach(element => {
      let count = this.data.data.filter((i) => {
        return (i[this.data.subject]?.totalScore > element.start &&  i[this.data.subject].totalScore < element.end) 
      })
      console.log(element.grade, count.length)
      this.gradesOfStudents.push({grade: element.grade, number: count.length})
      
    });
    return this.gradesOfStudents
  }

}
