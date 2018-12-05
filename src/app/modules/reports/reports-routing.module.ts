import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';


import {
    ReportsComponent,
    AgentReportsComponent,
    SalesReportComponent,
    RetailerInventoryStatusComponent,
    RetailerListByDistributorComponent,
    AccountsReceivableReportComponent
} from './index';

const reportsRoutes: Routes = [
    { path: 'reports', component: ReportsComponent, children: [
        { path: '', redirectTo: '', pathMatch: 'full',
        canActivate: [AuthGuard]},
        { path: 'agent-report', component: AgentReportsComponent ,
        canActivate: [AuthGuard]},
        { path: 'sales-report', component: SalesReportComponent ,
        canActivate: [AuthGuard]},
        { path: 'retailer-inventory-status', component: RetailerInventoryStatusComponent ,
        canActivate: [AuthGuard]},
        { path: 'retailer-list-by-distributor', component: RetailerListByDistributorComponent ,
        canActivate: [AuthGuard]},
        { path: 'accounts-receivable', component: AccountsReceivableReportComponent ,
        canActivate: [AuthGuard]},
    ]}
];

@NgModule({
    imports: [ RouterModule.forChild(reportsRoutes) ],
    exports: [ RouterModule]
})
export class ReportsRoutingModule {}
