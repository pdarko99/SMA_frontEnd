import { NgModule } from '@angular/core';
import { FeedbackComponent } from '../../feedback/feedback/feedback.component'
import { SharedModule } from '../../shared/shared.module';




@NgModule({
  declarations: [
    FeedbackComponent
  ],
  imports: [
    SharedModule
  ]
})
export class FeedbackModule { }
