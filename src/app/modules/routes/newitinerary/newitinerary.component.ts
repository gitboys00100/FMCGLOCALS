import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../core-modal/modal/modal.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../shared/api.service';
import { environment } from "../../../../environments/environment";


@Component({
  selector: 'app-newitinerary',
  templateUrl: './newitinerary.component.html',
  styleUrls: ['./newitinerary.component.css'],
  providers: []
})
export class NewitineraryComponent implements OnInit {
  newItineraryForm: FormGroup;
  submitted = false;

  @ViewChild('itineraryCreateModal') itineraryCreateModal : ModalComponent;
  retailers: any[];
  arrRetailers: any[];
  selectedRetailers: any[];
  selectedRetIds: any[];
  selectedRet: string;
  noRetailer: boolean = false;
  validRetBox: boolean = false;
  constructor(private apiService: ApiService, private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.getRetailers();
    this.selectedRetailers = [];
    this.selectedRetIds = [];
  }
  createForm() {
    this.newItineraryForm = this.formBuilder.group({
      itinerary_name: ['', Validators.required],
      retailers: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.newItineraryForm.controls; }
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
  addRetailer(id: string){
    //alert(this.retailers[0].data[0].name+'sad');
    var retName: string;
    var ret = this.retailers[0].data;
    for(var i=0;i<ret.length;i++) {
      //alert(ret[i].name);
      if(id == ret[i].id) {
        retName = ret[i].name;
      }
    }
    var toPush = {};
    toPush['id'] = id;
    toPush['name'] = retName;
    //check selected retailer
    var alreadySelected: boolean = false;
    for(var i=0;i<this.selectedRetailers.length;i++) {
      if(this.selectedRetailers[i].id == id) {
        alreadySelected = true;
      }
    }
    if((id) && (retName) && (!alreadySelected)) {
      this.selectedRetailers.push(toPush);
      this.selectedRetIds.push(parseInt(id));
      this.newItineraryForm.get('retailers').setValue(this.selectedRetIds);
      this.noRetailer = true;
      console.log(this.selectedRetIds);
    }
    if(this.selectedRetIds.length > 0) {
      //this.f.retailers.errors = null;
      this.validRetBox = true;
    }
    else {
      this.validRetBox = false;
    }
  }
  onRetaileRemove(id: string) {
    var ret = this.selectedRetailers;
    for(var i=0;i<ret.length;i++) {
      if(ret[i].id == id) {
        this.selectedRetailers.splice(i, 1);
        this.selectedRetIds.splice(i, 1);
      }
    }
    if(ret.length == 0) {
      this.noRetailer = false;
    }

    if(this.selectedRetIds.length > 0) {
      this.validRetBox = true;
    }
    else {
      this.validRetBox = false;
      //this.f.retailers.errors = {}  ;
      this.newItineraryForm.get('retailers').setValue(null);
    }
  }
  submitItineraryForm() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.newItineraryForm.invalid) {
        return;
    }
    let i_name = this.newItineraryForm.get('itinerary_name').value;
    let i_retailers = this.newItineraryForm.get('retailers').value;
    let i_user = environment.user_id; //this should be the id of user login
    let itinerary = {};
    itinerary['user_id'] = i_user;//
    itinerary['name'] = i_name;
    itinerary['retailers'] = i_retailers;
    let itinerary_json_string = JSON.stringify(itinerary);
    this.createItinerary('itineraries/', itinerary_json_string);
  }
  createItinerary(url: string, load: string) {
    this.apiService.post(url, load)
		.subscribe((response) => {
      console.log(response['status']); // response status
      console.log(response['body']); // response body (returned response)
      if(response['status'] == 201 && response['statusText'] == 'Created') {
        alert('Success!');
        window.location.reload();
      }
      else {
        alert(response['status']+':'+response['statusText']);
      }
    });
  }
  onRetailerSelect(id: string) {
    this.selectedRet = id;
  }
  openModal() {
    this.itineraryCreateModal.onModalOpen();
  }

  closeModal() {
    this.itineraryCreateModal.onModalClose();
  }

}
