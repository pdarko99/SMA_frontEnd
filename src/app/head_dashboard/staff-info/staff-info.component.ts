import { Component, OnInit } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { scan, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { register } from 'src/app/shared/registerClass';

@Component({
  selector: 'app-staff-info',
  templateUrl: './staff-info.component.html',
  styleUrls: ['./staff-info.component.css']
})
export class StaffInfoComponent implements OnInit {
  private deletedObject = new Subject<register>();
  deletedObjectAction$ = this.deletedObject.asObservable();
  allStaff$ = this.authservice.getAllStaff().pipe(
    tap(data => console.log(data))
  )

  combinedStaffWithDeleted$ = merge(
    this.allStaff$,
    this.deletedObjectAction$
  ).pipe(
    scan((staff: register[], staf: register) => this.modifyStaff(staff, staf))
  )
  displayColumns = ['firstname', 'lastname', 'email', 'position', 'delete']
  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
  }

  modifyStaff(staff: register[], staf: register): register[]{
    let index = staff.findIndex(person => person._id === staf._id);
    staff.splice(index, 1);
    return [...staff]
  }

  onDelete(element: register): void {
    this.authservice.deleteStaff(element._id).subscribe(
      res => {
        this.deletedObject.next(element);
      }
    )
  }

}
