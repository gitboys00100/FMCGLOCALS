import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../modules/core-modal/modal/modal.component';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../shared/api.service';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

declare var google: any;

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

interface Location {
  lat: number;
  lng: number;
  viewport?: Object;
  zoom: number;
  address_level_1?: string;
  address_level_2?: string;
  address_country?: string;
  address_zip?: string;
  address_state?: string;
  marker?: Marker;
}


@Component({
  selector: 'app-new-retailer',
  templateUrl: './new-retailer.component.html',
  styleUrls: ['./new-retailer.component.css']
})
export class NewRetailerComponent implements OnInit {
  newRetailerForm: FormGroup;
  submitted = false;
  @ViewChild('newretailerCreateModal') newretailerCreateModal: ModalComponent;
  defaultImgPath: string;
  geocoder: any;
  public location:Location = {
    lat: 51.678418,
    lng: 7.809007,
    marker: {
      lat: 51.678418,
      lng: 7.809007,
      draggable: false
    },
    zoom: 5
  };
  agents: any[];
  house_number: string;
  street: string;
  @ViewChild(AgmMap) map: AgmMap;
  selectedFile: File;
  retailer_type: any[];

  constructor(public mapsApiLoader: MapsAPILoader,
              private zone: NgZone,
              private wrapper: GoogleMapsAPIWrapper,
              private apiService: ApiService,
              private formBuilder: FormBuilder,
              public http: HttpClient) {
    this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
    this.createForm();
  }

  ngOnInit() {
    this.defaultImgPath = '../../../assets/img/default-avatar.jpg';
    this.location.marker.draggable = false;
    this.retailer_type = [
      {"id": "1101", "name": "Wholesales Customer"},
      {"id": "1102", "name": "Sub Whole Sale Customer"},
      {"id": "1103", "name": "Dealer Customer"},
      {"id": "1104", "name": "Van Sale Customer"},
      {"id": "1105", "name": "Mobile Customer"},
      {"id": "1106", "name": "Export Customer"},
      {"id": "1107", "name": "Intercompany Customer"},
      {"id": "1108", "name": "Tea Shop Customer"},
      {"id": "1109", "name": "Supermarket Customer"},
      {"id": "1110", "name": "Kiosk"},
      {"id": "1111", "name": "Institutions"},
      {"id": "1112", "name": "Horeca"},
      {"id": "1113", "name": "Customer-Other"},
      {"id": "1114", "name": "Convenience Store Customer"}
    ];
    this.getAgents();

  }
  createForm() {
    this.newRetailerForm = this.formBuilder.group({
      store_name: ['', Validators.required],
      store_owner: ['', Validators.required],
      credit_limit: ['', Validators.required],
      agents: ['', Validators.required],
      image_name: ['', Validators.required],
      house_number_street: ['', Validators.required],
      street: ['', Validators.required],
      township: ['', Validators.required],
      country: ['', Validators.required],
      coordinates: ['', Validators.required],
      house_number: '',
      retailer_type: ['', Validators.required]
    });
  }

  checkIfEmpty(value: any) {
      if(!value) {
        return true;
      }
      return false;
  }
  // convenience getter for easy access to form fields
  get f() { return this.newRetailerForm.controls; }

