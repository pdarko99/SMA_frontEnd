import { NgModule } from '@angular/core';
import { NgxChartsModule } from "@swimlane/ngx-charts"

import { RouterModule } from '@angular/router';
import { HeadieDetailsComponent } from './headie-details/headie-details.component';
import { HeadmasterComponent } from '../headmaster/headmaster.component';
import { SharedModule } from '../shared/shared.module';
import { HeadStudentsDataComponent } from './head-students-data/head-students-data.component';
import { AboutHeadComponent } from './about-head/about-head.component';
import { SchoolComponent } from './school/school.component';
import { StaffInfoComponent } from './staff-info/staff-info.component';
import { ClassPerformanceComponent } from './class-performance/class-performance.component';
import { FeedbackComponent } from './feedback/feedback.component';


@NgModule({
  declarations: [
    HeadmasterComponent,
    HeadieDetailsComponent,
    HeadStudentsDataComponent,
    AboutHeadComponent,
    SchoolComponent,
    StaffInfoComponent,
    ClassPerformanceComponent,
    FeedbackComponent,
  ],
  imports: [
    NgxChartsModule,
    RouterModule.forChild([
      // { path: 'user/head', component: HeadieDetailsComponent, children: [
        {
          path: 'class', component: HeadStudentsDataComponent
        },
        {
          path: 'aboutHead', component: AboutHeadComponent
        },
        {
          path: 'school', component: SchoolComponent
        },
        {
          path: 'staffInfo', component: StaffInfoComponent
        }
    ]),
    SharedModule
  ]
})
export class HeadModule { }
