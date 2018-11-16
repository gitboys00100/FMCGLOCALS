import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';

import {
    AnnouncementComponent,
    AnnouncementTableComponent,
    NewProductComponent,
    PromosComponent
} from './index';

const announcementsRoutes: Routes = [
    { path: 'announcement', component: AnnouncementComponent, children: [
        { path: '', redirectTo: 'announcement-table', pathMatch: 'full',
        canActivate: [AuthGuard]},
        { path: 'announcement-table', component: AnnouncementTableComponent,
        canActivate: [AuthGuard] },
        { path: 'new-product', component: NewProductComponent,
        canActivate: [AuthGuard] },
        { path: 'promos', component: PromosComponent,
        canActivate: [AuthGuard] },
    ]}
];

@NgModule({
    imports: [ RouterModule.forChild(announcementsRoutes) ],
    exports: [ RouterModule]
})
export class AnnouncementRoutingModule {}
