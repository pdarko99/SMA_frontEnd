import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeadieDetailsComponent } from './headie-details/headie-details.component';
import { StudentsDataComponent } from '../dashboard/students-data/students-data.component';
import { HeadmasterComponent } from '../headmaster/headmaster.component';
import { MaterialModule } from '../shared/material.module';




@NgModule({
  declarations: [
    HeadmasterComponent,
    HeadieDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([
      // { path: 'user/head', component: HeadieDetailsComponent, children: [
        {
          path: 'class', component: StudentsDataComponent
        }
      // ]},
    ])
  ]
})
export class HeadModule { }
