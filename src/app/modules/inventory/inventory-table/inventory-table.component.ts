import { Component, OnInit, Input } from '@angular/core';
import { Inventory } from '../inventory.model';

@Component({
	selector: 'app-inventory-table',
	templateUrl: './inventory-table.component.html',
	styleUrls: ['./inventory-table.component.css']
})
export class InventoryTableComponent implements OnInit {
	@Input() inventoryList: Inventory[];
	@Input() filterCategory: string = '';
	@Input() filterSubCategory: string = '';
	@Input() filterSearchQuery: string = '';
	@Input() filterDate: string = '';
	public itemsPerPage: number = 5;


	constructor() { }

	ngOnInit() {

	}

	public onShowCountChange($event) {
		this.itemsPerPage = $event.target.value;
	}


}
