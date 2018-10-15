import { Component, OnInit } from '@angular/core';
import { ItineraryService } from '../../../shared/itinerary.services';
import { ApiService } from '../../../shared/api.service';

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

  constructor(private itService: ItineraryService, private apiService: ApiService) { }

  ngOnInit() {
  	this.itineraryList = this.itService.getItineraryList();
	  //console.log(this.itineraryList);
    this.getItineraryList();
  }
  public onShowCountChange($event) {
    this.itemsPerPage = $event.target.value;
  }
  getItineraryList() {
    this.apiService.get('itineraries/')
		.subscribe(ret => {
      let data: any[] = JSON.parse('['+JSON.stringify(ret)+']');
      console.log(Object.values(data));
      //alert(data.message);
      //console.log(data.data);
      this.itineraryList = Object.values(data);
    },
		(err) => {
			console.log(err);
		});
  }

}
