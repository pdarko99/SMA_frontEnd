import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout'

const SMALL_WIDTH_BREAKPOINT = 720;
@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  public isScreenSmall: boolean;
  teachersData = this.authservice.UserObject
  constructor(private authservice:AuthService, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    console.log(this.teachersData);
    this.breakpointObserver.observe([
      `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`
    ]).subscribe(
      (state: BreakpointState) =>  {
        this.isScreenSmall = state.matches
      }
    )
  }

  onSelected(data: string){
    console.log(data)
  }
  

}
