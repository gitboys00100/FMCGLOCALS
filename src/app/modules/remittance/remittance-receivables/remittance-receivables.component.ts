import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../modules/core-modal/modal/modal.component';
import { DataCountsService } from '../../../shared/data-counts.service';
import { RemitreceiptComponent } from '../remitreceipt/remitreceipt.component';
import { CashDenominationComponent } from '../cash-denomination/cash-denomination.component';
import { ApiService } from '../../../shared/api.service';
import { DatePipe } from '@angular/common';
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-remittance-receivables',
  templateUrl: './remittance-receivables.component.html',
  styleUrls: ['./remittance-receivables.component.css'],
  providers: [ DatePipe ]
})
export class RemittanceReceivablesComponent implements OnInit {
  @ViewChild('confirmationDialog') confirmationDialog: ModalComponent;
  @ViewChild('onReceiptDialogModal') onReceiptDialogModal: RemitreceiptComponent;
  @ViewChild('onCashDenomModal') onCashDenomModal: CashDenominationComponent;

  constructor(private data: DataCountsService, private apiService: ApiService,private datePipe: DatePipe) { }
  receivables: any[];
  constReceivables: any[];
  agents: string;
  loading: boolean;
  loadingRemittance: boolean;

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
  denomStructure: any[];

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
  selectedDenomination: any[];
  totalDenomination: number;

  public filterSearchQuery: string = '';
  public searchQuery: string = '';
	public itemsPerPageRec: number = 5;
	public itemsPerPageRem: number = 5;

  datacountRem: number = 0;
  datacountRec: number = 0;

