import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../components/modal/modal.component';

@Component({
	selector: 'app-view-retailer-modal',
	templateUrl: './view-retailer-modal.component.html',
	styleUrls: ['./view-retailer-modal.component.css']
})
export class ViewRetailerModalComponent implements OnInit {
	@ViewChild('onViewRetailerComponent') onViewRetailerComponent: ModalComponent;
	public retailer: any;
	
	constructor() { }
	
	ngOnInit() {
	
	}

	openModal(retailer) {
		this.retailer = retailer;
		this.onViewRetailerComponent.onModalOpen();
	}
	
	closeModal() {
		this.retailer = null;
		this.onViewRetailerComponent.onModalClose();
	}
	
}
