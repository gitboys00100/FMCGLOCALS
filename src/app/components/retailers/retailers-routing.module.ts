import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    RetailersComponent,
    RetailerListComponent,
    RetailerApprovalComponent
} from './index';

const retailersRoutes: Routes = [
    { path: 'retailers', component: RetailersComponent, children: [
        { path: '', redirectTo: 'list', pathMatch: 'full'},
        { path: 'list', component: RetailerListComponent },
        { path: 'approval', component: RetailerApprovalComponent}
    ]}
];

@NgModule({
    imports: [ RouterModule.forChild(retailersRoutes) ],
    exports: [ RouterModule]
})
export class RetailersRoutingModule {}