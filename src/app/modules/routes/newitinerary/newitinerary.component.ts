import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../core-modal/modal/modal.component';

@Component({
  selector: 'app-newitinerary',
  templateUrl: './newitinerary.component.html',
  styleUrls: ['./newitinerary.component.css']
})
export class NewitineraryComponent implements OnInit {
  @ViewChild('itineraryCreateModal') itineraryCreateModal : ModalComponent;
  retailers: any[];
  arrRetailers: any[];
  selectedRetailers: any[];
  selectedRet: string;
  noRetailer: boolean = false;
  constructor() {
  }

  ngOnInit() {
    this.retailers = [
      {
      "status": "2001",
      "message":"Success",
      "data": [
        {
          "retailer_id": 1,
          "company_id": 1,
          "name": "Cha's Grocery",
          "agent": "Juan Miguel Severro",
          "owner": "Cha WWww",
          "coordinates": "16.1234567,96.0004",
          "credit_limit": 3000000,
          "current_credit": 3000,
          "status": "ACTIVE",
          "image": "images/retailers/ratailer_4.jpg",
          "house_number": "Unit 4, Random Building",
          "street_name": "Bo Yar Nyunt St",
          "township": "Yangon",
          "country": "Myanmar"
        },
        {
          "retailer_id": 2,
          "company_id": 1,
          "name": "John Doe's HyperMarket",
          "agent": "Juan Ponce Enrile",
          "owner": "Dr. Doom",
          "coordinates": "16.1234567,96.0004",
          "credit_limit": 3000000,
          "current_credit": 3000,
          "status": "For Approval",
          "image": "images/retailers/ratailer_4.jpg",
          "house_number": "Unit 5, Twin Tower",
          "street_name": "Deathe Metal St",
          "township": "Dangon",
          "country": "Myanmar"
        },
        {
          "retailer_id": 3,
          "company_id": 2,
          "name": "Emily's Guitar Shop",
          "agent": "Mike Dirnt",
          "owner": "Billie Joe Armstrong",
          "coordinates": "16.1234567,96.0004",
          "credit_limit": 3000000,
          "current_credit": 3000,
          "status": "For Approval",
          "image": "images/retailers/ratailer_4.jpg",
          "house_number": "no. 34, RockWell",
          "street_name": "Park You St",
          "township": "Manila",
          "country": "Philippines"
        },
        {
          "retailer_id": 4,
          "company_id": 2,
          "name": "Bagoong at Katol Workshop",
          "agent": "Kardo Dalisay",
          "owner": "Pepito Manaloto",
          "coordinates": "16.1234567,96.0004",
          "credit_limit": 3000000,
          "current_credit": 3000,
          "status": "For Approval",
          "image": "images/retailers/ratailer_4.jpg",
          "house_number": "Lot 2245",
          "street_name": "Di Mahagilap St.",
          "township": "Quezon City",
          "country": "Philippines"
        },
        {
          "retailer_id": 5,
          "company_id": 2,
          "name": "Aling Nena's Store",
          "agent": "Ely Buendia",
          "owner": "Johny Lennon",
          "coordinates": "16.1234567,96.0004",
          "credit_limit": 3000000,
          "current_credit": 3000,
          "status": "For Approval",
          "image": "images/retailers/ratailer_4.jpg",
          "house_number": "#65 ",
          "street_name": "Skyway Avenue",
          "township": "Atlantis",
          "country": "Philippines"
        },
        {
          "retailer_id": 6,
          "company_id": 2,
          "name": "Rakista Laundry Shop",
          "agent": "Boy Kulot",
          "owner": "TinkerBell",
          "coordinates": "16.1234567,96.0004",
          "credit_limit": 3000000,
          "current_credit": 3000,
          "status": "For Approval",
          "image": "images/retailers/ratailer_4.jpg",
          "house_number": "lot 34-34",
          "street_name": "Dr. Sixtio St.",
          "township": "Manila",
          "country": "Philippines"
        }
      ],
      "pagination": {
          "offset": 20,
          "limit": 10,
          "total": 1
        }
      }
    ];
    this.selectedRetailers = [];
  }
  addRetailer(retailer_id: string){
    //alert(this.retailers[0].data[0].name+'sad');
    var retName: string;
    var ret = this.retailers[0].data;
    for(var i=0;i<ret.length;i++) {
      //alert(ret[i].name);
      if(retailer_id == ret[i].retailer_id) {
        retName = ret[i].name;
      }
    }
    var toPush = {};
    toPush['retailer_id'] = retailer_id;
    toPush['name'] = retName;
    //check selected retailer
    var alreadySelected: boolean = false;
    for(var i=0;i<this.selectedRetailers.length;i++) {
      if(this.selectedRetailers[i].retailer_id == retailer_id) {
        alreadySelected = true;
      }
    }
    if((retailer_id) && (retName) && (!alreadySelected)) {
      this.selectedRetailers.push(toPush);
      this.noRetailer = true;
    }
  }
  onRetaileRemove(retailer_id: string) {
    var ret = this.selectedRetailers;
    for(var i=0;i<ret.length;i++) {
      if(ret[i].retailer_id == retailer_id) {
        this.selectedRetailers.splice(i, 1);
      }
    }
    if(ret.length == 0) {
      this.noRetailer = false;
    }
    console.log(this.selectedRetailers);
  }

  onRetailerSelect(retailer_id: string) {
    this.selectedRet = retailer_id;
  }
  openModal() {
    this.itineraryCreateModal.onModalOpen();
  }

  closeModal() {
    this.itineraryCreateModal.onModalClose();
  }

}
