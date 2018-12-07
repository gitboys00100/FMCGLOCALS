import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModalModule } from '../core-modal/core-modal.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { IssuesComponent } from './issues/issues.component';
import { RetailerIssuesComponent } from './retailer-issues/retailer-issues.component';
import { ViewIssueComponent } from './view-issue/view-issue.component';
import { IssuesListComponent } from './issues-list/issues-list.component';
import { IssuesRoutingModule } from './issues-routing.module';
import { IssuesService } from './issues.service';
import { SearchPipe } from './search.pipe';

@NgModule({
	imports: [
		CommonModule,
		IssuesRoutingModule,
		CoreModalModule,
		NgxPaginationModule,
		ReactiveFormsModule,
	],
	declarations: [
		IssuesComponent,
		RetailerIssuesComponent,
		ViewIssueComponent,
		IssuesListComponent,
		SearchPipe
	],
	providers: [
		ApiService,
		IssuesService
	]
})
export class IssuesModule { }
