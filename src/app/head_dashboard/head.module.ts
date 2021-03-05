import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeadieDetailsComponent } from './headie-details/headie-details.component';
import { HeadmasterComponent } from '../headmaster/headmaster.component';
import { SharedModule } from '../shared/shared.module';
import { HeadStudentsDataComponent } from './head-students-data/head-students-data.component';




@NgModule({
  declarations: [
    HeadmasterComponent,
    HeadieDetailsComponent,
    HeadStudentsDataComponent
  ],
  imports: [
    RouterModule.forChild([
      // { path: 'user/head', component: HeadieDetailsComponent, children: [
        {
          path: 'class', component: HeadStudentsDataComponent
        }
      // ]},
    ]),
    SharedModule
  ]
})
export class HeadModule { }