  getAgents() {
    this.apiService.get('users/?role=Sales%20Agent')
		.subscribe(ret => {
      let data: any[] = JSON.parse('['+JSON.stringify(ret)+']');
      //console.log(Object.values(data));
      //alert(data.message);
      //console.log(data.data);
      this.agents = Object.values(data);
    },
		(err) => {
			console.log(err);
		});
  }
  convertToNegative() {
    var input = <HTMLInputElement>document.getElementById('credit_limit');
    // Listen for input event on numInput.
    var number = input.value;
    if(!isNaN(parseInt(number))) {
      var numberInInt = Math.abs(parseInt(number));
      var numberInString = numberInInt.toLocaleString();
      this.newRetailerForm.get('credit_limit').setValue(numberInString.toString());
    }
    else {
      this.newRetailerForm.get('credit_limit').setValue('');
    }
  }
  submitRetailerForm() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.newRetailerForm.invalid) {
        return;
    }
    let r_company_id = environment.company_id;
    let r_store_name = this.newRetailerForm.get('store_name').value;
    let r_owner = this.newRetailerForm.get('store_owner').value;
    let r_coordinates = this.newRetailerForm.get('coordinates').value;
    let r_credit_limit = this.newRetailerForm.get('credit_limit').value;
    let r_current_credit = 0.00;
    let r_status = 0;
    let r_image_path = this.newRetailerForm.get('image_name').value;
    let r_house_number = this.newRetailerForm.get('house_number').value;
    let r_street = this.newRetailerForm.get('street').value;
    let r_township = this.newRetailerForm.get('township').value;
    let r_country = this.newRetailerForm.get('country').value;
    let r_agent_id = this.newRetailerForm.get('agents').value;
    let r_retailer_type = this.newRetailerForm.get('retailer_type').value;

    let retailer = {};
    retailer['company_id'] = r_company_id;
    retailer['name'] = r_store_name;
    retailer['owner'] = r_owner;
    retailer['coordinates'] = r_coordinates;
    retailer['credit_limit'] = r_credit_limit.replace(/,/g, "");
    //retailer['current_credit'] = r_current_credit;
    retailer['status'] = r_status;
    retailer['image'] = r_image_path;
    retailer['house_number'] = r_house_number;
    retailer['street_name'] = r_street;
    retailer['township'] = r_township;
    retailer['country'] = r_country;
    retailer['retailer_type'] = r_retailer_type;
    let retailer_json_string = JSON.stringify(retailer);
    //this.uploadFileToServer();
    let r_id = this.createNewRetailer('retailers/', retailer_json_string, r_agent_id);
  }
  assignRetailerToAgent(url: string, load: string) {
    //this.apiService.post(url)
    this.apiService.post(url, load)
		.subscribe((response) => {
      console.log(response['status']); // response status
      console.log(response['body']); // response body (returned response)
      if(response['status'] == 201 && response['statusText'] == 'Created') {
        alert('Success assigning!');
        window.location.reload();
      }
      else {
        alert(response['status']+':'+response['statusText']);
      }
    });
  }
  createNewRetailer(url: string, load: string, agentId: string) {
    this.apiService.post(url, load)
		.subscribe((response) => {
      console.log(response['status']); // response status
      console.log(response['body']); // response body (returned response)
      if(response['status'] == 201 && response['statusText'] == 'Created') {
        alert('Success creating!');
        let ret_id = response['body']['data']['id'];

        let user_retailer = {};
        user_retailer['user_id'] = agentId;
        user_retailer['retailer_id'] = ret_id;
        let user_retailer_json_string = JSON.stringify(user_retailer);
        this.assignRetailerToAgent('users/retailers/', user_retailer_json_string);
      }
      else {
        alert(response['status']+':'+response['statusText']);
      }
    });
  }
  uploadFileToServer() {
    this.http.post('assets/img/', this.selectedFile, {
      reportProgress: true,
      observe: 'events'
    })
    .subscribe(event => {
      console.log(event);
    });

  }
  setHouseNumber(value: string) {
    if(!isNaN(parseInt(value))) {
      var numberInInt = Math.abs(parseInt(value));
      this.newRetailerForm.get('house_number').setValue(numberInInt);
    }
    else {
      var numberInInt = Math.abs(parseInt(value));
      if(isNaN(numberInInt)) {
        this.newRetailerForm.get('house_number').setValue(null);
      }
      else {
        this.newRetailerForm.get('house_number').setValue(numberInInt);
      }
    }
    this.house_number = value;
    let h = '';
    let s = '';
    if(this.house_number) {
      h = this.house_number;
    }
    if(this.street) {
      s = this.street;
    }
    this.location.address_level_1 = h+' '+s;
    this.newRetailerForm.get('house_number_street').setValue(h+' '+s);
    this.updateOnMap();
    this.getCoordinates();
  }
  setStreet(value: string) {
    this.street = value;
    let h = '';
    let s = '';
    if(this.house_number) {
      h = this.house_number;
    }
    if(this.street) {
      s = this.street;
    }
    this.location.address_level_1 = h+' '+s;
    this.newRetailerForm.get('house_number_street').setValue(h+' '+s);
    this.updateOnMap();
    this.getCoordinates();
  }
  setTownship(value: string) {
    this.newRetailerForm.get('township').setValue(value);
    this.getCoordinates();
  }
  setCountry(value: string) {
    this.newRetailerForm.get('country').setValue(value);
    this.getCoordinates();
  }
  setImage(event) {
    var path = (<HTMLInputElement>document.getElementById('file-input-upload')).value;
    var filename = path.replace(/^.*\\/, "");
    this.newRetailerForm.get('image_name').setValue('images/retailers/'+filename);
    this.selectedFile = event.target.files[0];
    if(event.target.files[0].type.match('image')) {
      //alert('this is image');
    }
    else {
      this.newRetailerForm.get('image_name').setValue('');
      //alert('this is not image');
    }
    console.log(event);
  }
  getCoordinates() {
    this.newRetailerForm.get('coordinates').setValue(this.location.lat+', '+this.location.lng);
  }
  updateOnMap() {
    let full_address:string = this.location.address_level_1 || ""
    if (this.location.address_level_2) full_address = full_address + " " + this.location.address_level_2
    if (this.location.address_state) full_address = full_address + " " + this.location.address_state
    if (this.location.address_country) full_address = full_address + " " + this.location.address_country
    this.findLocation(full_address);
  }
  findLocation(address) {
    if (!this.geocoder) this.geocoder = new google.maps.Geocoder()
    this.geocoder.geocode({
      'address': address
    }, (results, status) => {
      console.log(results);
      if (status == google.maps.GeocoderStatus.OK) {
        for (var i = 0; i < results[0].address_components.length; i++) {
          let types = results[0].address_components[i].types

          if (types.indexOf('locality') != -1) {
            if(this.location.address_level_2 == '') {
              this.location.address_level_2 = results[0].address_components[i].long_name
            }
          }
          if (types.indexOf('country') != -1) {
            if(this.location.address_country == '') {
              this.location.address_country = results[0].address_components[i].long_name
            }
          }
          if (types.indexOf('postal_code') != -1) {
            this.location.address_zip = results[0].address_components[i].long_name
          }
          if (types.indexOf('administrative_area_level_1') != -1) {
            this.location.address_state = results[0].address_components[i].long_name
          }
        }

        if (results[0].geometry.location) {
          this.location.lat = results[0].geometry.location.lat();
          this.location.lng = results[0].geometry.location.lng();
          this.location.marker.lat = results[0].geometry.location.lat();
          this.location.marker.lng = results[0].geometry.location.lng();
          this.location.marker.draggable = false;
          this.location.viewport = results[0].geometry.viewport;
        }

        this.map.triggerResize()
      } else {
        //alert("Sorry, this search produced no results.");
      }
    })
  }

  openModal() {
    this.newretailerCreateModal.onModalOpen();
  }
  closeModal() {
    this.newretailerCreateModal.onModalClose();
  }
  resetForm() {
    var image = <HTMLInputElement>document.getElementById('profile_image');
    image.src = this.defaultImgPath;
    //this.newRetailerForm.reset();
    var form = <HTMLFormElement>document.getElementById('newRetailerForm');
    form.reset();
    this.submitted = false;
  }

}
