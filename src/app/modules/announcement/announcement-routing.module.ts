import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    AnnouncementComponent,
    AnnouncementTableComponent,
    NewProductComponent,
    PromosComponent
} from './index';

const announcementsRoutes: Routes = [
    { path: 'announcement', component: AnnouncementComponent, children: [
        { path: '', redirectTo: 'announcement-table', pathMatch: 'full'},
        { path: 'announcement-table', component: AnnouncementTableComponent },
        { path: 'new-product', component: NewProductComponent },
        { path: 'promos', component: PromosComponent },
    ]}
];

@NgModule({
    imports: [ RouterModule.forChild(announcementsRoutes) ],
    exports: [ RouterModule]
})
export class AnnouncementRoutingModule {}
