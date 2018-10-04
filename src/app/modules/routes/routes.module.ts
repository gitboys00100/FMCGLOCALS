import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importing Routing Module
import { RoutesRoutingModule } from './routes-routing.module';

// Import Components
import { ManageitineraryComponent } from './manageitinerary/manageitinerary.component';

import { ItinerarydetailsComponent } from './itinerarydetails/itinerarydetails.component';
import { RoutesComponent } from './routes.component';

import { RouteschedulesComponent } from './routeschedules/routeschedules.component';
import { RoutescheddailyComponent } from './routescheddaily/routescheddaily.component';
import { RouteschedmonthlyComponent } from './routeschedmonthly/routeschedmonthly.component';
import { RouteschedweeklyComponent } from './routeschedweekly/routeschedweekly.component';
import { AgentitineraryComponent } from './agentitinerary/agentitinerary.component';
import { NewitineraryComponent } from './newitinerary/newitinerary.component';
import { AssignitineraryComponent } from './assignitinerary/assignitinerary.component';
import { AddRetailerPipe } from './newitinerary/addRetailer.pipe';
import { SortablejsModule } from 'angular-sortablejs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModalModule } from '../core-modal/core-modal.module';
import { OrderByPipe } from './pipes/orderBy.pipe';
import { FilterPipe } from './pipes/search-by-name.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { ItinerarydetailsupdateComponent } from './itinerarydetailsupdate/itinerarydetailsupdate.component';
import { ItinerarydetailsdeleteComponent } from './itinerarydetailsdelete/itinerarydetailsdelete.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RoutesRoutingModule,
    SortablejsModule,
    NgbModule.forRoot(),
    CoreModalModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ ManageitineraryComponent,
                  RouteschedulesComponent,
                  RoutesComponent,
                  ItinerarydetailsComponent,
                  RoutescheddailyComponent,
                  RouteschedmonthlyComponent,
                  RouteschedweeklyComponent,
                  AgentitineraryComponent,
                  NewitineraryComponent,
                  AssignitineraryComponent,
                  AddRetailerPipe,
                  OrderByPipe,
                  FilterPipe,
                  ItinerarydetailsupdateComponent,
                  ItinerarydetailsdeleteComponent
                  //ModalComponent
  ]
})
export class RoutesModule { }
