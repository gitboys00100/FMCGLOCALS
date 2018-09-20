import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import {
    RemittanceComponent,
    RemittanceReceivablesComponent,
    PurchaseOrderComponent
} from './index';

const remittanceRoutes: Routes = [
    { path: 'remittance', component: RemittanceComponent, children: [
        { path: '', redirectTo: 'receivables', pathMatch: 'full'},
        { path: 'receivables', component: RemittanceReceivablesComponent },
        { path: 'purchaseorder', component: PurchaseOrderComponent}
    ]}
];

@NgModule({
    imports: [ RouterModule.forChild(remittanceRoutes) ],
    exports: [ RouterModule]
})
export class RemittanceRoutingModule {}
