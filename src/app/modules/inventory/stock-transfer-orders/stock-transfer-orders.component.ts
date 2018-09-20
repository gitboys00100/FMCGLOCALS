import { Component, OnInit, Input, ElementRef,ViewChild } from '@angular/core';
import { StockTransferOrdersService } from '../../../shared/stock-transfer-orders.service';
import { StocktransferapprovalComponent } from '../stocktransferapproval/stocktransferapproval.component';

// interface myData{
//   obj: Object
// }

@Component({
  selector: 'app-stock-transfer-orders',
  templateUrl: './stock-transfer-orders.component.html',
  styleUrls: ['./stock-transfer-orders.component.css']
})
export class StockTransferOrdersComponent implements OnInit {
  @ViewChild('onStockApprovedComponent') onStockApprovedComponent: StocktransferapprovalComponent;
  stocktransferoderlist = [];
  public filterSearchQuery: string = '';
	public searchQuery: string = '';
  public itemsPerPage: number = 5;
  public filterTransfer: string = '';
	public filterAgent: string = '';
	public filterDate: string = '';

  constructor(private stockDetailsService: StockTransferOrdersService) { }

  ngOnInit() {
    this.stocktransferoderlist = this.stockDetailsService.getStockTransferOrderList();
    // this.stockDetailsService.getAllTransfers().subscribe(data=>{
    // console.log("We got: ",data);
    //   this.stocktransferoderlist = data
    // });
  }
// ----------------------- START FILTERING FUNCTIONS -------------------------------------
  public onFilterTransferChange($event) {
		this.filterTransfer = $event.target.value;
	}

	public onFilterAgentChange($event) {
		this.filterAgent = $event.target.value;
	}

	public onFilterDateChange($event) {
		this.filterDate = $event.target.value;
	}

  // ----------------------- END FILTERING FUNCTIONS -------------------------------------

  // ----------------------- START SEARCH FUNCTIONS -------------------------------------
  public onFilterSearchChange($event) {
		this.searchQuery = $event.target.value;

		if (this.searchQuery === '')
		this.onSearch();
	}

  public onSearch() {
		this.filterSearchQuery = this.searchQuery;
    console.log(this.filterSearchQuery);
	}

	public onKeyDown($event) {
		if ($event.keyCode === 13) {
			this.onSearch();
			$event.preventDefault();
		}
	}

  // ----------------------- END SEARCH FUNCTIONS -------------------------------------


  // ----------------------- START COUNT FUNCTIONS -------------------------------------

  public onShowCountChange($event) {
		this.itemsPerPage = $event.target.value;
	}

  // ----------------------- END COUNT FUNCTIONS -------------------------------------

  // ------------------------------ FOR MODAL ---------------------------
    public onStockApproved(content) {
      this.onStockApprovedComponent.getContent(content);
  		this.onStockApprovedComponent.itemStockApprovalModal.onModalOpen();
  	}


}
