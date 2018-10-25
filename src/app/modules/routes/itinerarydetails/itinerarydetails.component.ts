import { Component, OnInit, Input, ElementRef,ViewChild} from '@angular/core';
import { ItinerarydetailsService } from '../../../shared/itinerarydetails.service';
import { ApiService } from '../../../shared/api.service';
import { ModalComponent } from '../../core-modal/modal/modal.component';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-itinerarydetails',
  templateUrl: './itinerarydetails.component.html',
  styleUrls: ['./itinerarydetails.component.css']
})
export class ItinerarydetailsComponent implements OnInit {
  editItineraryForm: FormGroup;
  submitted = false;
  loading: boolean;
  @ViewChild('onUpdateComponent') onUpdateComponent: ModalComponent;
  @ViewChild('onDeleteComponent') onDeleteComponent: ModalComponent;

  itineraryDetails = [];
  order: string = 'name';
  reverse: boolean = false;
  type: string = 'asc';
  selectedItinerary: string;
  public filterSearchQuery: string = '';
	public searchQuery: string = '';
  public itemsPerPage: number = 5;
  idetails: any[];
  selectedRetailers: any[];
  BackupSelectedRetailers: any[];
  selectedRet: string;
  retailers: any[];
  constructor(private itDetailsService: ItinerarydetailsService,private apiService: ApiService,private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.loading = false;
    this.selectedItinerary = '';
    this.selectedRetailers = [];
    this.BackupSelectedRetailers = [];
    this.retailers = [];
    this.scrollwidth();
  	//this.itineraryDetails = this.itDetailsService.getItineraryDetailsList();
    this.getItineraryDetailsFromAPI();
    this.getRetailers();
  }

  createForm() {
    this.editItineraryForm = this.formBuilder.group({
      itinerary_name: ['', Validators.required]
    });
  }

  submitEditItineraryForm() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.editItineraryForm.invalid) {
        return;
    }

    let i_name = this.editItineraryForm.get('itinerary_name').value;
    var temp = this.selectedRetailers;
    let i_retailers = [];
    for(var x =0;x<temp.length;x++) {
      i_retailers.push(temp[x].id);
    }
    let itinerary = {};
    itinerary['name'] = i_name;
    itinerary['retailers'] = i_retailers;
    console.log(i_retailers);
    let itinerary_json_string = JSON.stringify(itinerary);
    this.editItinerary(this.selectedItinerary, itinerary_json_string);
  }
  editItinerary(ret: string, json: string) {

    this.apiService.patch('itineraries/'+ret+'/', json)
    .subscribe((response) => {
      if(response['code'] == 2004 && response['message'] == 'Entry updated') {
        alert('Success!');
        window.location.reload();
      }
      else {
        alert(response['code']+':'+response['message']);
      }
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.editItineraryForm.controls; }

  getItineraryDetailsFromAPI() {
    this.loading = true;
    this.apiService.get('itineraries/')
		.subscribe(itinerary => {
      let data: any[] = JSON.parse('['+JSON.stringify(itinerary)+']');
      //console.log(Object.values(data));
      //alert(data.message);
      //console.log(data.data);
      this.itineraryDetails = Object.values(data[0].data);
      //console.log(JSON.stringify(data[0].data));
      this.loading = false;
    },
		(err) => {
			console.log(err);
		});
  }
  deleteItinerary(value: string) {
    this.deleteItineraryAPI('itineraries/'+this.selectedItinerary+'/');
  }
  deleteItineraryAPI(url: string) {
    this.apiService.delete(url)
    .subscribe(response => {
      if(response['code'] == 2005 && response['message'] == 'Entry deleted') {
        alert('Success!');
        window.location.reload();
      }
      else {
        alert(response['code']+':'+response['message']);
      }
    },
		(err) => {
			console.log(err);
		});
  }
  onRetaileRemove(value: string) {
    var ret = this.selectedRetailers;
    for(var i=0;i<ret.length;i++) {
      if(ret[i].id == value) {
        this.selectedRetailers.splice(i, 1);
      }
    }
  }

  getRetailers() {
    this.apiService.get('retailers/')
		.subscribe(ret => {
      let data: any[] = JSON.parse('['+JSON.stringify(ret)+']');
      //console.log(Object.values(data));
      //alert(data.message);
      //console.log(data.data);
      this.retailers = Object.values(data);
    },
		(err) => {
			console.log(err);
		});
  }

  onRetailerSelect(id: string) {
    this.selectedRet = id;
  }
  addRetailer(value: string) {
    if(this.selectedRet) {
      var temp1 = this.selectedRetailers;
      var alreadyExist = false;

      for(var x=0;x<temp1.length;x++) {
        if(temp1[x].id == value) {
            alreadyExist = true;
        }
      }
      if(!alreadyExist) {

        var temp = this.retailers[0].data;
        console.log(this.retailers[0].data);
        for(var x=0;x<temp.length;x++) {
          if(temp[x].id == value) {
            this.selectedRetailers.push(temp[x]);
          }
        }
      }

    }

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
  public onUpdateItineraryOpen(value: string) {
    this.selectedItinerary = value;
    var temp = this.itineraryDetails;
    this.selectedRetailers = [];
    for(var x =0;x<this.itineraryDetails.length;x++) {
      if(temp[x].id == value) {
        this.editItineraryForm.get('itinerary_name').setValue(temp[x].name);
        var tmp = temp[x].retailers;
        for(var y=0;y<tmp.length;y++) {
          this.selectedRetailers.push(tmp[y]);
          this.BackupSelectedRetailers.push(tmp[y]);
        }
      }
    }
    console.log(this.selectedRetailers);
		this.onUpdateComponent.onModalOpen();
	}

  public onUpdateItineraryClose() {
    this.selectedRetailers = [];
    this.selectedRetailers = this.BackupSelectedRetailers;
		this.onUpdateComponent.onModalClose();
	}

  public onDeleteItineraryOpen(value: string) {
    this.selectedItinerary = value;
		this.onDeleteComponent.onModalOpen();
	}

  public onDeleteItineraryClose() {
		this.onDeleteComponent.onModalClose();
	}

  // ------------------------------ other functions --------------------------

  public scrollwidth(){
    $('table').on('scroll', function () {
      $("table > *").width($("table").width() + $("table").scrollLeft());
    });
	}

}
