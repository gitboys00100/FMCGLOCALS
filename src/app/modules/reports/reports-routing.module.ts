import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import {
    ReportsComponent,
    AgentReportsComponent,
    SalesReportComponent,
    RetailerInventoryStatusComponent,
    RetailerListByDistributorComponent
} from './index';

const reportsRoutes: Routes = [
    { path: 'reports', component: ReportsComponent, children: [
        { path: '', redirectTo: 'agent-report', pathMatch: 'full'},
        { path: 'agent-report', component: AgentReportsComponent },
        { path: 'sales-report', component: SalesReportComponent },
        { path: 'retailer-inventory-status', component: RetailerInventoryStatusComponent },
        { path: 'retailer-list-by-distributor', component: RetailerListByDistributorComponent }
    ]}
];

@NgModule({
    imports: [ RouterModule.forChild(reportsRoutes) ],
    exports: [ RouterModule]
})
export class ReportsRoutingModule {}
