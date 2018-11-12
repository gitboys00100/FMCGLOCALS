import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../core-modal/modal/modal.component';

@Component({
  selector: 'app-itinerarydetailsdelete',
  templateUrl: './itinerarydetailsdelete.component.html',
  styleUrls: ['./itinerarydetailsdelete.component.css']
})
export class ItinerarydetailsdeleteComponent implements OnInit {
  @ViewChild('itemDeleteItineraryModal') itemDeleteItineraryModal: ModalComponent;

  constructor() { }

  ngOnInit() {
  }

  openModal() {
		this.itemDeleteItineraryModal.onModalOpen();
	}

	closeModal() {
		this.itemDeleteItineraryModal.onModalClose();
	}

}
