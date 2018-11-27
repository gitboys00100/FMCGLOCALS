import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IssuesComponent } from './issues/issues.component';
import { IssuesListComponent } from './issues-list/issues-list.component';
import { RetailerIssuesComponent } from './retailer-issues/retailer-issues.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
    { path: 'issues', component: IssuesComponent,
         children: [
            { path: '', redirectTo: 'list', pathMatch: 'full', canActivate: [AuthGuard] },
            { path: 'retailer/:id', component: RetailerIssuesComponent, canActivate: [AuthGuard] },
            { path: 'list', component: IssuesListComponent, canActivate: [AuthGuard] },
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})
export class IssuesRoutingModule {}
