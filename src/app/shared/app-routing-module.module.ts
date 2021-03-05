import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { AccountComponent } from '../account_dashboard/account/account.component';
import { HeadieDetailsComponent } from '../head_dashboard/headie-details/headie-details.component';
import { TeacherComponent } from '../dashboard/teacher/teacher.component';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: 'user/account', canLoad: [AuthGuard], component: AccountComponent, data: { claimType: 'account'},
          loadChildren: () => 
            import ('../account_dashboard/account.module').then(m => m.AccountModule)
      },
      {
        path: 'user/head', canLoad: [AuthGuard], component: HeadieDetailsComponent, data: { claimType: 'head'},
          loadChildren: () => 
            import('../head_dashboard/head.module').then(m => m.HeadModule)
      },
      {
        path: 'user/teacher', canLoad: [AuthGuard], component: TeacherComponent, data: { claimType: 'teacher'},
          loadChildren: () => 
            import('../dashboard/teacher.module').then(m => m.TeacherModule)
      }
 
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModuleModule { }
