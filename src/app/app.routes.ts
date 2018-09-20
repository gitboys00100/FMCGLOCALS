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
import { NgModule } from '@angular/core';
import { RetailersModule } from './modules/retailers/retailers.module';
import { RoutesModule } from './modules/routes/routes.module';
import { ReportsModule } from './modules/reports/reports.module';
import { PurchaseOrderModule } from './modules/purchaseorders/purchaseorders.module';
import { UsersModule } from './modules/users/users.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { AnnouncementModule } from './modules/announcement/announcement.module';

const routes: Routes = [
   {
      path: '',
      component: AboutComponent
   },
   {
      path: 'reports',
      loadChildren: () => ReportsModule
   },
   {
      path: 'inventory',
      loadChildren: () => InventoryModule
   },
   {
      path: 'remittance',
      component: RemittanceComponent
   },
   {
      path: 'retailers',
      loadChildren: () => RetailersModule
   },
   {
      path: 'routes',
      loadChildren: () => RoutesModule
   },
   {
      path: 'users',
      //component: UsersComponent
      loadChildren: () => UsersModule
   },
   {
      path: 'network',
      component: NetworkComponent
   },
   {
      path: 'announcement',
      loadChildren: () => AnnouncementModule
   },
   {
      path: 'monitoring',
      component: MonitoringComponent
   },
   {
      path: 'purchaseorder',
      loadChildren: () => PurchaseOrderModule
   }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutes {}
