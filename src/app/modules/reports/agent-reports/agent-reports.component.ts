import { Component, OnInit, ViewChild } from '@angular/core';
import { DataCountsService } from '../../../shared/data-counts.service';
import { ModalComponent } from '../../../modules/core-modal/modal/modal.component';
import { ReportExcelService } from '../../../shared/report-excel.service';
import { ApiService } from '../../../shared/api.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-agent-reports',
  templateUrl: './agent-reports.component.html',
  styleUrls: ['./agent-reports.component.css']
})
export class AgentReportsComponent implements OnInit {

  loading: boolean;
  reports: any[];
  order: string = 'agent';
  reverse: boolean = false;
  agent: boolean = false;
  transferordernumber: boolean = false;
  date: boolean = false;
  productname: boolean = false;
  uom: boolean = false;
  requestedquantity: boolean = false;
  loadinquantity: boolean = false;
  loadoutquantity: boolean = false;
  estimatedsales: boolean = false;

  reverseAgent: boolean = false;
  reverseTransferOrderNumber: boolean = false;
  reverseDate: boolean = false;
  reverseProductName: boolean = false;
  reverseUOM: boolean = false;
  reverseRequestedQuantity: boolean = false;
  reverseLoadinQuantity: boolean = false;
  reverseLoadoutQuantity: boolean = false;
  reverseEstimatedSales: boolean = false;

  signatures: any[];
  agents: string;
  today: number = Date.now();
  selectedDate: number;
  pipeStatus: number = 0;
  datacount: number = 0;
  selectedIndex: string;
  headers: any[];
  headersPerProduct: any[];
  stock_issues: any[];

	public itemsPerPage: number = 5;
  public filterSearchQuery: string = '';
  public searchQuery: string = '';
  @ViewChild('viewReportsDetail') viewReportsDetail: ModalComponent;

  constructor(private data: DataCountsService,
    private excelService: ReportExcelService,
    private apiService: ApiService) { }

  ngOnInit() {
    this.loading = false;
    this.agents = 'All';
    this.headers = ['Agent', "Order Number", "Date", "Products Name", "UOM", "Requested Quantity",
      "Load In Quantity", "Load Out Quantity", "Estimated Sales"];
    this.headersPerProduct = ["Agent", "Product Name", "UOM", "Requested Quantity", "Load In Quantity",
      "Load Out Quantity", "Estimated Sales"];

    this.getStockIssue();

    this.selectedDate = this.today;

    this.data.currentReportsCount.subscribe(datacount => this.datacount = datacount);
  }
  setAgent(a: string) {
    this.agents = a;
  }
  showMore(id: string) {
    var moreDiv = <HTMLInputElement>document.getElementById('more_'+id);
    var collapse_productname = <HTMLInputElement>document.getElementById('collapse_productname_'+id);
    var collapse_uom = <HTMLInputElement>document.getElementById('collapse_uom_'+id);
    var collapse_requestedquantity = <HTMLInputElement>document.getElementById('collapse_requestedquantity_'+id);
    var collapse_loadinquantity = <HTMLInputElement>document.getElementById('collapse_loadinquantity_'+id);
    var collapse_loadoutquantity = <HTMLInputElement>document.getElementById('collapse_loadoutquantity_'+id);
    var collapse_estimatedsales = <HTMLInputElement>document.getElementById('collapse_estimatedsales_'+id);

    collapse_productname.style.display = "inline";
    collapse_uom.style.display = "inline";
    collapse_requestedquantity.style.display = "inline";
    collapse_loadinquantity.style.display = "inline";
    collapse_loadoutquantity.style.display = "inline";
    collapse_estimatedsales.style.display = "inline";
    moreDiv.style.display = "none";
  }
	public onShowCountChange($event) {
		this.itemsPerPage = $event.target.value;
	}


