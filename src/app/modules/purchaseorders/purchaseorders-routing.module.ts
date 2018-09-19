import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    PurchaseOrderComponent,
    PoComponent
} from './index';

const poRoutes: Routes = [
    { path: 'purchaseorder', component: PurchaseOrderComponent, children: [
        { path: '', redirectTo: 'orders', pathMatch: 'full' },
        { path: 'orders', component: PoComponent }
    ]}
];

@NgModule({
    imports: [ RouterModule.forChild(poRoutes) ],
    exports: [ RouterModule ]
})
export class PurchaseOrderRoutingModule {}
