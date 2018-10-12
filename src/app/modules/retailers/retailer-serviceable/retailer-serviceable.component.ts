import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
//import { RetailerdataService } from '../../../shared/retailerdata.service';
import { ModalComponent } from '../../../modules/core-modal/modal/modal.component';

import { RetailerService } from '../retailer-service';
import { Retailer } from '../retailer.model';

import { ApiService } from '../../../shared/api.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-retailer-serviceable',
  templateUrl: './retailer-serviceable.component.html',
  styleUrls: ['./retailer-serviceable.component.css']
})
export class RetailerServiceableComponent implements OnInit {
//  @ViewChild('onNewItemComponent') onNewItemComponent: InventoryItemReturnComponent;
@ViewChild('editDialog') editDialog: ModalComponent;
@ViewChild('deleteDialog') deleteDialog: ModalComponent;
  public retailerList: Retailer[];
  public filterCategory: string = '';
  public filterSubCategory: string = '';
  public filterDate: string = '';
  public filterSearchQuery: string = '';
  public searchQuery: string = '';

  public id: string = '';
  public role: number = 0;
  public retailerName: string = '';

  //arrRetailers2: any[];
  public arrRetailers2: Array<{}> = [];

  order: string = 'name';
  reverse: boolean = false;

  name: boolean = false;
  owner: boolean = true;
  agent: boolean = true;
  street_name: boolean = true;
  country: boolean = true;
  township: boolean = true;

  retailerCount: number;

  public itemsPerPage: number = 5;

