import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../modules/core-modal/modal/modal.component';
import { DataCountsService } from '../../../shared/data-counts.service';
import { RemitreceiptComponent } from '../remitreceipt/remitreceipt.component';
import { ApiService } from '../../../shared/api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-remittance-receivables',
  templateUrl: './remittance-receivables.component.html',
  styleUrls: ['./remittance-receivables.component.css'],
  providers: [ DatePipe ]
})
export class RemittanceReceivablesComponent implements OnInit {
  @ViewChild('confirmationDialog') confirmationDialog: ModalComponent;
  @ViewChild('onReceiptDialogModal') onReceiptDialogModal: RemitreceiptComponent;

  constructor(private data: DataCountsService, private apiService: ApiService,private datePipe: DatePipe) { }
  receivables: any[];
  agents: string;
  loading: boolean;

  order: string = 'agent';
  reverse: boolean = false;

  reverseAgent: boolean = false;
  reverseRetailer: boolean = false;
  reverseTotal: boolean = false;
  reverseAmountPaid: boolean = false;
  reverseBalance: boolean = false;
  reverseDate: boolean = false;

  agent: boolean = false;
  retailer: boolean = false;
  total: boolean = false;
  amount_paid: boolean = false;
  balance: boolean = false;
  date: boolean = false;

  clickedRemittance = '';
  today: number = Date.now();
  selectedDate: number;
  pipeStatus: number = 0;
  datacount: number = 0;
  selectedId: string;
  receipt_AgentId: string;
  receipt_Timestamp: Date;
  remittance: any[];
  receiptRemittance: any[];
  breakdown: boolean;
  all_payments: any[];
  receipt: any[];

  public filterSearchQuery: string = '';
  public searchQuery: string = '';
	public itemsPerPage: number = 5;


  ngOnInit() {
    this.selectedId = '';
    this.loading = false;
    this.agents = 'All';
    this.receivables = [];
    this.receiptRemittance = [];
    this.remittance = [];
    this.breakdown = false;
    this.all_payments = [];
    this.receipt = [];

    this.getRemittance();
    this.getRemittanceReceipt();
    this.selectedDate = this.today;

    this.data.currentRemittanceCount.subscribe(datacount => this.datacount = datacount)
  }
  openBreakdown(id: string) {
    this.breakdown = true;
    var rec = this.receivables;
    var rem = this.remittance;
    var selectedAgentId, selectedTimestamp;
    rem.forEach(function(rm){
      if(rm.id == id) {
        selectedAgentId = rm.agent.id;
        selectedTimestamp = rm.timestamp;
      }
    });
    //find it in the receivables
    var timestamp1 = this.datePipe.transform(selectedTimestamp, 'MMMM dd, yyyy');
    var specificReceivables = [];
    rec.forEach(function(rc){
      var timestamp2 = this.datePipe.transform(rc.timestamp, 'MMMM dd, yyyy');
      if((rc.purchase_order.user.id == selectedAgentId) && (timestamp1 == timestamp2)) {
        var toPush = {};
        toPush['id'] = rc.id;
        toPush['purchase_order'] = rc.purchase_order;
        toPush['amount'] = rc.amount;
        toPush['timestamp'] = rc.timestamp;
        toPush['denomination'] = rc.denomination;

        specificReceivables.push(toPush);
      }
    }, this);
    console.log(selectedAgentId);
    this.receivables = specificReceivables;
  }
  closeBreakdown() {
    this.breakdown = false;
    this.getRemittance();
  }
  compressRemittanceArray() {
    var remit = this.remittance[2];
    var compress = [];

    remit.forEach(function(r){
      var found = false;
      var rt = compress;
      var timestamp1 = this.datePipe.transform(r.timestamp, 'MMMM dd, yyyy');
      rt.forEach(function(r2) {
        var timestamp2 = this.datePipe.transform(r2.timestamp, 'MMMM dd, yyyy');

        if((r.agent.id == r2.agent.id) && (timestamp1 == timestamp2)) {
          found = true;
        }

      }, this);

      if(!found) {
        var toPush = {};
        toPush['id'] = r.id;
        toPush['agent'] = r.agent;
        toPush['cashier'] = r.cashier;
        toPush['timestamp'] = r.timestamp;
        toPush['total_amount'] = r.total_amount;
        toPush['doc_no'] = r.doc_no;
        compress.push(toPush);
      }

    }, this);
    //total the amount
    /*
    compress.forEach(function(c){
      var timestamp1 = this.datePipe.transform(c.timestamp, 'MMMM dd, yyyy');
      var amountToBeAdded = 0;
      remit.forEach(function(r) {
        var timestamp2 = this.datePipe.transform(r.timestamp, 'MMMM dd, yyyy');
        if((c.agent.id == r.agent.id) && (timestamp1 == timestamp2)) {
          amountToBeAdded += r.total_amount;
        }
      }, this);
      c.total_amount = amountToBeAdded;
    }, this);*/
    this.remittance = compress;
  }
	public onShowCountChange($event) {
		this.itemsPerPage = $event.target.value;
	}

