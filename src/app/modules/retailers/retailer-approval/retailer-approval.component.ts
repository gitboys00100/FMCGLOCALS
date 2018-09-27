import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../modules/core-modal/modal/modal.component';
import { ApiService } from '../../../shared/api.service';

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
  agentsList: any[];
  toApproved: string;
  toDenied: string;

  public filterSearchQuery: string = '';
  public searchQuery: string = '';
	public itemsPerPage: number = 5;
  constructor(private apiService: ApiService) {

  }

  ngOnInit() {
    this.agents = 'All';

    //process filter for approval only
    /*
    for(let ret in this.arrRetailers2[0].data) {
      if(this.arrRetailers2[0].data[ret].status == 'For Approval') {
      }
      else if (this.arrRetailers2[0].data[ret].status == 'ACTIVE') {
        this.arrRetailers2[0].data.splice(ret, ret + 1);
      }
    }*/

    this.getAgents();
    this.getRetailers();
    this.getUserRetailers();
  }
  getUserRetailers() {
    this.apiService.get('users/retailers/')
    .subscribe(ret => {
      let data: any[] = JSON.parse('['+JSON.stringify(ret)+']');
      //console.log(Object.values(data));
      //alert(data.message);
      //console.log(data.data);

      console.log(Object.values(data));
    },
    (err) => {
      console.log(err);
    });
  }
  getAgents() {
    this.apiService.get('users/')
		.subscribe(ret => {
      let data: any[] = JSON.parse('['+JSON.stringify(ret)+']');
      //console.log(Object.values(data));
      //alert(data.message);
      //console.log(data.data);
      this.agentsList = Object.values(data);
    },
		(err) => {
			console.log(err);
		});
  }
  getRetailers() {
    this.apiService.get('retailers/?status=0')
		.subscribe(ret => {
      let data: any[] = JSON.parse('['+JSON.stringify(ret)+']');
      //console.log(Object.values(data));
      //alert(data.message);
      //console.log(data.data);
      this.arrRetailers2 = Object.values(data);
      this.retailerCount = this.arrRetailers2[0].data.length;
      console.log(this.arrRetailers2);
    },
		(err) => {
			console.log(err);
		});
  }
  approveRetailer() {
    let retailer = {};
    retailer['retailer_id'] = this.toApproved;
    retailer['status'] = '1';
    let retailer_json_string = JSON.stringify(retailer);
    //alert(retailer_json_string);
    this.updateRetailer(this.toApproved, retailer_json_string);
  }
  denyRetailer() {
    let retailer = {};
    retailer['retailer_id'] = this.toDenied;
    retailer['status'] = '2';
    let retailer_json_string = JSON.stringify(retailer);
    //alert(retailer_json_string);
    this.updateRetailer(this.toDenied, retailer_json_string);
  }
  updateRetailer(ret: string, json: string) {
    this.apiService.patch('retailers/'+ret+'/', json)
    .subscribe((response) => {
      if(response['code'] == 2004 && response['message'] == 'Entry updated') {
        alert('Success!');
      }
      else {
        alert(response['code']+':'+response['message']);
      }
    });
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

  openConfirmationModal(retailerId: string) {
    this.toApproved = retailerId;
    this.confirmationDialog.onModalOpen();
  }
  closeConfirmationModal() {
    this.confirmationDialog.onModalClose();
  }
  openCancelModal(retailerId: string) {
    this.toDenied = retailerId;
    this.cancelDialog.onModalOpen();
  }
  closeCancelModal() {
    this.cancelDialog.onModalClose();
  }
}
