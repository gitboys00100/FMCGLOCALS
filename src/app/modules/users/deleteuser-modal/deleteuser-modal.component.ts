import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../core-modal/modal/modal.component';


@Component({
	selector: 'app-deleteuser-modal',
	templateUrl: './deleteuser-modal.component.html',
	styleUrls: ['./deleteuser-modal.component.css']
})
export class DeleteUserComponent implements OnInit {
	@ViewChild('itemDeleteModal') itemDeleteModal: ModalComponent;

	constructor() {
	}

	ngOnInit() {
	}




	openModal() {
		this.itemDeleteModal.onModalOpen();
	}

	closeModal() {
		this.itemDeleteModal.onModalClose();
	}
}
