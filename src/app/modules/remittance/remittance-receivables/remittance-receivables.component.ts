import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../modules/core-modal/modal/modal.component';
import { DataCountsService } from '../../../shared/data-counts.service';

@Component({
  selector: 'app-remittance-receivables',
  templateUrl: './remittance-receivables.component.html',
  styleUrls: ['./remittance-receivables.component.css']
})
export class RemittanceReceivablesComponent implements OnInit {
  @ViewChild('confirmationDialog') confirmationDialog: ModalComponent;

  constructor(private data: DataCountsService) { }
  receivables: any[];
  agents: string;

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

  public filterSearchQuery: string = '';
  public searchQuery: string = '';
	public itemsPerPage: number = 5;


  ngOnInit() {
    this.agents = 'All';
    this.receivables = [{
      "rid": "1",
      "agent": "Juan Dela Cruz",
      "retailer": "Jen's Store",
      "total": "10,000.00",
      "amount_paid": "7,000.00",
      "balance": "2,500.00",
      "status": "received",
      "receiveddate": "1536537600000"
      },
      {
      "rid": "2",
      "agent": "Totoy Bibo",
      "retailer": "Aling Nena Store",
      "total": "15,000.00",
      "amount_paid": "3,000.00",
      "balance": "5,000.00",
      "status": "not-received",
      "receiveddate": "1536537600000"
      },
      {
      "rid": "3",
      "agent": "Mang Inasal",
      "retailer": "SM Store",
      "total": "20,000.00",
      "amount_paid": "1,000.00",
      "balance": "3,300.00",
      "status": "received",
      "receiveddate": "1536537600000"
    },
    {
      "rid": "4",
      "agent": "Pedro Penduko",
      "retailer": "Rakista Store",
      "total": "31,000.00",
      "amount_paid": "2,000.00",
      "balance": "4,000.00",
      "status": "not-received",
      "receiveddate": "1536537600000"
    },
    {
      "rid": "5",
      "agent": "James Bond",
      "retailer": "Head n Shoulders Store",
      "total": "50,000.00",
      "amount_paid": "3,000.00",
      "balance": "47,000.00",
      "status": "not-received",
      "receiveddate": "1536537600000"
    },
    {
      "rid": "6",
      "agent": "Yellow Ranger",
      "retailer": "The Black Market",
      "total": "25,000.00",
      "amount_paid": "2,000.00",
      "balance": "6,000.00",
      "status": "not-received",
      "receiveddate": "1536537600000"
    },
    {
      "rid": "7",
      "agent": "Ringo Starr",
      "retailer": "Rockwell Store",
      "total": "30,000.00",
      "amount_paid": "5,000.00",
      "balance": "3,000.00",
      "status": "received",
      "receiveddate": "1536537600000"
    },
    {
      "rid": "8",
      "agent": "Tata Lino",
      "retailer": "3 storey-store",
      "total": "6,000.00",
      "amount_paid": "3,000.00",
      "balance": "2,000.00",
      "status": "not-received",
      "receiveddate": "1536537600000"
    },
    {
      "rid": "9",
      "agent": "Ash Ketchum",
      "retailer": "Poke Mart",
      "total": "23,000.00",
      "amount_paid": "5,000.00",
      "balance": "8,000.00",
      "status": "not-received",
      "receiveddate": "1536537600000"
    },
    {
      "rid": "10",
      "agent": "Barry Allen",
      "retailer": "The Fast Food",
      "total": "23,000.00",
      "amount_paid": "20,000.00",
      "balance": "3,000.00",
      "status": "not-received",
      "receiveddate": "1536537600000"
    },
    {
      "rid": "11",
      "agent": "Donald Trumpet",
      "retailer": "USEA",
      "total": "20,000.00",
      "amount_paid": "10,000.00",
      "balance": "10,000.00",
      "status": "not-received",
      "receiveddate": "1536537600000"
    }
    ];
    this.selectedDate = this.today;

    this.data.currentRemittanceCount.subscribe(datacount => this.datacount = datacount)
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
    for(var x =0;x<this.receivables.length;x++) {
      if(parseInt(this.receivables[x].rid) == parseInt(index)) {
        this.receivables[x].status = "received";
      }
    }
    this.pipeStatus += 1;
    this.closeConfirmationModal(index);
  }
  openConfirmationModal(index: string) {
    this.clickedRemittance = index;
    this.confirmationDialog.onModalOpen();
  }
  closeConfirmationModal(index: string) {
    var c = (<HTMLInputElement>document.getElementById(index+"_checkbox"));
    c.checked = false;
    this.confirmationDialog.onModalClose();
  }
}
