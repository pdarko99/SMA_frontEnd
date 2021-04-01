import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  @ViewChild(NgForm) editForm: NgForm

  get isDirty(): boolean {
    return this.editForm.dirty ? true : false
  }
  studentsData: students[]
  currentStudent: students
  currentClass: string;

  amount: account = {
    paid: null
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
      event: 'close', data : {data: this.amount, id: this.currentStudent._id, dirty: this.isDirty}
    })
  }


}
