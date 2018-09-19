import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../modules/core-modal/modal/modal.component';

@Component({
  selector: 'app-retailer-approval',
  templateUrl: './retailer-approval.component.html',
  styleUrls: ['./retailer-approval.component.css']
})
export class RetailerApprovalComponent implements OnInit {
  @ViewChild('confirmationDialog') confirmationDialog: ModalComponent;
  @ViewChild('cancelDialog') cancelDialog: ModalComponent;

  arrRetailers: any[];
  arrRetailers2: any[];
  order: string = 'store_name';
  reverse: boolean = false;
  reverseName: boolean = false;
  reverseOwner: boolean = false;
  reverseAgent: boolean = false;
  reverseHouseNumber: boolean = false;
  name: boolean = false;
  owner: boolean = false;
  house_number: boolean = false;
  agent: boolean = false;
  retailerCount: number;

  today: number = Date.now();
  selectedDate: number;
  pipeStatus: number = 0;
  datacount: number = 0;
  agents: string;

  public filterSearchQuery: string = '';
  public searchQuery: string = '';
	public itemsPerPage: number = 5;

  ngOnInit() {
    this.agents = 'All';
    this.arrRetailers =  [
      {"store_name": "FMCG Store","person": "John","address":"Yangon Myanmar","agent": "agent_1", size: 2120109},
      {"store_name": "SM Store","person": "Jake","address": "Bagan Myanmar","agent": "agent_2", size: 2120109},
      {"store_name": "Store 2","person": "Jane","address": "Malanday Myanmar","agent": "agent_3", size: 2120109},
      {"store_name": "Store 3","person":"Jean","address": "Pathein Myanmar","agent": "agent_4", size: 2120109},
      {"store_name": "Store 4","person": "Jack","address": "Monywa Myanmar","agent": "agent 5", size: 2120109},
    ];
    this.arrRetailers2 = [
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
        },
        {
          "retailer_id": 7,
          "company_id": 2,
          "name": "Sari Sari Store ni Eugene",
          "agent": "Master Jeremiah",
          "owner": "Sensui",
          "coordinates": "16.1234567,96.0004",
          "credit_limit": 3000000,
          "current_credit": 3000,
          "status": "For Approval",
          "image": "images/retailers/ratailer_4.jpg",
          "house_number": "#999",
          "street_name": "San Antonio",
          "township": "Manila",
          "country": "Philippines"
        },
        {
          "retailer_id": 8,
          "company_id": 2,
          "name": "Were-Warehouse",
          "agent": "Dr. Mundo",
          "owner": "Jax",
          "coordinates": "16.1234567,96.0004",
          "credit_limit": 3000000,
          "current_credit": 3000,
          "status": "For Approval",
          "image": "images/retailers/ratailer_4.jpg",
          "house_number": "lot 23-23",
          "street_name": "Rada St..",
          "township": "Makati",
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
    //process filter for approval only
    for(let ret in this.arrRetailers2[0].data) {
      if(this.arrRetailers2[0].data[ret].status == 'For Approval') {
      }
      else if (this.arrRetailers2[0].data[ret].status == 'ACTIVE') {
        this.arrRetailers2[0].data.splice(ret, ret + 1);
      }
    }
    this.retailerCount = this.arrRetailers2[0].data.length;
  }

  public onShowCountChange($event) {
		this.itemsPerPage = $event.target.value;
	}
  setAgent(a: string) {
    this.agents = a;
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

  findForApproval(array: any[]) {

  }
  setRetailerOrder(value: string, caret_name: string) {
    if(this.order === value) {
      this.reverse = !this.reverse;
      if(caret_name == 'name') {
        this.reverseName = !this.reverseName;
      }
      else if(caret_name == 'owner') {
        this.reverseOwner = !this.reverseOwner;
      }
      else if(caret_name == 'house_number') {
        this.reverseHouseNumber = !this.reverseHouseNumber;
      }
      else if(caret_name == 'agent') {
        this.reverseAgent = !this.reverseAgent;
      }
    }
    this.order = value;
    if(caret_name == 'name') {
      this.name = false;
      this.owner = false;
      this.house_number = false;
      this.agent = false;
      this.reverse = this.reverseName;
      this.reverseOwner = false;
      this.reverseHouseNumber = false;
      this.reverseAgent = false;
    }
    else if(caret_name == 'owner') {
      this.name = false;
      this.owner = false;
      this.house_number = false;
      this.agent = false;
      this.reverse = this.reverseOwner;
      this.reverseName = false;
      this.reverseHouseNumber = false;
      this.reverseAgent = false;
    }
    else if(caret_name == 'house_number') {
      this.name = false;
      this.owner = false;
      this.house_number = false;
      this.agent = false;
      this.reverse = this.reverseHouseNumber;
      this.reverseName = false;
      this.reverseOwner = false;
      this.reverseAgent = false;
    }
    else if(caret_name == 'agent') {
      this.name = false;
      this.owner = false;
      this.house_number = false;
      this.agent = false;
      this.reverse = this.reverseAgent;
      this.reverseName = false;
      this.reverseOwner = false;
      this.reverseHouseNumber = false;
    }
  }


  openConfirmationModal() {
    this.confirmationDialog.onModalOpen();
  }
  closeConfirmationModal() {
    this.confirmationDialog.onModalClose();
  }
  openCancelModal() {
    this.cancelDialog.onModalOpen();
  }
  closeCancelModal() {
    this.cancelDialog.onModalClose();
  }
}
