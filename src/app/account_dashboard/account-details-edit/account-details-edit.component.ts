import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { account, students } from 'src/app/shared/studentsClass';

@Component({
  selector: 'app-account-details-edit',
  templateUrl: './account-details-edit.component.html',
  styleUrls: ['./account-details-edit.component.css']
})
export class AccountDetailsEditComponent implements OnInit {
  currentStudent: students
  amount: account = {
    paid: 0
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.currentStudent = this.data
    this.amount.paid = this.data.fees.paid
  }

  onSubmit(): void {
    console.log('hey')
  }

}
