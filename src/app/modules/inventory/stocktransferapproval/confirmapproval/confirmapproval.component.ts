import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalComponent } from '../../../core-modal/modal/modal.component';

@Component({
  selector: 'app-confirmapproval',
  templateUrl: './confirmapproval.component.html',
  styleUrls: ['./confirmapproval.component.css']
})
export class ConfirmapprovalComponent implements OnInit {
  @ViewChild('ConfirmApprovalModal') ConfirmApprovalModal: ModalComponent;
  @ViewChild('ipt') input: ElementRef;

  constructor() { }

  ngOnInit() {

  }

  onApproveStock(){

    console.log("BOOOM: "+this.input.nativeElement.value);
  }

  // modal
  openModal() {
		this.ConfirmApprovalModal.onModalOpen();
	}

	closeModal() {
		this.ConfirmApprovalModal.onModalClose();
	}

}
