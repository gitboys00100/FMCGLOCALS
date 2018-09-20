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

@Component({
  selector: 'app-inventory-returns',
  templateUrl: './inventory-returns.component.html',
  styleUrls: ['./inventory-returns.component.css']
})
export class InventoryReturnsComponent implements OnInit {
	@ViewChild('onNewItemComponent') onNewItemComponent: InventoryItemReturnComponent;
	public inventoryList: InventoryReturns[];
	public filterStatus: string = '';
	public filterDate: string = '';
	public filterSearchQuery: string = '';
	public searchQuery: string = '';

  public returnItem: string = '';


  order: string = 'productname';
  reverse: boolean = false;

  productname: boolean = false;
  qty: boolean = true;
  retailer: boolean = true;
  return_type: boolean = true;
  agent: boolean = true;
  status: boolean = true;
  date_returned: boolean = true;

  public itemsPerPage: number = 5;
  //title = 'Tour of Heroes';
 //myHero = 'Windstorm';

	constructor(private InventoryServiceReturns: InventoryServiceReturns) { }

	// ###############################################
	// # LIFE CYCLE
	// ###############################################

	ngOnInit() {
		this.inventoryList = this.InventoryServiceReturns.getInventoryReturns();
	}

	// ###############################################
	// # PUBLIC
	// ###############################################

	public onReceive(n) {
    console.log(n);
    this.returnItem = n;
		this.onNewItemComponent.itemCreateModal.onModalOpen();
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
    if(caret_name == 'productname') {
      this.productname = false;
      this.qty = true;
      this.retailer = true;
      this.return_type = true;
      this.agent = true;
      this.status = true;
      this.date_returned = true;
    }
    else if(caret_name == 'qty') {
      this.productname = true;
      this.qty = false;
      this.retailer = true;
      this.return_type = true;
      this.agent = true;
      this.status = true;
      this.date_returned = true;
    }
    else if(caret_name == 'retailer') {
      this.productname = true;
      this.qty = true;
      this.retailer = false;
      this.return_type = true;
      this.agent = true;
      this.status = true;
      this.date_returned = true;
    }
    else if(caret_name == 'return_type') {
      this.productname = true;
      this.qty = true;
      this.retailer = true;
      this.return_type = false;
      this.agent = true;
      this.status = true;
      this.date_returned = true;
    }
    else if(caret_name == 'agent') {
      this.productname = true;
      this.qty = true;
      this.retailer = true;
      this.return_type = true;
      this.agent = false;
      this.status = true;
      this.date_returned = true;
    }
    else if(caret_name == 'status') {
      this.productname = true;
      this.qty = true;
      this.retailer = true;
      this.return_type = true;
      this.agent = true;
      this.status = false;
      this.date_returned = true;
    }
    else if(caret_name == 'date_returned') {
      this.productname = true;
      this.qty = true;
      this.retailer = true;
      this.return_type = true;
      this.agent = true;
      this.status = true;
      this.date_returned = false;
    }
  }

}
