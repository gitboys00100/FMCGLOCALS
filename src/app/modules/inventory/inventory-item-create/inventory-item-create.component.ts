import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../core-modal/modal/modal.component';

@Component({
	selector: 'app-inventory-item-create',
	templateUrl: './inventory-item-create.component.html',
	styleUrls: ['./inventory-item-create.component.css']
})
export class InventoryItemCreateComponent implements OnInit {
	@ViewChild('itemCreateModal') itemCreateModal: ModalComponent;


	constructor() { }

	ngOnInit() {
	}

	openModal() {
		this.itemCreateModal.onModalOpen();
	}

	closeModal() {
		this.itemCreateModal.onModalClose();
	}
}