  ngOnInit() {
    this.selectedId = '';
    this.loading = false;
    this.loadingRemittance = false;
    this.agents = 'All';
    this.receivables = [];
    this.constReceivables = [];
    this.receiptRemittance = [];
    this.remittance = [];
    this.breakdown = false;
    this.all_payments = [];
    this.receipt = [];
    this.selectedDenomination = [];
    this.totalDenomination = 0;
    this.setDenomStructure();

    this.getRemittance();
    this.getRemittanceReceipt();
    this.selectedDate = this.today;

    this.data.currentRemittanceRecievableCount.subscribe(datacount => this.datacountRem = datacount);
    this.data.currentReceivableCount.subscribe(datacount => this.datacountRec = datacount);
  }
  setDenomStructure() {
    this.denomStructure = [{
      "id":1,
      "note": 10000,
      "quantity": 0,
      "amount": 0
      },
      {
      "id":2,
      "note": 5000,
      "quantity": 0,
      "amount": 0
      },
      {
      "id":3,
      "note": 1000,
      "quantity": 0,
      "amount": 0
      },
      {
      "id":4,
      "note": 500,
      "quantity": 0,
      "amount": 0
      },
      {
      "id":5,
      "note": 200,
      "quantity": 0,
      "amount": 0
      },
      {
      "id":6,
      "note": 100,
      "quantity": 0,
      "amount": 0
      },
      {
      "id":7,
      "note": 50,
      "quantity": 0,
      "amount": 0
      },
      {
      "id":8,
      "note": 20,
      "quantity": 0,
      "amount": 0
      },
      {
      "id":9,
      "note": 10,
      "quantity": 0,
      "amount": 0
      },
      {
      "id":10,
      "note": 5,
      "quantity": 0,
      "amount": 0
      },
      {
      "id":11,
      "note": 1,
      "quantity": 0,
      "amount": 0
    }];
  }
  openBreakdown(id: string) {
    // alert(id);
    this.breakdown = true;
    var rec = this.constReceivables;
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
    this.receivables = specificReceivables;
  }
  closeBreakdown() {
    this.breakdown = false;
    this.receivables = [];
    this.constReceivables = [];
    this.remittance = [];
    this.all_payments = [];

    this.getRemittance();
    this.getRemittanceReceipt();
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
        toPush['is_received'] = r.is_received;
        toPush['received_by'] = r.received_by;
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
	public onShowCountChangeRec($event) {
		this.itemsPerPageRec = $event.target.value;
	}
	public onShowCountChangeRem($event) {
		this.itemsPerPageRem = $event.target.value;
	}

  public onFilterSearchChange($event) {
		this.searchQuery = $event.target.value;
    if($event.target.value == '') {
      this.data.changeReceivableCount(this.receivables.length);
    }

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

      this.data.changeReceivableCount(Object.values(data).length);
      this.constReceivables = Object.values(data);
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

    this.breakdown = false;
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
  getUserId() {
    let userstorage = localStorage.getItem("session_data");
    let parser = window.atob(userstorage);
    var json = JSON.parse(parser);
    return json.id;
  }
  receivedRemittance(index: string) {
    var toUpdate = {};
    toUpdate['is_received'] = true;
    toUpdate['received_by_id'] = this.getUserId();
    let toUpdate_json_string = JSON.stringify(toUpdate);
    //this.receivedRemittanceAPI(index, toUpdate_json_string);
    var rem = this.remittance;
    var allpay = this.all_payments[2];
    var sel_agent_id, sel_timestamp;
    rem.forEach(function(r){
      if(r.id == index) {
        sel_agent_id = r.agent.id;
        sel_timestamp = r.timestamp;
      }
    });
    //get the count

    var timestamp1 = this.datePipe.transform(sel_timestamp, 'MMMM dd, yyyy');
    var arrlength = 0;
    allpay.forEach(function(r, index) {
      var timestamp2 = this.datePipe.transform(r.timestamp, 'MMMM dd, yyyy');
      if((r.agent.id == sel_agent_id) && (timestamp1 == timestamp2)) {
        arrlength += 1;
      }
    }, this);
    //find it in all remittances
    var counter = 1
    allpay.forEach(function(r, index) {
      var timestamp2 = this.datePipe.transform(r.timestamp, 'MMMM dd, yyyy');
      if((r.agent.id == sel_agent_id) && (timestamp1 == timestamp2)) {
        //console.log(counter+'|'+rem.length);
        this.receivedRemittanceAPI(r.id, toUpdate_json_string, counter, arrlength);
        counter += 1;
      }
    }, this);
    this.pipeStatus += 1;
    // //this.closeConfirmationModal(index);
  }
  receivedRemittanceAPI(id: string, json: string, counter: number, length: number) {
    this.apiService.patch('remittances/'+id+'/', json)
    .subscribe((response) => {
      //console.log(response);
      if(response['code'] == 2004 && response['message'] == 'Entry updated') {
        console.log('Success!');
        if(counter >= length) {
          alert('Success');
          window.location.reload();
        }
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
  openCashDenomModal(id: string) {
    var remit = this.all_payments[2];
    var denom;
    remit.forEach(function(r){
      if(r.id == id) {
        denom = r.denomination;
      }
    });
    this.selectedDenomination = denom;
    this.setDenomStructure();
    this.insertDenomination();
    this.getTotalDenomination();
    this.onCashDenomModal.cashDenomModal.onModalOpen();
  }
  getTotalDenomination() {
    var structure = this.denomStructure;
    var total = 0;
    structure.forEach(function(str){
      total += str.amount;
    });
    this.totalDenomination = total;
  }
  insertDenomination() {
    var structure = this.denomStructure;
    var data = this.selectedDenomination;
    data.forEach(function(denom){
      structure.forEach(function(str){
        if(parseInt(denom.denomination.amount) == str.note) {
          str.quantity = denom.quantity;
          str.amount = denom.quantity * str.note;
        }
      });
    });
    return structure;
  }
  closeCashDenomModal() {
    this.onCashDenomModal.cashDenomModal.onModalClose();
  }
  openReceiptDialogModal(value: string) {
    //find the timestamp and agents

    //get remittance receipt
    var remit = this.all_payments[2];
    this.selectedId = value;
    var receiptData = [];
    var r_agent, r_cashier, r_amount, r_doc_no, r_purchase_order, r_total_amount;
    var converter = require('number-to-words');
    remit.forEach(function(p){
      if(p.id == value) {
        this.receipt_AgentId = p.agent.id;
        this.receipt_Timestamp = p.timestamp;
        var toPush = {};
        toPush['agent'] = p.agent;
        toPush['cashier'] = p.cashier_name;
        toPush['amount_in_words'] = this.toTitleCase(converter.toWords(p.total_amount));
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
  toTitleCase(str) {
      return str.replace(/\w\S*/g, function(txt){
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
  }
  getRemittanceReceipt() {
    this.loadingRemittance = true;
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
      this.loadingRemittance = false;
    },
    (err) => {
      console.log(err);
    });
  }
}
