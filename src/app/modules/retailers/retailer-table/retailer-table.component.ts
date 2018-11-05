import { Component, OnInit, Input } from '@angular/core';
import { Retailer } from '../retailer.model';

@Component({
	selector: 'app-retailer-table',
	templateUrl: './retailer-table.component.html',
	styleUrls: ['./retailer-table.component.css']
})
export class RetailerTableComponent implements OnInit {
	@Input() retailerList: Retailer[];
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
