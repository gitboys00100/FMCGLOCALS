import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';

import {
    PurchaseOrderComponent,
    PoComponent
} from './index';

const poRoutes: Routes = [
    { path: 'purchaseorder', component: PurchaseOrderComponent, children: [
        { path: '', redirectTo: 'orders', pathMatch: 'full',
        canActivate: [AuthGuard] },
        { path: 'orders', component: PoComponent,
        canActivate: [AuthGuard] }
    ]}
];

@NgModule({
    imports: [ RouterModule.forChild(poRoutes) ],
    exports: [ RouterModule ]
})
export class PurchaseOrderRoutingModule {}
