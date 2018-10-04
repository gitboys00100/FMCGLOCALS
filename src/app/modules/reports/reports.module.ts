import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { ReportsComponent } from './reports.component';
import { AgentReportsComponent } from './agent-reports/agent-reports.component';
import { OrderByPipeModule } from '../../modules/order-by-pipe/order-by-pipe.module';
import { SelectSpecificPipeModule } from '../../modules/select-specific-pipe/select-specific-pipe.module';
import { DaySorterPipeModule } from '../../modules/day-sorter-pipe/day-sorter-pipe.module';
import { SearchPipe } from './pipes/search.pipe';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { RetailerInventoryStatusComponent } from './retailer-inventory-status/retailer-inventory-status.component';
import { RetailerListByDistributorComponent } from './retailer-list-by-distributor/retailer-list-by-distributor.component';

import { CoreModalModule } from '../../modules/core-modal/core-modal.module';

@NgModule({
    declarations: [
        ReportsComponent,
        AgentReportsComponent,
        SearchPipe,
        SalesReportComponent,
        RetailerInventoryStatusComponent,
        RetailerListByDistributorComponent
    ],
    imports: [
        CommonModule,
        NgxPaginationModule,
        ReportsRoutingModule,
        OrderByPipeModule,
        SelectSpecificPipeModule,
        DaySorterPipeModule,
        CoreModalModule
    ],
    providers: [
    ]
})
export class ReportsModule {}
