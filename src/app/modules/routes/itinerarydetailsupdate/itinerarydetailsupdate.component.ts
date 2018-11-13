import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../core-modal/modal/modal.component';
@Component({
  selector: 'app-itinerarydetailsupdate',
  templateUrl: './itinerarydetailsupdate.component.html',
  styleUrls: ['./itinerarydetailsupdate.component.css']
})
export class ItinerarydetailsupdateComponent implements OnInit {
      @ViewChild('itemUpdateItineraryModal') itemUpdateItineraryModal: ModalComponent;

  constructor() { }

  ngOnInit() {
  }

  openModal() {
		this.itemUpdateItineraryModal.onModalOpen();
	}

	closeModal() {
		this.itemUpdateItineraryModal.onModalClose();
	}

}
