import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  message = 'Hello, glad to hear from you'
  feedback = {
    username: '',
    text: ''
  };
  
    constructor(private adminservice: AdminService,public dialogRef: MatDialogRef<FeedbackComponent> ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.adminservice.sendFeedback(this.feedback).subscribe(
      res => {
        this.message = 'Thank You'
        this.closeDialog()
      }
    )
  }

  closeDialog() {
    this.dialogRef.close({
      event: 'close'
    })
  }
}
