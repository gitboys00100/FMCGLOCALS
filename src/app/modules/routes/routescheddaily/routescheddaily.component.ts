import { Component, OnInit } from '@angular/core';
import { ItineraryService } from '../../../shared/itinerary.services';

@Component({
  selector: 'app-routescheddaily',
  templateUrl: './routescheddaily.component.html',
  styleUrls: ['./routescheddaily.component.css']
})
export class RoutescheddailyComponent implements OnInit {
  itineraryList = [];

  public filterSearchQuery: string = '';
  public searchQuery: string = '';
	public itemsPerPage: number = 5;

  constructor(private itService: ItineraryService) { }

  ngOnInit() {
  	this.itineraryList = this.itService.getItineraryList();
	console.log(this.itineraryList);
  }
  public onShowCountChange($event) {
    this.itemsPerPage = $event.target.value;
  }

}
