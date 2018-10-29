import { Component, OnInit } from '@angular/core';
import { ItineraryService } from '../../../shared/itinerary.services';

@Component({
  selector: 'app-routeschedweekly',
  templateUrl: './routeschedweekly.component.html',
  styleUrls: ['./routeschedweekly.component.css']
})
export class RouteschedweeklyComponent implements OnInit {
  itineraryList = [];

  public filterSearchQuery: string = '';
  public searchQuery: string = '';
	public itemsPerPage: number = 5;

  constructor(private itService: ItineraryService) { }

  ngOnInit() {
    //add a condition where date
  	this.itineraryList = this.itService.getItineraryList();
  }
  public onShowCountChange($event) {
    this.itemsPerPage = $event.target.value;
  }
}
