import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementComponent } from './announcement.component';
import { AnnouncementTableComponent } from './announcement-table/announcement-table.component';
import { AnnouncementRoutingModule } from './announcement-routing.module';
import { PromosComponent } from './promos/promos.component';
import { NewProductComponent } from './new-product/new-product.component';
import { OrderByPipeModule } from '../../modules/order-by-pipe/order-by-pipe.module';
import { CoreModalModule } from '../core-modal/core-modal.module';
import { DaySorterPipeModule } from '../../modules/day-sorter-pipe/day-sorter-pipe.module';
import { SearchPipe } from './pipes/search.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AnnouncementRoutingModule,
    OrderByPipeModule,
    CoreModalModule,
    NgxPaginationModule,
    DaySorterPipeModule,
    ReactiveFormsModule
  ],
  declarations: [
    AnnouncementComponent,
    AnnouncementTableComponent,
    PromosComponent,
    NewProductComponent,
    SearchPipe,
    FilterPipe
  ]
})
export class AnnouncementModule { }
