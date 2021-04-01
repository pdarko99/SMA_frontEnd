import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ClassDetailsService } from 'src/app/dashboard/class-details.service';
import { AdminService } from 'src/app/head_dashboard/admin.service';
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
inputValue: string
// approvedFees = this.adminservice.schoolData$.pipe(
//   map(data => data.map(data => data.approvedFees))
// ) 

approvedFees = 1000.00
private _queryClass: string;
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

  constructor(private route: ActivatedRoute, private classdetails: ClassDetailsService, public dialog: MatDialog, private adminservice: AdminService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.queryClass = params.class
   })
  }

  openDialog() {
    const dialogRef = this.dialog.open(PaymentComponent, {
      width: '50%',
      height: '60%',
      data: this.students,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result.data.dirty){
        let index: number = this.students.findIndex(student => student._id === result.data.id)
        this.students[index].fees = {}
        this.students[index].fees.paid = result.data.data.paid
      }

      // this.students[index].fees = result.data.data.paid
      
    });
  }

  openEditDialog(element: students) {
    const dialogRef = this.dialog.open(AccountDetailsEditComponent, {
      width: '50%',
      height: '60%',
      data: element,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(!result.data.delete){
        let index: number = this.students.findIndex(student => student._id === result.data.id)
        this.students[index].fees.paid = result.data.data.paid
        return
      }




      
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.inputValue = filterValue;
    // console.log(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
