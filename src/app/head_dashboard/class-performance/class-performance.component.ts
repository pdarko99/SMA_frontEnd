import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { filter, map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-class-performance',
  templateUrl: './class-performance.component.html',
  styleUrls: ['./class-performance.component.css']
})
export class ClassPerformanceComponent implements OnInit {
 subjects: string[]
 ranges: any[] = [];
 teachersWithsubs : any[] = []
  
 constructor(@Inject(MAT_DIALOG_DATA) public data: any, private authservice: AuthService) { }

  ngOnInit(): void {
    this.calcPerf(this.data.subjects)

    this.teachersWithSubjects(this.data.subjects)
  }




  calcPerf(subjects): void {
    subjects.forEach((element) => {
      element.forEach(ele => {
        let acc = 0
          this.data.data.forEach(stu => {
             if(stu[ele])
             acc += stu[ele].totalScore
            });
            let totalScore = this.calcPerformance(acc)
            this.ranges.push({subject: ele, acc: totalScore})
        
      });
   
    });
  }

  teachersWithSubjects(subjects): void {
    subjects.forEach(element => {
      element.forEach(ele => {
        this.authservice.getAllStaff().pipe(
          map(info => info.filter(y => y.data?.subjectGroup.find(x => x.class === this.data.clas)).filter(x => x.data.subjectGroup.find(x => x.subjects.find(y => y.subject === ele))))
        ).subscribe(
          res => {
              this.teachersWithsubs.push({subject: ele, firstname: res[0]?.firstname, lastname: res[0]?.lastname})
          }
        )
      });
    });
  }


      calcPerformance(acc): number{
        let lengthOfClass = this.data.data.length
        let performance = (acc / (lengthOfClass * 100)) * 100 
        return performance
    
      }


  


}
