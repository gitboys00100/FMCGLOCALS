import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalComponent } from '../../../modules/core-modal/modal/modal.component';

@Component({
  selector: 'app-cash-denomination',
  templateUrl: './cash-denomination.component.html',
  styleUrls: ['./cash-denomination.component.css']
})
export class CashDenominationComponent implements OnInit {
  @Input() cash_denom: any[];
  @Input() total_denom: number;

  @ViewChild('cashDenomModal') cashDenomModal: ModalComponent;

  constructor() { }
  ngOnInit() {
  }
  openModal() {
    this.cashDenomModal.onModalOpen();

  }
  closeModal() {
    this.cashDenomModal.onModalClose();
  }
}
