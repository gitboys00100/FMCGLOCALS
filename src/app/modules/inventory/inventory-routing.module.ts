import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    InventoryComponent,
    ProductInventoryComponent,
    StockTransferOrdersComponent,
    InventoryReturnsComponent,
    InventoryListComponent
} from './index';

const inventoryRoutes: Routes = [
    { path: 'inventory', component: InventoryComponent, children: [
        { path: '', redirectTo: 'product-inventory', pathMatch: 'full'},
        { path: 'product-inventory', component: ProductInventoryComponent },
        { path: 'stock-transfer-orders', component: StockTransferOrdersComponent },
        { path: 'inventory-returns', component: InventoryReturnsComponent },
        { path: 'list', component: InventoryListComponent },
    ]}
];

@NgModule({
    imports: [ RouterModule.forChild(inventoryRoutes) ],
    exports: [ RouterModule]
})
export class InventoryRoutingModule {}
