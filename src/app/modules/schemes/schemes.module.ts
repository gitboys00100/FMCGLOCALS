import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { PromotionDiscountRoutingModule } from './schemes-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderByPipeModule } from '../../modules/order-by-pipe/order-by-pipe.module';

import { CoreModalModule } from '../core-modal/core-modal.module';

import {
    PromotionDiscountComponent,
    SchemeTableComponent

} from './index';


import { FilterPipe } from './pipes/filter.pipe';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
    declarations: [
        PromotionDiscountComponent,
        SchemeTableComponent,
        FilterPipe,
        SearchPipe
    ],
    imports: [
        CommonModule,
        NgxPaginationModule,
        PromotionDiscountRoutingModule,
        OrderByPipeModule,
        CoreModalModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        //PromotionDiscountService
    ]
})
export class PromotionDiscountModule {}
