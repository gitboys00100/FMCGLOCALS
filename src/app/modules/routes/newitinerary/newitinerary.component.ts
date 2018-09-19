import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../core-modal/modal/modal.component';
import { ApiService } from '../../../shared/api.service';

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
  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    //this.retailers = this.retailersService.getRetailerList();
    //this.retailers = this.retailersService.getAllRetailers();
    this.getRetailers();

    //alert('hello'+JSON.stringify(this.retailersService.getAllRetailers()));
    this.selectedRetailers = [];
  }
  getRetailers() {
    this.apiService.get('retailers/')
		.subscribe((terms) => {
			console.log(terms);
		},
		(err) => {
			console.log(err);
		})
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
