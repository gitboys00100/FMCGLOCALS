import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../modules/core-modal/modal/modal.component';

@Component({
  selector: 'app-remitreceipt',
  templateUrl: './remitreceipt.component.html',
  styleUrls: ['./remitreceipt.component.css']
})
export class RemitreceiptComponent implements OnInit {
  @ViewChild('receiptDialogModal') receiptDialogModal: ModalComponent;

  constructor() { }

  ngOnInit() {
  }

  openModal() {
    this.receiptDialogModal.onModalOpen();
  }
  closeModal() {
    this.receiptDialogModal.onModalClose();
  }
  print() {
    var printContents = document.getElementById('print-section').innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(true);
    setInterval(function() {
      window.location.reload(true);
    }, 500);
  }
}
