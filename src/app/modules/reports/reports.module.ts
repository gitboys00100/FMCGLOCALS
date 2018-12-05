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
import { GetUniqueOnlyPipe } from './pipes/getuniqueonly.pipe';
import { SearchPipeRetailerListByUser } from './pipes/searchRetailerListByUser.pipe';
import { OrderByPipeAgentReport } from './pipes/orderByAgentReport.pipe';
import { GetCompanyName } from './pipes/get-company-name.pipe';
import { SelectSpecificPipeAgentReports } from './pipes/select-specific-agent-report.pipe';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { RetailerInventoryStatusComponent } from './retailer-inventory-status/retailer-inventory-status.component';
import { RetailerListByDistributorComponent } from './retailer-list-by-distributor/retailer-list-by-distributor.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModalModule } from '../../modules/core-modal/core-modal.module';
import { AccountsReceivableReportComponent } from './accounts-receivable-report/accounts-receivable-report.component';

@NgModule({
    declarations: [
        ReportsComponent,
        AgentReportsComponent,
        SearchPipe,
        GetUniqueOnlyPipe,
        SalesReportComponent,
        RetailerInventoryStatusComponent,
        RetailerListByDistributorComponent,
        GetCompanyName,
        OrderByPipeAgentReport,
        SelectSpecificPipeAgentReports,
        SearchPipeRetailerListByUser,
        AccountsReceivableReportComponent
    ],
    imports: [
        CommonModule,
        NgxPaginationModule,
        ReportsRoutingModule,
        OrderByPipeModule,
        SelectSpecificPipeModule,
        DaySorterPipeModule,
        CoreModalModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
    ]
})
export class ReportsModule {}
