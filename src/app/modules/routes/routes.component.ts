import { Component, OnInit, ViewChild } from '@angular/core';
import { NewitineraryComponent } from './newitinerary/newitinerary.component';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit {
  @ViewChild('onNewItinerary') onNewItinerary: NewitineraryComponent;
  constructor() { }

  ngOnInit() {
  }
  public newItinerary() {
    this.onNewItinerary.itineraryCreateModal.onModalOpen();
  }

}
