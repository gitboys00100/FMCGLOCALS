/*
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory-returns',
  templateUrl: './inventory-returns.component.html',
  styleUrls: ['./inventory-returns.component.css']
})
export class InventoryReturnsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { InventoryServiceReturns } from '../inventory-service';
import { InventoryReturns } from '../inventory.model';
import { InventoryItemReturnComponent } from '../inventory-modal-receive/inventory-modal-receive.component';

import { ApiService } from '../../../shared/api.service';

import { ModalComponent } from '../../../modules/core-modal/modal/modal.component';

@Component({
  selector: 'app-inventory-returns',
  templateUrl: './inventory-returns.component.html',
  styleUrls: ['./inventory-returns.component.css']
})
export class InventoryReturnsComponent implements OnInit {
	@ViewChild('onNewItemComponent') onNewItemComponent: InventoryItemReturnComponent;
  @ViewChild('receiveDialog') receiveDialog: ModalComponent;
  loading:boolean;

	public inventoryList: InventoryReturns[];
	public filterStatus: string = '';
  public filterReason: string = '';
	public filterDate: string = '';
	public filterSearchQuery: string = '';
	public searchQuery: string = '';

  public returnItem: string = '';


  order: string = 'productname';
  reverse: boolean = false;

  store: boolean = false;
  qty: boolean = true;
  retailer: boolean = true;
  return_type: boolean = true;
  agent: boolean = true;
  stat: boolean = true;
  date: boolean = true;

  public itemsPerPage: number = 5;

  arr: Array<{}> = [];
  public id:number=0;
  public timestamp:string='';
  public quantity:number = 0;
  public reason:string='-';
  public expiry_date:string='';
  public agentname:string='';
  //public first_name:string='';
  //public last_name:string='';
  public name:string='';
  public owner:string='';
  public status:string='';
  public count: number = 0;

  //title = 'Tour of Heroes';
 //myHero = 'Windstorm';

/*
 createRange(number){
  var items: number[] = [];
  for(var i = 1; i <= number; i++){
     items.push(i);
  }
  return items;
}
*/
public returnId: number = 0;

	//constructor(private InventoryServiceReturns: InventoryServiceReturns) { }
  constructor(private apiService: ApiService) { }

	// ###############################################
	// # LIFE CYCLE
	// ###############################################

	ngOnInit() {
		//this.inventoryList = this.InventoryServiceReturns.getInventoryReturns();
    this.loading = false;
    this.getReturns();
	}

	// ###############################################
	// # PUBLIC
	// ###############################################


  getReturns() {
    //this.arr = [];
    this.loading = true;
    this.apiService.get('item_returns/')
    .subscribe(ret => {
      var data: any[] = JSON.parse('['+JSON.stringify(ret)+']');
      this.inventoryList = Object.values(data);
      console.log(this.inventoryList);
      //alert(JSON.stringify(this.inventoryList, null, 4));
      if(this.inventoryList) {

        for(var o of this.inventoryList){
          if(o['data'] !== null) {
            for(var child of o['data']){
                if(child.timestamp != null){
                  this.timestamp = child.timestamp.substring(0,10);
                  this.id = child.id;
                }

                //this.getInfo(child.user_id, 'users','id','first_name,last_name',this.count);
                //this.getInfo(child.retailer_id, 'retailers','id','name,owner',this.count);

                if(child.items != null){
                  for(var items of child.items){
                    this.quantity = items.quantity;
                    this.reason = items.reason_name;
                    this.expiry_date = items.expiry_date;

                  }
                }

                if(child.retailer != null){
                    this.name = child.retailer['name'];
                    this.owner = child.retailer['owner'];
                }

                if(child.user != null){
                    this.agentname = child.user['first_name']+' '+child.user['last_name'];
                }

                if(child.received_date != null){
                    this.status = 'Received';
                }
                else{
                    this.status = 'Not Received';
                }

                this.arr.push({
                  id: this.id,
                  timestamp: this.timestamp,
                  quantity: this.quantity,
                  reason: this.reason,
                  //expiry_date: this.expiry_date,
                  agentname: this.agentname,
                  //first_name: this.first_name+ +this.last_name,
                  //last_name: this.last_name,
                  name: this.name,
                  owner: this.owner,
                  status: this.status,
                });

                this.count = this.count + 1;
              }
          }

         }
      }

      //return items;


      //console.log("start");
      console.log(this.arr);
      this.loading = false;



    },
      (err) => {
        console.log(err);
      }
    )
  }




