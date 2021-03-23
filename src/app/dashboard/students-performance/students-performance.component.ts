import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { students } from 'src/app/shared/studentsClass';

@Component({
  selector: 'app-students-performance',
  templateUrl: './students-performance.component.html',
  styleUrls: ['./students-performance.component.css']
})
export class StudentsPerformanceComponent implements OnInit {
  students: students[]
  oneStd: students
  count = 0
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    // this.performance(this.count)
    // this.students = this.data.data
    // console.log(this.students)
    this.data.data.subscribe(
    res => {this.students = res
    console.log(this.students)}

    )
    console.log(this.students)
    // this.students = this.data.data
    // this.oneStd = this.students[0]
    // console.log(this.students)
    // console.log(this.oneStd)
    // this.students.forEach(ele => {
    //   console.log(ele, 'from lelelelelelel')
    // })
  }

  lengthOfSubs(subs): number {
    let i = 0;
    subs.forEach((element) => {
      element.forEach((ele) => {
        i++
      });
    });
    return i - 1
  }

  // performance(count): void{
  //   // console.log(this.data.data)
  //   this.data.data.forEach(element => {
  //     // console.log(element[1])
  //     this.students = element[count]
  //     // this.students.push(element)
  //     // console.log(element)
  //     // this.students.push(element)
  //     // element.forEach(ele => {
  //     //   // console.log(ele)
  //     // this.students.push(ele)

  //     // });
  //     console.log(this.students.grandScore)
  //   });

  //   // console.log(this.students)
  //   // console.log(this.students.length)
    
  // }

}
