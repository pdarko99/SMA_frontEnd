import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackComponent } from 'src/app/feedback/feedback/feedback.component';


const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  feedback: boolean
  isScreenSmall: boolean

  constructor(public dialog: MatDialog, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.breakpointObserver.observe([
      `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`
    ]).subscribe(
      (state: BreakpointState) =>  {
        this.isScreenSmall = state.matches
      }
    )
  }

  openFeedback(): void{
    const dialogRef = this.dialog.open(FeedbackComponent, {
      // width: '70%',
      width: this.isScreenSmall ? '70%' : '40%',
      height: '60%'
     
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      
    });
  }

}