/*
  getInfo(id, table, where, fields,c){
    var f = fields.split(",");

    this.apiService.get(table+'/?'+where+'='+id).subscribe(ret => {
      var data: any[] = JSON.parse('['+JSON.stringify(ret)+']');
      //console.log(table,'/?',where,'=',id);
      //console.log(Object.values(data));

      var result = Object.values(data);
      for(var o of result){
      for(var child of o.data){
          for(var ff of f){
            let z = ff;
            this.arr[c][z] = child[z];
            this.first_name = child[z];
          }
          }
       }
    },
    (err) => {
      console.log(err);
    });
  }
*/



/*
	public onReceive(n) {
    console.log(n);
    this.returnItem = n;
		this.onNewItemComponent.itemCreateModal.onModalOpen();
	}
*/
  public onFilterReasonChange($event) {
    this.filterReason = $event.target.value;
    //alert(this.filterReason);
    console.log($event.target.value);
  }

	public onFilterCategoryChange($event) {
		this.filterStatus = $event.target.value;
    console.log($event.target.value);
	}

	public onFilterDateChange($event) {
		this.filterDate = $event.target.value;
		console.log($event.target.value);
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

  setRetailerOrder(value: string, caret_name: string) {
    if(this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
    if(caret_name == 'store') {
      this.store = false;
      this.qty = true;
      this.retailer = true;
      this.return_type = true;
      this.agent = true;
      this.stat = true;
      this.date = true;
    }
    else if(caret_name == 'qty') {
      this.store = true;
      this.qty = false;
      this.retailer = true;
      this.return_type = true;
      this.agent = true;
      this.stat = true;
      this.date = true;
    }
    else if(caret_name == 'retailer') {
      this.store = true;
      this.qty = true;
      this.retailer = false;
      this.return_type = true;
      this.agent = true;
      this.stat = true;
      this.date = true;
    }
    else if(caret_name == 'return_type') {
      this.store = true;
      this.qty = true;
      this.retailer = true;
      this.return_type = false;
      this.agent = true;
      this.stat = true;
      this.date = true;
    }
    else if(caret_name == 'agent') {
      this.store = true;
      this.qty = true;
      this.retailer = true;
      this.return_type = true;
      this.agent = false;
      this.stat = true;
      this.date = true;
    }
    else if(caret_name == 'status') {
      this.store = true;
      this.qty = true;
      this.retailer = true;
      this.return_type = true;
      this.agent = true;
      this.stat = false;
      this.date = true;
    }
    else if(caret_name == 'date') {
      this.store = true;
      this.qty = true;
      this.retailer = true;
      this.return_type = true;
      this.agent = true;
      this.stat = true;
      this.date = false;
    }
  }

  public openReceiveModal(n) {
    //console.log("id ="+ n);
    this.returnId = n;
    this.receiveDialog.onModalOpen();
  }

  onReceive() {
    //this.id = ret.id;
    //this.retailerName = ret.name;
    //alert(this.id);
    this.receiveDialog.onModalClose();
  }
  closeReceiveModal() {
    this.receiveDialog.onModalClose();
  }

  onSubmit(){
    let userstorage = localStorage.getItem("session_data");
    let parser = window.atob(userstorage);
    let usersession = JSON.parse(parser);

    let userdata = {};
		    userdata['received_date'] = new Date();
        userdata['received_by_id'] = usersession.id;
    let user_json_string = userdata;
//console.log(this.id);
    this.apiService.patch('item_returns/'+this.returnId+'/', user_json_string)
    .subscribe((response) => {
      if(response['code'] == 2004 && response['message'] == 'Entry updated') {
        alert('Successfully received the returned item!');
        //this.getReturns();
        //window.location.reload();
      }
      else {
        alert(response['code']+':'+response['message']);
      }
    });
    this.receiveDialog.onModalClose();
  }


}
