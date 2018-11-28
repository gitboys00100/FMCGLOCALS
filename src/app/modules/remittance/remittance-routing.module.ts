import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';


import {
    RemittanceComponent,
    RemittanceReceivablesComponent,
    PurchaseOrderComponent
} from './index';

const remittanceRoutes: Routes = [
    { path: 'remittance', component: RemittanceComponent, children: [
        { path: '', redirectTo: 'receivables', pathMatch: 'full',
        canActivate: [AuthGuard]},
        { path: 'receivables', component: RemittanceReceivablesComponent,
        canActivate: [AuthGuard] },
        { path: 'purchaseorder', component: PurchaseOrderComponent,
        canActivate: [AuthGuard]}
    ]}
];

@NgModule({
    imports: [ RouterModule.forChild(remittanceRoutes) ],
    exports: [ RouterModule]
})
export class RemittanceRoutingModule {}
