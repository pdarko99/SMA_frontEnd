import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ClassDetailsService } from 'src/app/dashboard/class-details.service';
import { account, students } from 'src/app/shared/studentsClass';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  studentsData: students[]
  currentStudent: students
  currentClass: string;

  amount: account = {
    paid: 0
  }
  
  count = 0;
  constructor(public dialogRef: MatDialogRef<PaymentComponent>, private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: students[], private classdetails: ClassDetailsService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentClass = params.class
      console.log(this.currentClass)
   })

    this.studentsData = this.data;
    this.currentStudent = this.studentsData[0]
    console.log(this.studentsData)
  }

  onSubmit(): void {
    console.log(this.amount)
    this.preSubmit();
    this.classdetails.sendFees(this.amount).subscribe(
      res =>{ console.log(res); this.closeDialog()}
    )
    // this.nextStudent();
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

    preSubmit(): void {
    this.classdetails.class = this.currentClass;
    this.classdetails.id = this.currentStudent._id
  }

  closeDialog() {
    
    this.dialogRef.close({
      event: 'close', data : {data: this.amount, id: this.currentStudent._id}
    })
  }


}
