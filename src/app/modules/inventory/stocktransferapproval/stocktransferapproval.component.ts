import { Component, OnInit, Input, ElementRef,ViewChild } from '@angular/core';
import { ModalComponent } from '../../core-modal/modal/modal.component';
import { ConfirmapprovalComponent } from '../stocktransferapproval/confirmapproval/confirmapproval.component';

@Component({
  selector: 'app-stocktransferapproval',
  templateUrl: './stocktransferapproval.component.html',
  styleUrls: ['./stocktransferapproval.component.css']
})
export class StocktransferapprovalComponent implements OnInit {
  @ViewChild('itemStockApprovalModal') itemStockApprovalModal: ModalComponent;
  @ViewChild('onConfirmApprovalComponent') onConfirmApprovalComponent: ConfirmapprovalComponent;

  constructor() { }
  data_content = "";

  ngOnInit() {
    this.data_content;
  }
  //get data when click from modal
  getContent(content){
      this.data_content = content;
  }

  // Modal
  openModal() {
		this.itemStockApprovalModal.onModalOpen();
	}

	closeModal() {
		this.itemStockApprovalModal.onModalClose();
	}

  // for child MODAL
  public onConfirmApproval(content) {
    // this.onConfirmApprovalComponent.getContent(content);
    this.onConfirmApprovalComponent.ConfirmApprovalModal.onModalOpen();
  }

}
