import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../core-modal/modal/modal.component';


@Component({
	selector: 'app-edituser-modal',
	templateUrl: './edituser-modal.component.html',
	styleUrls: ['./edituser-modal.component.css']
})
export class EditUserComponent implements OnInit {
	@ViewChild('itemEditModal') itemEditModal: ModalComponent;

	constructor() {}

	ngOnInit() {
	}

	openModal() {
		this.itemEditModal.onModalOpen();
	}

	closeModal() {
		this.itemEditModal.onModalClose();
	}
}
