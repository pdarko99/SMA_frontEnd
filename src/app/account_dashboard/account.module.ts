import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { PaymentComponent } from './payment/payment.component';
import { SharedModule } from '../shared/shared.module';
import { AccountDetailsEditComponent } from './account-details-edit/account-details-edit.component';
import { AboutAccountComponent } from './about-account/about-account.component';



@NgModule({
  declarations: [
    AccountComponent,
    AccountDetailsComponent,
    PaymentComponent,
    AccountDetailsEditComponent,
    AboutAccountComponent
  ],
  imports: [
    RouterModule.forChild([
      // { path: 'user/account', component: AccountComponent, children: [
        {
          path: 'class', component: AccountDetailsComponent
        },
        {
          path: 'aboutAccount', component: AboutAccountComponent
        }
      // ]},
    ]),
    SharedModule
  ]
})
export class AccountModule { }