  public onFilterSearchChange($event) {
		this.searchQuery = $event.target.value;
    if($event.target.value == '') {
      this.data.changeReportsCount(this.stock_issues.length);
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

  setDateToday() {
    var d = (<HTMLInputElement>document.getElementById("date"));
    var dateString = new Date();
    d.value = dateString.getFullYear()+"-"+("0" + (dateString.getMonth() + 1)).slice(-2)+"-"+dateString.getDate();
    this.selectedDate = this.today;
  }

  onChangeDate(date:any) {
    this.selectedDate = new Date(date).getTime();
  }
  getStockIssue() {
    this.loading = true;
    this.apiService.get('stock_issues/')
		.subscribe(ret => {
      let data: any[] = JSON.parse(JSON.stringify(ret['data']));
      console.log(Object.values(data));
      //alert(data.message);
      //console.log(data.data);
      this.stock_issues = Object.values(data);
      this.loading = false;
    },
		(err) => {
			console.log(err);
		});
  }
  setReportsOrder(value: string, caret_name: string) {
    if(this.order === value) {
      this.reverse = !this.reverse;

      if(caret_name == 'agent') {
        this.reverseAgent = !this.reverseAgent;
      }
      else if(caret_name == 'transferordernumber') {
        this.reverseTransferOrderNumber = !this.reverseTransferOrderNumber;
      }
      else if(caret_name == 'date') {
        this.reverseDate = !this.reverseDate;
      }
      else if(caret_name == 'productname') {
        this.reverseProductName = !this.reverseProductName;
      }
      else if(caret_name == 'requestedquantity') {
        this.reverseRequestedQuantity = !this.reverseRequestedQuantity;
      }
      else if(caret_name == 'uom') {
        this.reverseUOM = !this.reverseUOM;
      }
      else if(caret_name == 'loadinquantity') {
        this.reverseLoadinQuantity = !this.reverseLoadinQuantity;
      }
      else if(caret_name == 'loadoutquantity') {
        this.reverseLoadoutQuantity = !this.reverseLoadoutQuantity;
      }
      else if(caret_name == 'estimatedsales') {
        this.reverseEstimatedSales = !this.reverseEstimatedSales;
      }
    }
    this.order = value;
    if(caret_name == 'agent') {
      this.reverse = this.reverseAgent;
      this.reverseTransferOrderNumber = false;
      this.reverseDate = false;
      this.reverseProductName = false;
      this.reverseUOM = false;
      this.reverseRequestedQuantity = false;
      this.reverseLoadinQuantity = false;
      this.reverseLoadoutQuantity = false;
      this.reverseEstimatedSales = false;
    }
    else if(caret_name == 'transferordernumber') {
      this.reverse = this.reverseTransferOrderNumber;
      this.reverseAgent = false;
      this.reverseDate = false;
      this.reverseProductName = false;
      this.reverseUOM = false;
      this.reverseRequestedQuantity = false;
      this.reverseLoadinQuantity = false;
      this.reverseLoadoutQuantity = false;
      this.reverseEstimatedSales = false;
    }
    else if(caret_name == 'date') {
      this.reverse = this.reverseDate;
      this.reverseAgent = false;
      this.reverseTransferOrderNumber = false;
      this.reverseProductName = false;
      this.reverseUOM = false;
      this.reverseRequestedQuantity = false;
      this.reverseLoadinQuantity = false;
      this.reverseLoadoutQuantity = false;
      this.reverseEstimatedSales = false;
    }
    else if(caret_name == 'productname') {
      this.reverse = this.reverseProductName;
      this.reverseAgent = false;
      this.reverseTransferOrderNumber = false;
      this.reverseDate = false;
      this.reverseUOM = false;
      this.reverseRequestedQuantity = false;
      this.reverseLoadinQuantity = false;
      this.reverseLoadoutQuantity = false;
      this.reverseEstimatedSales = false;
    }
    else if(caret_name == 'uom') {
      this.reverse = this.reverseUOM;
      this.reverseAgent = false;
      this.reverseTransferOrderNumber = false;
      this.reverseDate = false;
      this.reverseProductName = false;
      this.reverseRequestedQuantity = false;
      this.reverseLoadinQuantity = false;
      this.reverseLoadoutQuantity = false;
      this.reverseEstimatedSales = false;
    }
    else if(caret_name == 'requestedquantity') {
      this.reverse = this.reverseRequestedQuantity;
      this.reverseAgent = false;
      this.reverseTransferOrderNumber = false;
      this.reverseDate = false;
      this.reverseProductName = false;
      this.reverseUOM = false;
      this.reverseLoadinQuantity = false;
      this.reverseLoadoutQuantity = false;
      this.reverseEstimatedSales = false;
    }
    else if(caret_name == 'loadinquantity') {
      this.reverse = this.reverseLoadinQuantity;
      this.reverseAgent = false;
      this.reverseTransferOrderNumber = false;
      this.reverseDate = false;
      this.reverseProductName = false;
      this.reverseUOM = false;
      this.reverseRequestedQuantity = false;
      this.reverseLoadoutQuantity = false;
      this.reverseEstimatedSales = false;
    }
    else if(caret_name == 'loadoutquantity') {
      this.reverse = this.reverseLoadoutQuantity;
      this.reverseAgent = false;
      this.reverseTransferOrderNumber = false;
      this.reverseDate = false;
      this.reverseProductName = false;
      this.reverseUOM = false;
      this.reverseRequestedQuantity = false;
      this.reverseLoadinQuantity = false;
      this.reverseEstimatedSales = false;
    }
    else if(caret_name == 'estimatedsales') {
      this.reverse = this.reverseEstimatedSales;
      this.reverseAgent = false;
      this.reverseTransferOrderNumber = false;
      this.reverseDate = false;
      this.reverseProductName = false;
      this.reverseUOM = false;
      this.reverseRequestedQuantity = false;
      this.reverseLoadinQuantity = false;
      this.reverseLoadoutQuantity = false;
    }
  }
  viewDetails(index: string) {
    this.selectedIndex = index;
    this.openModal();
  }

  captureTable(data: HTMLInputElement, elemId: string) {
    html2canvas(data).then(canvas=>{
      // Few necessary setting options
      var imgWidth = 210;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      if(elemId == 'modalPdfContent') {
        pdf.save('Agent_Reports_Per_Order.pdf'); // Generated PDF
      }
      else if(elemId == 'pdfContent') {
        pdf.save('Agent_Reports.pdf'); // Generated PDF
      }

      var tbody = <HTMLInputElement>document.getElementById('reportbody');
      tbody.classList.add('scrollable-tbody');
      //this.submitted = false;
    });
  }

  exportToFile(format: string, elemId: string) {
    if(format == 'pdf') {
      var tbody = <HTMLInputElement>document.getElementById('reportbody');
      tbody.classList.remove('scrollable-tbody');
      window.setTimeout(()=>{
        var data = <HTMLInputElement>document.getElementById(elemId);
        //wait until the element comes out
        if(data) {
          this.captureTable(data, elemId);
        }
      }, 1);
    }
    else {
      if(elemId == 'pdfContent') {
        let r = Object.values(this.stock_issues);
        this.excelService.generateExcel('Agent Reports', 'agent_reports', r, this.headers, format);
      }
      else if(elemId == 'modalPdfContent') {
        var selectedStock = [];
        var id = this.selectedIndex;
        var stock = this.stock_issues;
        for(var x=0;x<stock.length;x++) {
          if(stock[x].id == id) {
            selectedStock.push(stock[x]);
          }
        }
        let r = Object.values(selectedStock);

        //console.log(r);
        this.excelService.generateExcel('Agent Reports Per Products', 'agent_reports_per_products', r,
        this.headersPerProduct, format, this.selectedIndex);
      }
    }
  }

  openModal() {
    this.viewReportsDetail.onModalOpen();
  }
  closeModal() {
    this.viewReportsDetail.onModalClose();
  }
}
