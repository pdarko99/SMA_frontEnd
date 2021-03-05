import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { PaymentComponent } from './payment/payment.component';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AccountComponent,
    AccountDetailsComponent,
    PaymentComponent
  ],
  imports: [
    // CommonModule,
    // FormsModule,
    // ReactiveFormsModule,
    // MaterialModule,
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
