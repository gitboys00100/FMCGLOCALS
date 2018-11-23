import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../modules/core-modal/modal/modal.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../shared/api.service';

@Component({
  selector: 'app-agentitinerary',
  templateUrl: './agentitinerary.component.html',
  styleUrls: ['./agentitinerary.component.css']
})
export class AgentitineraryComponent implements OnInit {
  editRetailerDetails: FormGroup;
  submitted = false;
  unassignRetailers: any[];
  itineraryListWithRank: any[];

  @ViewChild('deleteConfirmation') deleteConfirmation: ModalComponent;
  @ViewChild('editModal') editModal: ModalComponent;
  @ViewChild('editDetailsModal') editDetailsModal: ModalComponent;
  selectedRetailer: string;
  itineraryOrder: any[];
  selectedItinerary: string;

  @Input() itinerary;
  constructor(private elRef: ElementRef, private formBuilder: FormBuilder, private apiService: ApiService) {
    this.createForm();
  }

  public isOpen: boolean = false;

  ngOnInit() {
    this.getUnassignRetailers();
    this.selectedItinerary =  '';
    this.itineraryOrder = [];
    this.itineraryListWithRank = [];
  }

  createForm() {
    this.editRetailerDetails = this.formBuilder.group({
      retailer: '',
      number_of_items: '',
      balance: ''
    });
  }

  getUnassignRetailers() {
    this.apiService.get('retailers/')
		.subscribe(ret => {
      let data: any[] = JSON.parse('['+JSON.stringify(ret)+']');
      //console.log(Object.values(data));
      //alert(data.message);
      //console.log(data.data);
      this.unassignRetailers = Object.values(data);
    },
		(err) => {
			console.log(err);
		});
  }


  // convenience getter for easy access to form fields
  get f() { return this.editRetailerDetails.controls; }

  openEditModal(value: string) {
    this.selectedItinerary = value;

    for(var x=0;x<this.itinerary.retailers.length;x++) {
      var temp = {};
      temp['order'] = x+1;
      temp['id'] = this.itinerary.retailers[x].id
      this.itineraryOrder.push(temp);
    }

    this.getItineraryList(this.selectedItinerary);

    this.editModal.onModalOpen();
  }
  closeEditModal() {
    this.editModal.onModalClose();
  }

  openDeleteConfirmationModal(value: string) {
    this.selectedItinerary = value;
    this.deleteConfirmation.onModalOpen();
  }
  deleteItinerary() {
    this.deleteItineraryAPI('itineraries/'+this.selectedItinerary+'/');
  }
  deleteItineraryAPI(url: string) {
    this.apiService.delete(url)
		.subscribe((response) => {
      if(response['code'] == 2005 && response['message'] == 'Entry deleted') {
        alert('Success!');
        window.location.reload();
      }
      else {
        alert(response['code']+':'+response['message']);
      }
    });
  }
  updateItineraryOrder() {
    this.itineraryOrder = [];
    for(var x=0;x<this.itinerary.retailers.length;x++) {
      var temp = {};
      temp['order'] = x+1;
      temp['id'] = this.itinerary.retailers[x].id
      this.itineraryOrder.push(temp);
    }
    //console.log(this.itineraryOrder);
    var order = this.itineraryOrder;
    var orderFromAPI = this.itineraryListWithRank;

    for(var x=0;x<order.length;x++) {
      for(var y=0;y<orderFromAPI.length;y++) {
        if(order[x].id == orderFromAPI[y].retailer_id) {
          //update it's rank
          var itineraryRank = {};
          itineraryRank['rank'] = order[x].order;

          let itineraryRank_json_string = JSON.stringify(itineraryRank);
          this.updateItineraryRankAPI('itineraries/'+this.selectedItinerary+'/lists/'+orderFromAPI[y].id+'/', itineraryRank_json_string);
        }
      }
    }

    let itinerary = {};
    itinerary['name'] = this.itinerary.name;//
    itinerary['retailers'] = this.itineraryOrder;
    let itinerary_json_string = JSON.stringify(itinerary);

    //this.updateItineraryAPI('itineraries/'+this.selectedItinerary+'/', itinerary_json_string);
  }
  updateItineraryAPI(url: string, json: string) {
    this.apiService.patch(url, json)
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
  updateItineraryRankAPI(url: string, json: string) {
    this.apiService.patch(url, json)
    .subscribe((response) => {
      if(response['code'] == 2004 && response['message'] == 'Entry updated') {
        console.log('Success');
      }
      else {
        alert(response['code']+':'+response['message']);
      }
    });
  }
  getItineraryList(id: string) {
    this.apiService.get('itineraries/'+id+'/lists/')
		.subscribe(ret => {
      let data: any[] = JSON.parse(JSON.stringify(ret['data']));
      //console.log(Object.values(data));
      //alert(data.message);
      //console.log(data.data);
      this.itineraryListWithRank = Object.values(data);
    },
		(err) => {
			console.log(err);
		});
  }
  closeDeleteConfirmationModal() {
    this.deleteConfirmation.onModalClose();
  }

  openEditDetailsModal(orderId: string) {
    this.selectedRetailer = orderId;
    let retailer, number_of_items, balance;

    for(var x=0;x<this.itinerary.retailers.length;x++) {
      if(this.itinerary.retailers[x].id == orderId) {
        retailer = this.itinerary.retailers[x].id;
        number_of_items = this.itinerary.retailers[x].accounts_receivable.length;
        balance = '';
      }
    }
    this.editRetailerDetails.get('retailer').setValue(retailer);
    this.editRetailerDetails.get('number_of_items').setValue(number_of_items);
    this.editRetailerDetails.get('balance').setValue(balance);

    this.editDetailsModal.onModalOpen();
  }
  closeEditDetailsModal() {
    this.editDetailsModal.onModalClose();
  }

  public toggleBody() {
  	let rBody = this.elRef.nativeElement.querySelector('.row-body');
	if(!this.isOpen) {
		if (rBody.classList)
			rBody.classList.add('open');
		else
			rBody.className += 'open';
	}
	else {
		if (rBody.classList)
			rBody.classList.remove('open');
		else
			rBody.className = rBody.className.replate(/ *\b\S*?selected\S*\b/g, '');
	}
	this.isOpen = !this.isOpen;
   }

   public getTotalBalance(itineraryVal) {
   	 let total = 0;

    	for (let i = 0; i < itineraryVal.itinerary_list.length; i++) {
    		total += parseFloat(itineraryVal.itinerary_list[i].balance);

    	}

	   return total;
   }

}
