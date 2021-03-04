import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AdminService } from 'src/app/head_dashboard/admin.service';


const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  public isScreenSmall: boolean;

  schoolData$ = this.adminservice.schoolData$.pipe(
    map(data => data[0].classGroup),
    catchError(err => {
      // this.errMsg = err;
      return EMPTY
    })
 )

  constructor(private adminservice: AdminService, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.breakpointObserver.observe([
      `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`
    ]).subscribe(
      (state: BreakpointState) =>  {
        this.isScreenSmall = state.matches
      }
    )
  }



}


