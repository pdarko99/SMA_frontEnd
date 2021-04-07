import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.css']
})
export class CredentialsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CredentialsComponent>) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close({
      event: 'close'
    })
  }

}
