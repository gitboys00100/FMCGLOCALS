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

@NgModule({
    declarations: [
        ReportsComponent,
        AgentReportsComponent,
        SearchPipe
    ],
    imports: [
        CommonModule,
        NgxPaginationModule,
        ReportsRoutingModule,
        OrderByPipeModule,
        SelectSpecificPipeModule,
        DaySorterPipeModule
    ],
    providers: [
    ]
})
export class ReportsModule {}
