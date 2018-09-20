import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
//import { RetailerdataService } from '../../../shared/retailerdata.service';
import { ModalComponent } from '../../../modules/core-modal/modal/modal.component';


import { RetailerService } from '../retailer-service';
import { Retailer } from '../retailer.model';

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

  arrRetailers2: any[];

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


//constructor(private itDetailsService: ItinerarydetailsService) { }
constructor(private itRetailerService: RetailerService) { }

ngOnInit() {
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
  //process filter for approval only

  this.retailerCount = this.arrRetailers2[0].data.length;
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

openEditModal() {
  this.editDialog.onModalOpen();
}
closeEditModal() {
  this.editDialog.onModalClose();
}
openDeleteModal() {
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
