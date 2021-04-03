import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackComponent } from '../feedback/feedback.component';

const SMALL_WIDTH_BREAKPOINT = 720;
@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  public isScreenSmall: boolean;
  teachersData = this.authservice.UserObject
  constructor(private authservice:AuthService, private breakpointObserver: BreakpointObserver, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.teachersData);
    this.breakpointObserver.observe([
      `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`
    ]).subscribe(
      (state: BreakpointState) =>  {
        this.isScreenSmall = state.matches
      }
    )
    console.log(localStorage.getItem('userInfo') )
  }

  onSelected(data: string){
    console.log(data)
  }

  openFeedback(): void{
    const dialogRef = this.dialog.open(FeedbackComponent, {
      width: '40%',
      height: '60%'
     
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      
    });
  }

  logout(): void{
    localStorage.clear()
    this.router.navigate(['login'])

  }
  

}
