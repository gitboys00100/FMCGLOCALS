import { Component, OnInit, Input } from '@angular/core';
import { Inventory } from '../inventory.model';

@Component({
	selector: 'app-inventory-table',
	templateUrl: './inventory-table.component.html',
	styleUrls: ['./inventory-table.component.css']
})
export class InventoryTableComponent implements OnInit {
	@Input() inventoryList = [];
	@Input() filterCategory: string = '';
	@Input() filterSubCategory: string = '';
	@Input() filterSearchQuery: string = '';
	@Input() filterDate: string = '';
	public itemsPerPage: number = 5;
	order: string = 'item_code';
	reverse: boolean = false;
	type: string = 'asc';


	constructor() { }

	ngOnInit() {
		this.scrollwidth();
	}

	public onShowCountChange($event) {
		this.itemsPerPage = $event.target.value;
	}

	public scrollwidth(){
		$('table').on('scroll', function() {
	  $("table > *").width($("table").width() + $("table").scrollLeft());
		});
	}

	setOrder(value: string) {
    if(this.order === value) {
      this.reverse = !this.reverse;
      this.type = this.reverse ? 'desc' : 'asc';
    }

    this.order = value;
  }

}
