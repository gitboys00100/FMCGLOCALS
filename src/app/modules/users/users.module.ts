import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { UsersComponent } from './users/users.component';
//import { UserListComponent } from './userlist/userlist.component';
import { CoreModalModule } from '../core-modal/core-modal.module';

import { NgxPaginationModule } from 'ngx-pagination';
import { SelectDropDownModule } from 'ngx-select-dropdown';
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
import { ManageAgentsComponent } from './manage-agents/manage-agents.component';
import { UsersService } from './users.service';
import { AgentActivitiesComponent } from './agent-activities/agent-activities.component';
import { AgentTrackingComponent } from './agent-tracking/agent-tracking.component';
import { SetTargetsComponent } from './set-targets/set-targets.component';
import { ToastrService } from 'ngx-toastr';
import { AssignedRetailersComponent } from './assigned-retailers/assigned-retailers.component';
import { UnassignedRetailersComponent } from './unassigned-retailers/unassigned-retailers.component';
import { ViewRetailerModalComponent } from './view-retailer-modal/view-retailer-modal.component';
import { UsersSearchPipe } from './users-search.pipe';
import { ConfirmAssignRetailersModalComponent } from './confirm-assign-retailers-modal/confirm-assign-retailers-modal.component';
import { ConfirmRemoveRetailersModalComponent } from './confirm-remove-retailers-modal/confirm-remove-retailers-modal.component';
import { ReassignRetailersModalComponent } from './reassign-retailers-modal/reassign-retailers-modal.component';
import { ConfirmReassignRetailersModalComponent } from './confirm-reassign-retailers-modal/confirm-reassign-retailers-modal.component';
import { AuthService } from '../../shared/auth.service';
import { AgmCoreModule } from '@agm/core';

@NgModule({
	declarations: [
		UsersComponent,
		UserListComponent,
		AddUserComponent,
		EditUserComponent,
		DeleteUserComponent,
		FilterPipe,
		SearchPipe,
		UsersSearchPipe,
		ManageAgentsComponent,
		AgentActivitiesComponent,
		AgentTrackingComponent,
		SetTargetsComponent,
		AssignedRetailersComponent,
		UnassignedRetailersComponent,
		ViewRetailerModalComponent,
		ConfirmAssignRetailersModalComponent,
		ConfirmRemoveRetailersModalComponent,
		ReassignRetailersModalComponent,
		ConfirmReassignRetailersModalComponent,
	],
	imports: [
		CommonModule,
		NgxPaginationModule,
		SelectDropDownModule,
		UsersRoutingModule,
		CoreModalModule,
		FormsModule,
		ReactiveFormsModule,
		OrderByPipeModule,
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyDmeA0nz47jc5D-kKLIrc0Ye9lE33KcSiI'
		}),
	],
	providers: [
		RetailerService,
		TranslateService,
		UsersService,
		ToastrService,
		AuthService
	]
})
export class UsersModule { }
