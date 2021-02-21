import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-headie-details',
  templateUrl: './headie-details.component.html',
  styleUrls: ['./headie-details.component.css']
})
export class HeadieDetailsComponent implements OnInit {
 
  
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
