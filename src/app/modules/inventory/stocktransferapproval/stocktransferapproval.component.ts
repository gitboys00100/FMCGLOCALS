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
  order: string = 'transfer_order';
	reverse: boolean = false;
	type: string = 'asc';

  constructor() { }
  data_content = "";

  ngOnInit() {
    this.scrollwidth();
    this.data_content;
  }
  //get data when click from modal
  getContent(content){
      this.data_content = content;
      //console.log(this.data_content);
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
    //alert(content);
    this.onConfirmApprovalComponent.getContent(content);
    this.onConfirmApprovalComponent.ConfirmApprovalModal.onModalOpen();
  }

  public scrollwidth(){
    $('table').on('scroll', function () {
      $("table > *").width($("table").width() + $("table").scrollLeft());
    });
	}

	setOrder(value: string) {
    if(this.order === value) {
      this.reverse = !this.reverse;
      this.type = this.reverse ? 'desc' : 'asc';
    }

    this.order = value;
  }

}
