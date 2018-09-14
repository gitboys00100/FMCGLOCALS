import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import {
    ReportsComponent,
    AgentReportsComponent
} from './index';

const reportsRoutes: Routes = [
    { path: 'reports', component: ReportsComponent, children: [
        { path: '', redirectTo: 'agent-report', pathMatch: 'full'},
        { path: 'agent-report', component: AgentReportsComponent }
    ]}
];

@NgModule({
    imports: [ RouterModule.forChild(reportsRoutes) ],
    exports: [ RouterModule]
})
export class ReportsRoutingModule {}
