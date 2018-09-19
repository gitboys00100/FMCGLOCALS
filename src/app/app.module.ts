import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Import user Defined Modules
import { RetailersModule } from './modules/retailers/retailers.module';
import { RemittanceModule } from './modules/remittance/remittance.module';
import { RoutesModule } from './modules/routes/routes.module';
import { InventoryModule } from './modules/inventory/inventory.module';

import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { ReportsModule } from './modules/reports/reports.module';
import { AppRoutes } from './app.routes';
import { InventoryComponent } from './components/inventory/inventory.component';
import { AnnouncementModule } from './modules/announcement/announcement.module';
//import { RemittanceComponent } from './components/remittance/remittance.component';

import { UsersComponent } from './components/users/users.component';
import { NetworkComponent } from './components/network/network.component';
import { AnnouncementComponent } from './components/announcement/announcement.component';
import { MonitoringComponent } from './components/monitoring/monitoring.component';
import { PurchaseorderComponent } from './components/purchaseorder/purchaseorder.component';
import { ItineraryService } from './shared/itinerary.services';
import { ItinerarydetailsService } from './shared/itinerarydetails.service';
import { DatePickerService } from './shared/datepicker.service';
import { DataCountsService } from './shared/data-counts.service';
import { SortablejsModule } from 'angular-sortablejs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { PurchaseOrderModule } from './modules/purchaseorders/purchaseorders.module';
import { UsersModule } from './modules/users/users.module';
import { StockTransferOrdersService } from './shared/stock-transfer-orders.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './shared/api.service';
//import { ModalComponent } from './components/modal/modal.component';
//import { CoreModalModule } from './modules/core-modal/core-modal.module';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    InventoryComponent,
    //RemittanceComponent,
    UsersComponent,
    NetworkComponent,
    AnnouncementComponent,
    MonitoringComponent,
    //ModalComponent,
    PurchaseorderComponent
  ],
  imports: [
    BrowserModule,
    RetailersModule,
    RemittanceModule,
    ReportsModule,
    InventoryModule,
    FormsModule,
    RoutesModule, // RoutesModule added
	  AppRoutes,
    SortablejsModule.forRoot({ animation: 150 }),
    NgbModule,
    PurchaseOrderModule,
    UsersModule,
    AnnouncementModule,
    HttpClientModule
    //CoreModalModule
  ],
  providers: [
  	ItineraryService,
	  ItinerarydetailsService,
    DatePickerService,
    DataCountsService,
    StockTransferOrdersService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
