import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout'
import { Router } from '@angular/router';

const SMALL_WIDTH_BREAKPOINT = 720;
@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  public isScreenSmall: boolean;
  teachersData = this.authservice.UserObject
  constructor(private authservice:AuthService, private breakpointObserver: BreakpointObserver, private router: Router) { }

  ngOnInit(): void {
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

  
  logout(): void{
    localStorage.clear()
    this.router.navigate(['logout'])

  }
  

}
