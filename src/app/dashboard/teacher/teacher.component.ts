import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  teachersData = this.authservice.UserObject
  constructor(private authservice:AuthService) { }

  ngOnInit(): void {
    console.log(this.teachersData)
  }

  onSelected(data: string){
    console.log(data)
  }
  

}
