import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../core-modal/modal/modal.component';


@Component({
	selector: 'app-inventory-modal-receive',
	templateUrl: './inventory-modal-receive.component.html',
	styleUrls: ['./inventory-modal-receive.component.css']
})
export class InventoryItemReturnComponent implements OnInit {
	@ViewChild('itemCreateModal') itemCreateModal: ModalComponent;

	constructor() {}

	ngOnInit() {
	}

	openModal() {
		this.itemCreateModal.onModalOpen();
	}

	closeModal() {
		this.itemCreateModal.onModalClose();
	}
}
