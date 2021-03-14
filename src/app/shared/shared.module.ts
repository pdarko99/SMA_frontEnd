import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { convertToPositionPipe } from './convert-to-position.pipe';
import { convertToGradesPipe } from './convert-to-grades.pipe';



@NgModule({
  declarations: [
    convertToGradesPipe,
    convertToPositionPipe

  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    convertToPositionPipe,
    convertToGradesPipe

  ]
})
export class SharedModule { }
