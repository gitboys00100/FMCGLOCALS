import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../core-modal/modal/modal.component';


@Component({
	selector: 'app-adduser-modal',
	templateUrl: './adduser-modal.component.html',
	styleUrls: ['./adduser-modal.component.css']
})
export class AddUserComponent implements OnInit {
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
