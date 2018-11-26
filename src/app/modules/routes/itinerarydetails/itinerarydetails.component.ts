import { Component, OnInit, Input, ElementRef,ViewChild} from '@angular/core';
import { ItinerarydetailsService } from '../../../shared/itinerarydetails.service';
import { ApiService } from '../../../shared/api.service';
import { ModalComponent } from '../../core-modal/modal/modal.component';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DataCountsService } from '../../../shared/data-counts.service';
import { RefreshDataService } from '../../../shared/refresh-data.service';

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
  itinerary_lists: any[];
  retailersToDelete: any[];
  datacount: number = 0;
  emptyRetailer: boolean = false;
  const_i_label: string;
  const_i_retailers: any[];
  private a_refresh = false;

  constructor(private itDetailsService: ItinerarydetailsService,private apiService: ApiService,private formBuilder: FormBuilder,  private data: DataCountsService, private data2: RefreshDataService) {
    this.createForm();
  }

  ngOnInit() {
    this.loading = false;
    this.selectedItinerary = '';
    this.selectedRetailers = [];
    this.BackupSelectedRetailers = [];
    this.itinerary_lists = [];
    this.retailers = [];
    this.retailersToDelete = [];
    this.scrollwidth();
  	//this.itineraryDetails = this.itDetailsService.getItineraryDetailsList();
    this.getItineraryDetailsFromAPI();
    this.getRetailers();
    this.data.currentManageItineraryCount.subscribe(datacount => this.datacount = datacount);
    this.data2.currentnewItinerary.subscribe(refresh => this.refreshList = refresh);
  }

  createForm() {
    this.editItineraryForm = this.formBuilder.group({
      itinerary_name: ['', Validators.required]
    });
  }

  @Input()
  set refreshList(refresh: boolean) {
    this.a_refresh = refresh;
    // alert('zxczx');
    this.refetchItineraryDetailsFromAPI();
  }
  get refreshList(): boolean { return this.a_refresh; }

  submitEditItineraryForm() {
    this.submitted = true;
    // stop here if form is invalid
    this.emptyRetailer = false;
    if (this.editItineraryForm.invalid) {
        return;
    }

    this.apiService.get('itineraries/'+this.selectedItinerary+'/lists/')
		.subscribe(itinerary => {
      var data = JSON.parse(JSON.stringify(itinerary));
      if(Object.values(data)[1] != 4005) {
        //alert(data.message);
        //console.log(data.data);
        // this.itinerary_lists = Object.values(data.data);
        var i_details = Object.values(data.data);
        var same = true;
        // console.log(i_details);
        // console.log(this.selectedRetailers);
        i_details.forEach(function(i){
          // console.log(i_details.length);
          // console.log(this.selectedRetailers.length);
          // console.log('---');
          // console.log('--itinerary--');
          // console.log(i.itinerary);
          var it = i['itinerary'];
          var ret = Object.keys(i['retailer']);
          // console.log(ret);
          var selRet = this.selectedRetailers;
          if((it['name'] != this.editItineraryForm.get('itinerary_name').value) || (i_details.length != this.selectedRetailers.length)) {
            same = false;
          }
          else {
            ret.forEach(function(r){
              var match = false;
              selRet.forEach(function(s){
                if(r['id'] == s['id']) {
                  match = true;
                }
              });
              if(!match) {
                same = false;
              }
            });
          }
        }, this);
        if(same) {
          // console.log('cads');
          return;
        }
        else {
          // console.log('sdkfksdp');

          let i_name = this.editItineraryForm.get('itinerary_name').value;
          var temp = this.selectedRetailers;
          let i_retailers = [];
          for(var x =0;x<temp.length;x++) {
            i_retailers.push(temp[x].id);
          }
          //delete retailers
          if(i_retailers.length <= 0) {
            this.emptyRetailer = true;
            return;
          }

          var to_delete_retailer = this.retailersToDelete;
          var lists = this.itinerary_lists;
          // console.log(i_retailers);

          if(to_delete_retailer.length > 0) {
            to_delete_retailer.forEach(function (r){
              var listId = '';
              lists.forEach(function(l){
                if(r == l.retailer_id) {
                  //
                  listId = l.id;
                }
              });
              //delete
              this.deleteRetailerToItineraryAPI(listId, i_retailers);
            }, this);
          }
          else {
            this.addRetailerCalculate(i_retailers);
          }


          //
          let itinerary = {};
          itinerary['name'] = i_name;
          // itinerary['retailers'] = i_retailers;
          let itinerary_json_string = JSON.stringify(itinerary);

          this.editItinerary(this.selectedItinerary, itinerary_json_string);
        }
      }
      else {
        // this.itinerary_lists = [];
      }
      //console.log(JSON.stringify(data[0].data));
    },
		(err) => {
			console.log(err);
		});

  }
  setRankingOfRetailers(i_retailers: any[]) {
    this.apiService.get('itineraries/'+this.selectedItinerary+'/lists/')
		.subscribe(itinerary => {
      var data = JSON.parse(JSON.stringify(itinerary));
      if(data['code'] == 4005) {
        this.itinerary_lists = [];
      }
      else {
        this.itinerary_lists = Object.values(data.data);
      }
        var i_lists = this.itinerary_lists;
        var rank = 1;
        i_retailers.forEach(function(r){
          var l_id = '';
          i_lists.forEach(function(i){
            if(r == i.retailer_id) {
              l_id = i.id;
            }
          });

          //update the rank of retailer
          var toUpdate = {};
          toUpdate['rank'] = rank;
          let rank_json_string = JSON.stringify(toUpdate);
          this.updateRankOfRetailerAPI(l_id, rank_json_string, rank, i_retailers.length);

          rank += 1;
        }, this);
    },
		(err) => {
			console.log(err);
		});
  }

  updateRankOfRetailerAPI(listId: string, json: string, rank: number, length: number) {
    if(listId) {
      this.apiService.patch('itineraries/'+this.selectedItinerary+'/lists/'+listId+'/', json)
      .subscribe((response) => {
        if(response['code'] == 2004 && response['message'] == 'Entry updated') {
          console.log('Success Rank!');
          if(rank == length) {
            // window.location.reload();
            this.refetchItineraryDetailsFromAPI();
            this.onUpdateItineraryClose();
          }
        }
        else {
          alert(response['code']+':'+response['message']);
        }
      });
    }
  }
  addRetailerCalculate(i_retailers: any[]) {
    //get the itinerary again
    this.apiService.get('itineraries/'+this.selectedItinerary+'/lists/')
		.subscribe(itinerary => {
      var data = JSON.parse(JSON.stringify(itinerary));
      if(data['code'] == 4005) {
        this.itinerary_lists = [];
      }
      else {
        this.itinerary_lists = Object.values(data.data);
      }
      // console.log('New Itinerary List');
      // console.log(this.itinerary_lists);
      //
      var lists = this.itinerary_lists;
      var new_retailer = [];
      i_retailers.forEach(function(r){
        var found = false;
        lists.forEach(function(l){
          if(r == l.retailer_id) {
            found = true;
          }
        });
        if(!found) {
          //new
          //must be add
          new_retailer.push(r);
        }
      });
      //new retailer
      console.log('new_retailer');
      console.log(new_retailer.length);
      if(new_retailer.length > 0) {
        let retToAdd = {};
        retToAdd['retailers'] = new_retailer;
        let retToAdd_json_string = JSON.stringify(retToAdd);
        console.log(new_retailer);
        this.addRetailerToItineraryAPI(retToAdd_json_string, i_retailers);
      }
      else {
        this.setRankingOfRetailers(i_retailers);
      }

    },
		(err) => {
			console.log(err);
		});

  }

  deleteRetailerToItineraryAPI(listId: string, i_retailers: any[]) {
    if(listId) {
      this.apiService.delete('itineraries/'+this.selectedItinerary+'/lists/'+listId+'/')
      .subscribe(response => {
        if(response['code'] == 2005 && response['message'] == 'Entry deleted') {
          console.log('Success Deleting!'+listId);

          this.addRetailerCalculate(i_retailers);
          this.setRankingOfRetailers(i_retailers);
        }
        else {
          alert(response['code']+':'+response['message']);
        }
      },
  		(err) => {
  			console.log(err);
  		});
    }
  }
  addRetailerToItineraryAPI(json: string, i_retailers: any[]) {
    this.apiService.post('itineraries/'+this.selectedItinerary+'/lists/', json)
    .subscribe((response) => {
      console.log(response['status']); // response status
      console.log(response['body']); // response body (returned response)
      if(response['status'] == 201 && response['statusText'] == 'Created') {
        console.log('Success Adding Retailers!');
        this.setRankingOfRetailers(i_retailers);
      }
      else {
        alert(response['status']+':'+response['statusText']);
      }
    });
  }

  getItineraryLists() {
    this.apiService.get('itineraries/'+this.selectedItinerary+'/lists/')
		.subscribe(itinerary => {
      var data = JSON.parse(JSON.stringify(itinerary));
      if(Object.values(data)[1] != 4005) {
        //alert(data.message);
        //console.log(data.data);
        this.itinerary_lists = Object.values(data.data);
      }
      else {
        this.itinerary_lists = [];
      }
      //console.log(JSON.stringify(data[0].data));
    },
		(err) => {
			console.log(err);
		});
  }

  editItinerary(ret: string, json: string) {

    this.apiService.patch('itineraries/'+ret+'/', json)
    .subscribe((response) => {
      if(response['code'] == 2004 && response['message'] == 'Entry updated') {
        alert('Success!');
        // window.location.reload();
        this.refetchItineraryDetailsFromAPI();
        this.onUpdateItineraryClose();
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
      this.data.changeManageItineraryCount(Object.values(data[0].data).length);
      this.itineraryDetails = Object.values(data[0].data);
      //console.log(JSON.stringify(data[0].data));
      this.loading = false;
    },
		(err) => {
			console.log(err);
		});
  }
  refetchItineraryDetailsFromAPI() {
    this.apiService.get('itineraries/')
		.subscribe(itinerary => {
      let data: any[] = JSON.parse('['+JSON.stringify(itinerary)+']');
      //console.log(Object.values(data));
      //alert(data.message);
      //console.log(data.data);
      this.data.changeManageItineraryCount(Object.values(data[0].data).length);
      this.itineraryDetails = Object.values(data[0].data);
      //console.log(JSON.stringify(data[0].data));
      // this.loading = false;
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
        // window.location.reload();
        this.refetchItineraryDetailsFromAPI();
        this.onDeleteItineraryClose();
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
    this.retailersToDelete.push(parseInt(value));
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
        //console.log(this.retailers[0].data);
        for(var x=0;x<temp.length;x++) {
          if(temp[x].id == value) {
            this.selectedRetailers.push(temp[x]);
          }
        }

        this.emptyRetailer = false;
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
    if(this.searchQuery == '') {
      this.data.changeManageItineraryCount(this.itineraryDetails.length);
    }
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
    this.emptyRetailer = false;
    var editForm = <HTMLFormElement>document.getElementById('editItineraryForm');
    editForm.reset();
    this.editItineraryForm.reset();
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
    this.const_i_label = this.editItineraryForm.get('itinerary_name').value;
    this.const_i_retailers = this.selectedRetailers;

    console.log(this.editItineraryForm.get('itinerary_name').value);
    console.log(this.selectedRetailers);
    this.getItineraryLists();
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
