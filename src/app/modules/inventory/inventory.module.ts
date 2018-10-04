import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { InventoryRoutingModule } from './inventory-routing.module';
import { CoreModalModule } from '../core-modal/core-modal.module';


import {
    InventoryComponent,
    InventoryListComponent,
    InventoryTableComponent,
    InventoryItemCreateComponent,
    InventoryItemReturnComponent
} from './index';

import { FilterPipe } from './pipes/filter.pipe';
import { FilterReturnedPipe } from './pipes/filterReturned.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { SearchReturn } from './pipes/searchReturn.pipe';
import { SearchStockPipe } from './pipes/search-stock.pipe';
import { FilterStockPipe } from './pipes/filter-stock.pipe';
import { DateTimeFormatPipe } from './pipes/DateTimeFormat.pipe';
import { FilterUniquePipe} from './pipes/filterDuplicate.pipe';

import { InventoryService } from './inventory-service';
import { InventoryServiceReturns } from './inventory-service';
import { ProductInventoryComponent } from './product-inventory/product-inventory.component';
import { StockTransferOrdersComponent } from './stock-transfer-orders/stock-transfer-orders.component';
import { InventoryReturnsComponent } from './inventory-returns/inventory-returns.component';
import { StocktransferapprovalComponent } from './stocktransferapproval/stocktransferapproval.component';
import { ConfirmapprovalComponent } from './stocktransferapproval/confirmapproval/confirmapproval.component';

import { OrderByPipeModule } from '../../modules/order-by-pipe/order-by-pipe.module';

@NgModule({
    declarations: [
        InventoryComponent,
        InventoryListComponent,
        InventoryTableComponent,
        InventoryItemCreateComponent,
        FilterPipe,
        SearchPipe,
        SearchReturn,
        SearchStockPipe,
        FilterStockPipe,
        DateTimeFormatPipe,
        FilterUniquePipe,
        ProductInventoryComponent,
        StockTransferOrdersComponent,
        InventoryReturnsComponent,
        InventoryItemReturnComponent,
        StocktransferapprovalComponent,
        ConfirmapprovalComponent,
        FilterReturnedPipe
    ],
    imports: [
        CommonModule,
        NgxPaginationModule,
        InventoryRoutingModule,
        CoreModalModule,
        OrderByPipeModule
    ],
    providers: [
        InventoryService,
        InventoryServiceReturns,
    ]
})
export class InventoryModule {}
