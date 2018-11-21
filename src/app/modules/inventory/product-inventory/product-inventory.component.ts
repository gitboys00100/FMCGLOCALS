import { Component, OnInit, ViewChild } from '@angular/core';
import { InventoryService } from '../inventory-service';
import { Inventory } from '../inventory.model';
import { InventoryItemCreateComponent } from '../inventory-item-create/inventory-item-create.component';
import { ApiService } from '../../../shared/api.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
	selector: 'app-product-inventory',
	templateUrl: './product-inventory.component.html',
	styleUrls: ['./product-inventory.component.css']
})
export class ProductInventoryComponent implements OnInit {
	@ViewChild('onNewItemComponent') onNewItemComponent: InventoryItemCreateComponent;
	loading:boolean;
	public inventoryList = [];
	public noduplicateInventoryList = [];
	public filterCategory: string = '';
	public filterSubCategory: string = '';
	public filterDate: string = '';
	public filterSearchQuery: string = '';
	public searchQuery: string = '';

	constructor(private inventoryService: InventoryService,private apiService: ApiService) { }

	// ###############################################
	// # LIFE CYCLE
	// ###############################################

	ngOnInit() {
		// this.inventoryList = this.inventoryService.getInventoryList();
		this.loading = false;
		this.ListAllProduct();
	}

	// -------------------- API ----------------------
	ListAllProduct() {
		this.loading = true;
    this.apiService.get('items/').map((res:any) => res.data)
		.subscribe((data:any[]) => {
      let item: any[] = JSON.parse('['+JSON.stringify(data)+']');
			console.log("data:",Object.values(data));
      this.inventoryList = Object.values(data);
			//this.inventoryList = [];
			this.loading = false;
    },
		(err) => {
			console.log(err);
		});
  }

	// ###############################################
	// # PUBLIC
	// ###############################################

	public onNewItem() {
		this.onNewItemComponent.reset();
		this.onNewItemComponent.itemCreateModal.onModalOpen();
	}

	public onFilterCategoryChange($event) {
		this.filterCategory = $event.target.value;
	}

	public onFilterSubCategoryChange($event) {
		this.filterSubCategory = $event.target.value;
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

}
