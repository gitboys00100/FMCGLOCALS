import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    PromotionDiscountComponent,
    SchemeTableComponent

} from './index';

const pdRoutes: Routes = [
    { path: 'schemes', component: PromotionDiscountComponent, children: [
        { path: '', redirectTo: 'table', pathMatch: 'full' },
        { path: 'table', component: SchemeTableComponent }
    ]}
];

@NgModule({
    imports: [ RouterModule.forChild(pdRoutes) ],
    exports: [ RouterModule ]
})
export class PromotionDiscountRoutingModule {}
