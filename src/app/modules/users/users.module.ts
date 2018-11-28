import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { UsersComponent } from './users/users.component';
//import { UserListComponent } from './userlist/userlist.component';
import { CoreModalModule } from '../core-modal/core-modal.module';

import { NgxPaginationModule } from 'ngx-pagination';
import { UsersRoutingModule } from './users-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderByPipeModule } from '../../modules/order-by-pipe/order-by-pipe.module';
import { TranslateService } from '../../shared/translate.service';

import {
    UsersComponent,
    UserListComponent,
    AddUserComponent,
    EditUserComponent,
    DeleteUserComponent
} from './index';

import { RetailerService } from './retailer-service';
//import { AdduserComponent } from './adduser/adduser.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
  declarations: [
    UsersComponent,
    UserListComponent,
    AddUserComponent,
    EditUserComponent,
    DeleteUserComponent,
    FilterPipe,
    SearchPipe

  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    UsersRoutingModule,
    CoreModalModule,
    FormsModule,
    ReactiveFormsModule,
    OrderByPipeModule
  ],
  providers: [
      RetailerService,
      TranslateService
  ]
})
export class UsersModule { }
