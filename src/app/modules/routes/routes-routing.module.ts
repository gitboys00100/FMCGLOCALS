import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Insert here all child components created within the module
import { RoutesComponent } from './routes.component';
import { ManageitineraryComponent } from './manageitinerary/manageitinerary.component';
import { RouteschedulesComponent } from './routeschedules/routeschedules.component';


const routes: Routes = [
      { path: 'routes', component: RoutesComponent,
          children: [
              { path: '', redirectTo: 'schedulesroute', pathMatch: 'full'},
              { path: 'itinerarymanage', component: ManageitineraryComponent },
              { path: 'schedulesroute', component: RouteschedulesComponent}
          ]
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
