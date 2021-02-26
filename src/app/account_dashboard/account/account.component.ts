import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AdminService } from 'src/app/head_dashboard/admin.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  schoolData$ = this.adminservice.schoolData$.pipe(
    map(data => data[0].classGroup),
    catchError(err => {
      // this.errMsg = err;
      return EMPTY
    })
 )

  constructor(private adminservice: AdminService) { }

  ngOnInit(): void {
  }

}
