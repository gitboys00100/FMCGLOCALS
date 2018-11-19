import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import {
    UsersComponent,
    UserListComponent
} from './index';

const usersRoutes: Routes = [
  { path: 'users', component: UsersComponent, children: [
      { path: '', redirectTo: 'userlist', pathMatch: 'full',
      canActivate: [AuthGuard] },
      { path: 'userlist', component: UserListComponent,
      canActivate: [AuthGuard] }
  ]}
  /*
    { path: 'users', component: UsersComponent, children: [
        { path: '', redirectTo: 'list', pathMatch: 'full' },
        { path: 'list', component: UserListComponent }
    ]}
    */
];

@NgModule({
    imports: [ RouterModule.forChild(usersRoutes) ],
    exports: [ RouterModule ]
})
export class UsersRoutingModule {}