  public profileForm = this.fb.group({
      name: ['', Validators.required],
      owner: ['', Validators.required],
      limit: ['', Validators.required],
      street: ['', Validators.required],
      district: ['', Validators.required],
      region: ['', Validators.required],
    });

arrRetailers: any[];

//constructor(private itDetailsService: ItinerarydetailsService) { }
constructor(private itRetailerService: RetailerService, private apiService: ApiService, private fb: FormBuilder,) { }

ngOnInit() {

/*
  this.arrRetailers2 = [
    {
    "status": "2001",
    "message":"Success",
    "data": [
      {
    "retailer_id": 1,
    "company_id": 1,
    "name": "Cha's Grocery",
    "owner": "Cha WWww",
    "coordinates": "16.1234567,96.0004",
    "credit_limit": 3000000,
    "current_credit": 3000,
    "status": "ACTIVE",
    "image": "images/retailers/ratailer_4.jpg",
    "house_number": "Unit 4, Random Building",
    "street_name": "Bo Yar Nyunt St",
    "township": "Yangon",
    "country": "Myanmar",
    "agent": "RC"
    }
    ,
    {
  "retailer_id": 2,
  "company_id": 1,
  "name": "Cha's Grocery",
  "owner": "Cha WWww",
  "coordinates": "16.1234567,96.0004",
  "credit_limit": 3000000,
  "current_credit": 3000,
  "status": "ACTIVE",
  "image": "images/retailers/ratailer_4.jpg",
  "house_number": "Unit 4, Random Building",
  "street_name": "Bo Yar Nyunt St",
  "township": "Yangon",
  "country": "Myanmar",
  "agent": "RC"
  }
  ,
  {
"retailer_id": 1,
"company_id": 1,
"name": "Cha's Grocery",
"owner": "Cha WWww",
"coordinates": "16.1234567,96.0004",
"credit_limit": 3000000,
"current_credit": 3000,
"status": "ACTIVE",
"image": "images/retailers/ratailer_4.jpg",
"house_number": "Unit 4, Random Building",
"street_name": "Bo Yar Nyunt St",
"township": "Yangon",
"country": "Myanmar",
"agent": "RC"
}
,
{
"retailer_id": 1,
"company_id": 1,
"name": "Cha's Grocery",
"owner": "Cha WWww",
"coordinates": "16.1234567,96.0004",
"credit_limit": 3000000,
"current_credit": 3000,
"status": "ACTIVE",
"image": "images/retailers/ratailer_4.jpg",
"house_number": "Unit 4, Random Building",
"street_name": "Bo Yar Nyunt St",
"township": "Yangon",
"country": "Myanmar",
"agent": "RC"
}
,
{
"retailer_id": 1,
"company_id": 1,
"name": "Cha's Grocery",
"owner": "Cha WWww",
"coordinates": "16.1234567,96.0004",
"credit_limit": 3000000,
"current_credit": 3000,
"status": "ACTIVE",
"image": "images/retailers/ratailer_4.jpg",
"house_number": "Unit 4, Random Building",
"street_name": "Bo Yar Nyunt St",
"township": "Yangon",
"country": "Myanmar",
"agent": "RC"
}
,
{
"retailer_id": 1,
"company_id": 1,
"name": "Cha's Grocery",
"owner": "Cha WWww",
"coordinates": "16.1234567,96.0004",
"credit_limit": 3000000,
"current_credit": 3000,
"status": "ACTIVE",
"image": "images/retailers/ratailer_4.jpg",
"house_number": "Unit 4, Random Building",
"street_name": "Bo Yar Nyunt St",
"township": "Yangon",
"country": "Myanmar",
"agent": "RC"
}
,
{
"retailer_id": 1,
"company_id": 1,
"name": "Cha's Grocery",
"owner": "Cha WWww",
"coordinates": "16.1234567,96.0004",
"credit_limit": 3000000,
"current_credit": 3000,
"status": "ACTIVE",
"image": "images/retailers/ratailer_4.jpg",
"house_number": "Unit 4, Random Building",
"street_name": "Bo Yar Nyunt St",
"township": "Yangon",
"country": "Myanmar",
"agent": "RC"
}
,
{
"retailer_id": 1,
"company_id": 1,
"name": "Cha's Grocery",
"owner": "Cha WWww",
"coordinates": "16.1234567,96.0004",
"credit_limit": 3000000,
"current_credit": 3000,
"status": "ACTIVE",
"image": "images/retailers/ratailer_4.jpg",
"house_number": "Unit 4, Random Building",
"street_name": "Bo Yar Nyunt St",
"township": "Yangon",
"country": "Myanmar",
"agent": "Marlou"
}
,
{
"retailer_id": 1,
"company_id": 1,
"name": "Cha's Groc",
"owner": "Cha WWww",
"coordinates": "16.1234567,96.0004",
"credit_limit": 3000000,
"current_credit": 3000,
"status": "ACTIVE",
"image": "images/retailers/ratailer_4.jpg",
"house_number": "Unit 4, Random Building",
"street_name": "Bo Yar Nyunt St",
"township": "Yangon",
"country": "Myanmar",
"agent": "Tata"
}
    ],
    "pagination": {
        "offset": 20,
        "limit": 10,
        "total": 1
      }
    }
  ];
*/

  //process filter for approval only
  this.getRetailers();





}




getRetailers() {
  /*
  this.apiService.get('retailers/').subscribe(
    (terms) => {
      console.log(terms);
    },
    (err) => {
      console.log(err);
    }
  )
*/
this.apiService.get('retailers/?status=1')
.subscribe(ret => {
  let data: any[] = JSON.parse('['+JSON.stringify(ret)+']');
  console.log(Object.values(data));
  this.arrRetailers2 = Object.values(data);
  this.retailerCount = this.arrRetailers2.length;
  },
  (err) => {
    console.log(err);
  }
)

//console.log("aa");
//console.log(this.arrRetailers);

}




setRetailerOrder(value: string, caret_name: string) {
  if(this.order === value) {
    this.reverse = !this.reverse;
  }
  this.order = value;
  if(caret_name == 'name') {
    this.name = false;
    this.owner = true;
    this.agent = true;
    this.street_name = true;
    this.country = true;
    this.township = true;
  }
  else if(caret_name == 'owner') {
    this.name = true;
    this.owner = false;
    this.agent = true;
    this.street_name = true;
    this.country = true;
    this.township = true;
  }
  else if(caret_name == 'agent') {
    this.name = true;
    this.owner = true;
    this.agent = false;
    this.street_name = true;
    this.country = true;
    this.township = true;
  }
  else if(caret_name == 'street_name') {
    this.name = true;
    this.owner = true;
    this.agent = true;
    this.street_name = false;
    this.country = true;
    this.township = true;
  }
  else if(caret_name == 'country') {
    this.name = true;
    this.owner = true;
    this.agent = true;
    this.street_name = true;
    this.country = false;
    this.township = true;
  }
  else if(caret_name == 'township') {
    this.name = true;
    this.owner = true;
    this.agent = true;
    this.street_name = true;
    this.country = true;
    this.township = false;
  }
}

openEditModal(ret) {
  console.log(ret);
  this.id = ret.id;
  //this.role = ret.profile.role.id

  //alert(this.role);
  this.profileForm.get('name').setValue(ret.name);
  this.profileForm.get('owner').setValue(ret.owner);
  this.profileForm.get('limit').setValue(ret.credit_limit);
  this.profileForm.get('street').setValue(ret.street_name);
  this.profileForm.get('district').setValue(ret.township);
  this.profileForm.get('region').setValue(ret.country);

  this.editDialog.onModalOpen();
}

onSubmit(){

  let retdata = {};
      retdata['name'] = this.profileForm.get('name').value;
      retdata['owner'] = this.profileForm.get('owner').value;
      retdata['credit_limit'] = this.profileForm.get('limit').value;
      retdata['street_name'] = this.profileForm.get('street').value;
      retdata['township'] = this.profileForm.get('district').value;
      retdata['country'] = "Myanmar";

  let user_json_string = retdata;

  console.log(retdata);

  let e_link = 'retailers/'+this.id;
    this.apiService.patch(e_link,user_json_string).subscribe(ret => {
      let data: any[] = JSON.parse('['+JSON.stringify(ret)+']');
      console.log(Object.values(data));
      //this.retailerList = Object.values(data);
      alert('Update Successful');
      location.reload();
      },
      (err) => {
        console.log(err);
      }
    );

  this.editDialog.onModalClose();
}

closeEditModal() {
  this.editDialog.onModalClose();
}





onDeleteRetailer(){
  this.apiService.delete('retailers/'+this.id).subscribe(ret => {
    let data: any[] = JSON.parse('['+JSON.stringify(ret)+']');
    console.log(Object.values(data));
    //this.retailerList = Object.values(data);
    alert('Delete Successful');
    location.reload();
    },
    (err) => {
      console.log(err);
    }
  );

  this.deleteDialog.onModalClose();
}



openDeleteModal(ret) {
  this.id = ret.id;
  this.retailerName = ret.name;
  //alert(this.id);
  this.deleteDialog.onModalOpen();
}
closeDeleteModal() {
  this.deleteDialog.onModalClose();
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

}
