import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  delete = false
  constructor(public dialogRef: MatDialogRef<AccountDetailsEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.currentStudent = this.data
    this.amount.paid = this.data.fees.paid
  }

  onSubmit(): void {
    console.log('hey')
    this.closeDialog();
  }

  onDelete(): void {
    this.delete = true
    this.closeDialog()
  }

  closeDialog() {
    this.dialogRef.close({
      event: 'close', data : {data: this.amount, id: this.currentStudent._id, delete: this.delete}
    })
  }


}