  public onFilterSearchChange($event) {
		this.searchQuery = $event.target.value;

		if (this.searchQuery === '')
		this.onSearch();
	}

	public onSearch() {
		this.filterSearchQuery = this.searchQuery;
	}

	public onKeyDown($event) {
		if ($event.keyCode === 13) {
			this.onSearch();
			$event.preventDefault();
		}
	}

  getRemittance() {
    this.loading = true;
    this.apiService.get('payments/')
    .subscribe(ret => {
      let data: any[] = JSON.parse(JSON.stringify(ret['data']));
      //console.log('receivables');
      //console.log(Object.values(data));
      //alert(data.message);
      //console.log(data.data);
      this.receivables = Object.values(data);
      //console.log(this.arrRetailers2);
      this.loading = false;
    },
    (err) => {
      console.log(err);
    });
  }
  setAgent(a: string) {
    this.agents = a;
  }
  onChangeDate(date:any) {
    this.selectedDate = new Date(date).getTime();
  }
  setRemittanceOrder(value: string, caret_name: string) {
    if(this.order === value) {
      this.reverse = !this.reverse;
      if(caret_name == 'agent') {
        this.reverseAgent = !this.reverseAgent;
      }
      else if(caret_name == 'retailer') {
        this.reverseRetailer = !this.reverseRetailer;
      }
      else if(caret_name == 'total') {
        this.reverseTotal = !this.reverseTotal;
      }
      else if(caret_name == 'amount_paid') {
        this.reverseAmountPaid = !this.reverseAmountPaid;
      }
      else if(caret_name == 'balance') {
        this.reverseBalance = !this.reverseBalance;
      }
      else if(caret_name == 'date') {
        this.reverseDate = !this.reverseDate;
      }
    }
    this.order = value;
    if(caret_name == 'agent') {
      this.agent = false;
      this.retailer = false;
      this.total = false;
      this.amount_paid = false;
      this.balance = false;
      this.date = false;
      this.reverse = this.reverseAgent;
      this.reverseRetailer = false;
      this.reverseTotal = false;
      this.reverseAmountPaid = false;
      this.reverseBalance = false;
      this.reverseDate = false;
    }
    else if(caret_name == 'retailer') {
      this.agent = false;
      this.retailer = false;
      this.total = false;
      this.amount_paid = false;
      this.balance = false;
      this.date = false;
      this.reverse = this.reverseRetailer;
      this.reverseAgent = false;
      this.reverseTotal = false;
      this.reverseAmountPaid = false;
      this.reverseBalance = false;
      this.reverseDate = false;
    }
    else if(caret_name == 'total') {
      this.agent = false;
      this.retailer = false;
      this.total = false;
      this.amount_paid = false;
      this.balance = false;
      this.date = false;
      this.reverse = this.reverseTotal;
      this.reverseAgent = false;
      this.reverseRetailer = false;
      this.reverseAmountPaid = false;
      this.reverseBalance = false;
      this.reverseDate = false;
    }
    else if(caret_name == 'amount_paid') {
      this.agent = false;
      this.retailer = false;
      this.total = false;
      this.amount_paid = false;
      this.balance = false;
      this.date = false;
      this.reverse = this.reverseAmountPaid;
      this.reverseAgent = false;
      this.reverseRetailer = false;
      this.reverseTotal = false;
      this.reverseBalance = false;
      this.reverseDate = false;
    }
    else if(caret_name == 'balance') {
      this.agent = false;
      this.retailer = false;
      this.total = false;
      this.amount_paid = false;
      this.balance = false;
      this.date = false;
      this.reverse = this.reverseBalance;
      this.reverseAgent = false;
      this.reverseRetailer = false;
      this.reverseTotal = false;
      this.reverseAmountPaid = false;
      this.reverseDate = false;
    }
    else if(caret_name == 'date') {
      this.agent = false;
      this.retailer = false;
      this.total = false;
      this.amount_paid = false;
      this.balance = false;
      this.date = false;
      this.reverse = this.reverseDate;
      this.reverseAgent = false;
      this.reverseRetailer = false;
      this.reverseTotal = false;
      this.reverseAmountPaid = false;
      this.reverseBalance = false;
    }
  }
  setDateToday() {
    var d = (<HTMLInputElement>document.getElementById("date"));
    var dateString = new Date();
    d.value = dateString.getFullYear()+"-"+("0" + (dateString.getMonth() + 1)).slice(-2)+"-"+dateString.getDate();
    this.selectedDate = this.today;
  }
  receivedRemittance(index: string) {
    var toUpdate = {};
    toUpdate['is_received'] = true;
    let toUpdate_json_string = JSON.stringify(toUpdate);
    this.receivedRemittanceAPI(index, toUpdate_json_string);
    this.pipeStatus += 1;
    //this.closeConfirmationModal(index);
  }
  receivedRemittanceAPI(id: string, json: string) {
    this.apiService.patch('payments/'+id+'/', json)
    .subscribe((response) => {
      //console.log(response);
      if(response['code'] == 2004 && response['message'] == 'Entry updated') {
        alert('Success!');
        window.location.reload();
      }
      else {
        alert(response['code']+':'+response['message']);
      }
    });
  }
  openConfirmationModal(index: string) {
    this.clickedRemittance = index;
    this.confirmationDialog.onModalOpen();
  }
  closeConfirmationModal(index: string) {
    var c = (<HTMLInputElement>document.getElementById(index+"_button"));
    c.disabled = false;
    this.confirmationDialog.onModalClose();
  }
  openReceiptDialogModal(value: string) {
    //find the timestamp and agents

    //get remittance receipt
    var remit = this.all_payments[2];
    this.selectedId = value;
    var receiptData = [];
    var r_agent, r_cashier, r_amount, r_doc_no, r_purchase_order, r_total_amount;
    remit.forEach(function(p){
      if(p.id == value) {
        this.receipt_AgentId = p.agent.id;
        this.receipt_Timestamp = p.timestamp;
        var toPush = {};
        toPush['agent'] = p.agent;
        toPush['cashier'] = p.cashier_name;
        toPush['total_amount'] = p.total_amount;
        toPush['doc_no'] = p.doc_no;
        toPush['timestamp'] = p.timestamp;
        receiptData.push(toPush);
        //console.log(this.selectedAgentId);
        //console.log(this.selectedTimestamp);
      }
    }, this);

    /*
    var payment = this.receivables;
    var timestamp1 = this.datePipe.transform(this.receipt_Timestamp, 'MMMM dd, yyyy');
    payment.forEach(function(r) {
      var timestamp2 = this.datePipe.transform(r.timestamp, 'MMMM dd, yyyy');
      if((r.purchase_order.user.id == this.receipt_AgentId) && (timestamp1 == timestamp2)) {
        r_amount = r.purchase_order.accounts_receivable.amount;

      }
    }, this);*/
    this.receipt = receiptData;
    //console.log(receiptData);
    //this.findRemittanceReceipt(this.selectedAgentId, this.selectedTimestamp);
    this.onReceiptDialogModal.receiptDialogModal.onModalOpen();
  }
  findRemittanceReceipt(agent_id: string, timestamp: Date) {
    var receipt = this.remittance;
    var selectedRemittance = [];
    var paymentDate = this.datePipe.transform(timestamp, 'MMMM dd, yyyy');
    receipt.forEach(function(r){
      var remittanceDate = this.datePipe.transform(r.timestamp, 'MMMM dd, yyyy');
      if(r.agent.id == agent_id && paymentDate == remittanceDate) {
        var toPush = {};
        toPush['id'] = r.id;
        toPush['agent'] = r.agent;
        toPush['cashier'] = r.cashier;
        toPush['cashier_name'] = r.cashier_name;
        toPush['doc_no'] = r.doc_no;
        toPush['timestamp'] = r.timestamp;
        selectedRemittance.push(toPush);
      }
    }, this);
  }
  closeReceiptDialogModal() {
    this.onReceiptDialogModal.receiptDialogModal.onModalClose();
  }

  getRemittanceReceipt() {
    this.apiService.get('remittances/')
    .subscribe(ret => {
      let data = JSON.parse(JSON.stringify(ret));
      //console.log(Object.values(data));
      //alert(data.message);
      //console.log(data.data);
      this.remittance = Object.values(data);
      this.all_payments = Object.values(data);
      //console.log(this.arrRetailers2);
      this.compressRemittanceArray();
    },
    (err) => {
      console.log(err);
    });
  }
}
