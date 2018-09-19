import { Component, OnInit, Input, ElementRef,ViewChild} from '@angular/core';
import { ItinerarydetailsService } from '../../../shared/itinerarydetails.service';
import { ItinerarydetailsupdateComponent } from '../itinerarydetailsupdate/itinerarydetailsupdate.component';
import { ItinerarydetailsdeleteComponent } from '../itinerarydetailsdelete/itinerarydetailsdelete.component';

@Component({
  selector: 'app-itinerarydetails',
  templateUrl: './itinerarydetails.component.html',
  styleUrls: ['./itinerarydetails.component.css']
})
export class ItinerarydetailsComponent implements OnInit {
      @ViewChild('onUpdateComponent') onUpdateComponent: ItinerarydetailsupdateComponent;
      @ViewChild('onDeleteComponent') onDeleteComponent: ItinerarydetailsdeleteComponent;
      itineraryDetails = [];
      order: string = 'it_label';
      reverse: boolean = false;
      type: string = 'asc';
      public filterSearchQuery: string = '';
    	public searchQuery: string = '';
      public itemsPerPage: number = 5;

  constructor(private itDetailsService: ItinerarydetailsService) { }

  ngOnInit() {
  	this.itineraryDetails = this.itDetailsService.getItineraryDetailsList();
  }

// ---------------------------- FILTERING ---------------------------------

  setItineraryOrder(value: string) {
    if(this.order === value) {
      this.reverse = !this.reverse;
      this.type = this.reverse ? 'desc' : 'asc';
    }

    this.order = value;
  }

  public onFilterSearchChange($event) {
		this.searchQuery = $event.target.value;

		if (this.searchQuery === '')
		this.onSearch();
	}

	public onSearch() {
		this.filterSearchQuery = this.searchQuery;
	}

	public onKeyDown($event) {
		if ($event.keyCode === 13) {
			this.onSearch();
			$event.preventDefault();
		}
	}
  public onShowCountChange($event) {
		this.itemsPerPage = $event.target.value;
	}


// ------------------------------ FOR MODAL ---------------------------
  public onUpdateItinerary() {
		this.onUpdateComponent.itemUpdateItineraryModal.onModalOpen();
	}

  public onDeleteItinerary() {
		this.onDeleteComponent.itemDeleteItineraryModal.onModalOpen();
	}

}
