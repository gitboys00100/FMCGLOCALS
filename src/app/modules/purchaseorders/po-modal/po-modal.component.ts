import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../core-modal/modal/modal.component';


@Component({
	selector: 'app-po-modal',
	templateUrl: './po-modal.component.html',
	styleUrls: ['./po-modal.component.css']
})
export class PoModal implements OnInit {
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
