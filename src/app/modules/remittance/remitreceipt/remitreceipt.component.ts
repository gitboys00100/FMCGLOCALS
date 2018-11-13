import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalComponent } from '../../../modules/core-modal/modal/modal.component';
import { ApiService } from '../../../shared/api.service';
import html2canvas from 'html2canvas';

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
  @Input() receipt: any[];

  @ViewChild('receiptDialogModal') receiptDialogModal: ModalComponent;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loading = false;

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

    var w = window.open();
    var data = document.getElementById('print-section');
    w.document.body.innerHTML = printContents;
    w.document.write('<html><head>');
    w.document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">');
    w.document.write('<style>.print-section {border: 1px solid lightgray;width:100%;padding:10px;padding-top:20px;}</style>');
    w.document.write('<style>.receipt-input-container {padding:15px;padding-left: 45px;padding-right: 45px;</style>');
    w.document.write('<style>.receipt-label {padding:0px !important;margin:0px;font-weight: bold;}</style>');
    w.document.write('<style>.receipt-small-box {border: 1px solid lightgray;text-align:center;padding-top:5px;}</style>');
    w.document.write('<style>.ks {float:left;font-weight: bold;}</style>');
    w.document.write('<style>.ks-small-box {margin-top:25px;margin-bottom:25px;border:1px solid lightgray;padding:5px;padding-left:10px;padding-right:10px;text-align: center;}</style>');
    w.document.write('</head><body>');
    w.document.write('<div class="container">');
    w.document.write(printContents);
    w.document.write('</div>')
    w.document.write('</body>');
    w.document.write('<script type="text/javascript">window.print();window.onfocus=function(){ window.close();}</script>');
    w.document.write('</html>');

    // document.body.innerHTML = originalContents;
    // //window.location.reload(true);

    // window.close();
    // setTimeout(function() {
    //   //document.body.innerHTML = originalContents;
    //   window.close();
    //   //window.location.reload(true);
    // }, 500);

  }
}
