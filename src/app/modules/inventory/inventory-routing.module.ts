import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import {
    InventoryComponent,
    ProductInventoryComponent,
    StockTransferOrdersComponent,
    InventoryReturnsComponent,
    InventoryListComponent
} from './index';

const inventoryRoutes: Routes = [
    { path: 'inventory', component: InventoryComponent, children: [
        { path: '', redirectTo: 'product-inventory', pathMatch: 'full',
        canActivate: [AuthGuard]},
        { path: 'product-inventory', component: ProductInventoryComponent,
        canActivate: [AuthGuard] },
        { path: 'stock-transfer-orders', component: StockTransferOrdersComponent,
        canActivate: [AuthGuard] },
        { path: 'inventory-returns', component: InventoryReturnsComponent,
        canActivate: [AuthGuard] },
        { path: 'list', component: InventoryListComponent,
        canActivate: [AuthGuard] },
    ]}
];

@NgModule({
    imports: [ RouterModule.forChild(inventoryRoutes) ],
    exports: [ RouterModule]
})
export class InventoryRoutingModule {}
