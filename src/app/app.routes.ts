import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { RemittanceComponent } from './modules/remittance/remittance.component';
import { RetailersComponent } from './modules/retailers/retailers.component';
import { UsersComponent } from './components/users/users.component';
import { NetworkComponent } from './components/network/network.component';
import { AnnouncementComponent } from './components/announcement/announcement.component';
import { MonitoringComponent } from './components/monitoring/monitoring.component';
import { PurchaseorderComponent } from './components/purchaseorder/purchaseorder.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { NgModule } from '@angular/core';
import { RetailersModule } from './modules/retailers/retailers.module';
import { RoutesModule } from './modules/routes/routes.module';
import { ReportsModule } from './modules/reports/reports.module';
import { PurchaseOrderModule } from './modules/purchaseorders/purchaseorders.module';
import { UsersModule } from './modules/users/users.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { AnnouncementModule } from './modules/announcement/announcement.module';
import { AuthGuard } from './auth/auth.guard';
import { PromotionDiscountModule } from './modules/schemes/schemes.module';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component'
import { IssuesModule } from './modules/issues/issues.module';

const routes: Routes = [
    {
        path: '',
        component: AboutComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'forgotpassword',
        component: ForgotpasswordComponent
    },
    {
        path: 'resetpassword/:uid/:token',
        component: ResetpasswordComponent
    },
    {
        path: 'changepassword',
        component: ChangepasswordComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'reports',
        loadChildren: () => ReportsModule,
        canActivate: [AuthGuard]
    },
    {
        path: 'inventory',
        loadChildren: () => InventoryModule,
        canActivate: [AuthGuard]
    },
    {
        path: 'remittance',
        component: RemittanceComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'retailers',
        loadChildren: () => RetailersModule,
        canActivate: [AuthGuard]
    },
    {
        path: 'routes',
        loadChildren: () => RoutesModule,
        canActivate: [AuthGuard]
    },
    {
        path: 'users',
        loadChildren: () => UsersModule,
        canActivate: [AuthGuard]
    },
    {
        path: 'issues',
        loadChildren: () => IssuesModule,
        canActivate: [AuthGuard]
    },
    {
        path: 'network',
        component: NetworkComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'announcement',
        loadChildren: () => AnnouncementModule,
        canActivate: [AuthGuard]
    },
    {
        path: 'monitoring',
        component: MonitoringComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'purchaseorder',
        loadChildren: () => PurchaseOrderModule,
        canActivate: [AuthGuard]
    },
    {
        path: 'schemes',
        loadChildren: () => PromotionDiscountModule,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutes {}
