import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import {
    RetailersComponent,
    RetailerServiceableComponent,
    RetailerApprovalComponent
} from './index';

const retailersRoutes: Routes = [
    { path: 'retailers', component: RetailersComponent, children: [
        { path: '', redirectTo: 'list', pathMatch: 'full',
        canActivate: [AuthGuard]},
        { path: 'list', component: RetailerServiceableComponent,
        canActivate: [AuthGuard] },
        { path: 'approval', component: RetailerApprovalComponent,
        canActivate: [AuthGuard]}
    ]}
];

@NgModule({
    imports: [ RouterModule.forChild(retailersRoutes) ],
    exports: [ RouterModule]
})
export class RetailersRoutingModule {}
