import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ClassDetailsService } from 'src/app/dashboard/class-details.service';
import { students } from 'src/app/shared/studentsClass';
import { AccountDetailsEditComponent } from '../account-details-edit/account-details-edit.component';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
students: students[]
private _queryClass: string
get queryClass(): string {
  return this._queryClass
}
set queryClass(value: string){
  this._queryClass = value;
  this.classdetails.getClassData(this.queryClass).subscribe(
    res => {
      this.students = res;
      this.dataSource = new MatTableDataSource<students>(this.students)
    },
    err => console.log(err)
  )
}


displayColumns = ['firstname', 'lastname', 'paid', 'arrears', 'edit']
dataSource : MatTableDataSource<students>

  constructor(private route: ActivatedRoute, private classdetails: ClassDetailsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.queryClass = params.class
   })
  }

  openDialog() {
    const dialogRef = this.dialog.open(PaymentComponent, {
      width: '50%',
      height: '40%',
      data: this.students
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openEditDialog(element: students) {
    const dialogRef = this.dialog.open(AccountDetailsEditComponent, {
      width: '50%',
      height: '40%',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
