import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { RetailersRoutingModule } from './retailers-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import { OrderModule } from 'ngx-order-pipe';
//import { ModalComponent } from '../modal/modal.component';
import { CoreModalModule } from '../../modules/core-modal/core-modal.module';
import { AgmCoreModule, GoogleMapsAPIWrapper } from  '@agm/core';
import { FormsModule } from '@angular/forms';
import { OrderByPipeModule } from '../../modules/order-by-pipe/order-by-pipe.module';
import { DaySorterPipeModule } from '../../modules/day-sorter-pipe/day-sorter-pipe.module';
import { SelectSpecificPipeModule } from '../../modules/select-specific-pipe/select-specific-pipe.module';

import { ReactiveFormsModule } from '@angular/forms';

import {
    RetailersComponent,
    RetailerServiceableComponent,
    RetailerApprovalComponent
} from './index';

import { FilterPipe } from './pipes/filter.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { SearchServiceablePipe } from './pipes/searchServiceable.pipe';

import { RetailerService } from './retailer-service';

import { NewRetailerComponent } from './new-retailer/new-retailer.component';

@NgModule({
    declarations: [
        RetailersComponent,
        RetailerServiceableComponent,
        RetailerApprovalComponent,
        NewRetailerComponent,
        //ModalComponent
        FilterPipe,
        SearchPipe,
        SearchServiceablePipe
    ],
    imports: [
        CommonModule,
        RetailersRoutingModule,
        BrowserAnimationsModule,
        CalendarModule.forRoot(),
        CoreModalModule,
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyBMxbQ1hbvwwtiSHJUkvXsPZg7BVkP-bqk'
        }),
        FormsModule,
        OrderByPipeModule,
        NgxPaginationModule,
        DaySorterPipeModule,
        SelectSpecificPipeModule,
        ReactiveFormsModule
    ],
    providers: [
      GoogleMapsAPIWrapper,
      RetailerService
    ]
})
export class RetailersModule {}
