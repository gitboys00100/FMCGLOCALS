import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemittanceRoutingModule } from './remittance-routing.module';

import { RemittanceComponent } from './remittance.component';
import { RemittanceReceivablesComponent } from './remittance-receivables/remittance-receivables.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
//import { ModalComponent } from '../modal/modal.component';
import { OrderByPipeModule } from '../../modules/order-by-pipe/order-by-pipe.module';
import { SelectSpecificPipeModule } from '../../modules/select-specific-pipe/select-specific-pipe.module';
import { CoreModalModule } from '../../modules/core-modal/core-modal.module';
import { DaySorterPipeModule } from '../../modules/day-sorter-pipe/day-sorter-pipe.module';
import { SearchPipe } from './pipes/search.pipe';
import { SearchReceivablesPipe } from './pipes/search_receivables.pipe';
import { SearchRemittancePipe } from './pipes/search_remittance.pipe';
import { SelectSpecificPipeRemittance } from './pipes/select-specific-remittance.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { RemitreceiptComponent } from './remitreceipt/remitreceipt.component';
import { CashDenominationComponent } from './cash-denomination/cash-denomination.component';


@NgModule({
    declarations: [
        RemittanceComponent,
        RemittanceReceivablesComponent,
        PurchaseOrderComponent,
        SearchPipe,
        SearchReceivablesPipe,
        SearchRemittancePipe,
        RemitreceiptComponent,
        SelectSpecificPipeRemittance,
        CashDenominationComponent
    ],
    imports: [
        CommonModule,
        RemittanceRoutingModule,
        OrderByPipeModule,
        NgxPaginationModule,
        SelectSpecificPipeModule,
        CoreModalModule,
        DaySorterPipeModule
    ],
    providers: [
    ]
})
export class RemittanceModule {}
