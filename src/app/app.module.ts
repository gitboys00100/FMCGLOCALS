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

import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { NetworkComponent } from './components/network/network.component';
import { AnnouncementComponent } from './components/announcement/announcement.component';
import { MonitoringComponent } from './components/monitoring/monitoring.component';
import { PurchaseorderComponent } from './components/purchaseorder/purchaseorder.component';
import { ItineraryService } from './shared/itinerary.services';
import { ItinerarydetailsService } from './shared/itinerarydetails.service';
import { DatePickerService } from './shared/datepicker.service';
import { DataCountsService } from './shared/data-counts.service';
import { RefreshDataService } from './shared/refresh-data.service';
import { SortablejsModule } from 'angular-sortablejs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PurchaseOrderModule } from './modules/purchaseorders/purchaseorders.module';
import { UsersModule } from './modules/users/users.module';
import { StockTransferOrdersService } from './shared/stock-transfer-orders.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './shared/api.service';
import { HttpModule } from '@angular/http';
import { HeaderComponent } from './components/header/header.component';
import { Md5HasherService } from './shared/md5-hasher.service';
import { AuthGuard } from './auth/auth.guard';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { AuthService } from './shared/auth.service';
import { PromotionDiscountModule } from './modules/schemes/schemes.module';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { CoreModalModule } from './modules/core-modal/core-modal.module';

import { ChartsModule } from 'ng2-charts';
import { DashboardModalComponent } from './components/dashboard-modal/dashboard-modal.component';
import { IssuesModule } from './modules/issues/issues.module';
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
    PurchaseorderComponent,
    LoginComponent,
    HeaderComponent,
    ForgotpasswordComponent,
    ChangepasswordComponent,
    ResetpasswordComponent,
    DashboardModalComponent
  ],
  imports: [
    BrowserModule,
    RetailersModule,
    ChartsModule,
    IssuesModule,
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
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    PromotionDiscountModule,
    Ng4LoadingSpinnerModule.forRoot(),
    CoreModalModule,
    //CoreModalModule
  ],
  providers: [
  	ItineraryService,
	  ItinerarydetailsService,
    DatePickerService,
    DataCountsService,
    RefreshDataService,
    StockTransferOrdersService,
    ApiService,
    Md5HasherService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
