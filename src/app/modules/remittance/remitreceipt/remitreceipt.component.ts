import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalComponent } from '../../../modules/core-modal/modal/modal.component';
import { ApiService } from '../../../shared/api.service';

@Component({
  selector: 'app-remitreceipt',
  templateUrl: './remitreceipt.component.html',
  styleUrls: ['./remitreceipt.component.css']
})
export class RemitreceiptComponent implements OnInit {
  loading: boolean;
  @Input() id: string;
  @Input() agentId: string;
  @Input() timestamp: Date;
  @ViewChild('receiptDialogModal') receiptDialogModal: ModalComponent;
  remittance: any[];
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loading = false;
    this.getRemittance();
  }
  getRemittance() {
    this.loading = true;
    this.apiService.get('remittances/')
    .subscribe(ret => {
      let data: any[] = JSON.parse(JSON.stringify(ret));
      console.log(Object.values(data));
      //alert(data.message);
      //console.log(data.data);
      this.remittance = Object.values(data);
      //console.log(this.arrRetailers2);
      this.loading = false;
    },
    (err) => {
      console.log(err);
    });
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
