import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { PurchaseOrderRoutingModule } from './purchaseorders-routing.module';
import { CoreModalModule } from '../core-modal/core-modal.module';

import { OrderModule } from 'ngx-order-pipe';

import {
    PurchaseOrderComponent,
    PoComponent,

} from './index';

import { PurchaseOrderService } from './purchaseorders.service';
import { FilterPipe } from './pipes/filter.pipe';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
    declarations: [
        PurchaseOrderComponent,
        PoComponent,
        FilterPipe,
        SearchPipe
    ],
    imports: [
        CommonModule,
        NgxPaginationModule,
        PurchaseOrderRoutingModule,
        CoreModalModule,
        OrderModule
    ],
    providers: [
        PurchaseOrderService
    ]
})
export class PurchaseOrderModule {}
