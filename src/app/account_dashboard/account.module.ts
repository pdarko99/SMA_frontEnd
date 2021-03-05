import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { PaymentComponent } from './payment/payment.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AccountComponent,
    AccountDetailsComponent,
    PaymentComponent
  ],
  imports: [
    RouterModule.forChild([
      // { path: 'user/account', component: AccountComponent, children: [
        {
          path: 'class', component: AccountDetailsComponent
        }
      // ]},
    ]),
    SharedModule
  ]
})
export class AccountModule { }
