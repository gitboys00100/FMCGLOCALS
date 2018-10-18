import { Component, OnInit } from '@angular/core';
import { ItineraryService } from '../../../shared/itinerary.services';
import { ApiService } from '../../../shared/api.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-routescheddaily',
  templateUrl: './routescheddaily.component.html',
  styleUrls: ['./routescheddaily.component.css']
})
export class RoutescheddailyComponent implements OnInit {
  itineraryList = [];
  loading: boolean;
  public filterSearchQuery: string = '';
  public searchQuery: string = '';
	public itemsPerPage: number = 5;

  constructor(private itService: ItineraryService, private apiService: ApiService,private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.loading = false;
  	this.itineraryList = this.itService.getItineraryList();
	  //console.log(this.itineraryList);
    this.getItineraryList();
  }
  public onShowCountChange($event) {
    this.itemsPerPage = $event.target.value;
  }
  getItineraryList() {
    this.loading = true;
    this.apiService.get('itineraries/')
		.subscribe(ret => {
      let data: any[] = JSON.parse('['+JSON.stringify(ret)+']');
      console.log(Object.values(data));
      //alert(data.message);
      //console.log(data.data);
      this.itineraryList = Object.values(data);
      this.loading = false;
    },
		(err) => {
			console.log(err);
		});
  }

}
