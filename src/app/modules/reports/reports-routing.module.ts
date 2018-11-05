import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';


import {
    ReportsComponent,
    AgentReportsComponent,
    SalesReportComponent,
    RetailerInventoryStatusComponent,
    RetailerListByDistributorComponent
} from './index';

const reportsRoutes: Routes = [
    { path: 'reports', component: ReportsComponent, children: [
        { path: '', redirectTo: 'agent-report', pathMatch: 'full',
        canActivate: [AuthGuard]},
        { path: 'agent-report', component: AgentReportsComponent ,
        canActivate: [AuthGuard]},
        { path: 'sales-report', component: SalesReportComponent ,
        canActivate: [AuthGuard]},
        { path: 'retailer-inventory-status', component: RetailerInventoryStatusComponent ,
        canActivate: [AuthGuard]},
        { path: 'retailer-list-by-distributor', component: RetailerListByDistributorComponent ,
        canActivate: [AuthGuard]},
    ]}
];

@NgModule({
    imports: [ RouterModule.forChild(reportsRoutes) ],
    exports: [ RouterModule]
})
export class ReportsRoutingModule {}
