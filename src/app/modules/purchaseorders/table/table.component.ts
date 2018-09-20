import { Component, OnInit, ViewChild } from '@angular/core';
import { PurchaseOrderService } from '../purchaseorders.service';
import { PoModal } from '../po-modal/po-modal.component';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class PoComponent implements OnInit {
  @ViewChild('onNewItemComponent') onNewItemComponent: PoModal;
  public purchaseorderReport = [];
  public itemsPerPage: number = 5;

  public filterDate: string = '';
	public filterSearchQuery: string = '';
	public searchQuery: string = '';

  constructor(private reportsService: PurchaseOrderService) { }

  ngOnInit() {
    this.purchaseorderReport = this.reportsService.getDSCRReport();
  }

  public viewPurchaseOrder(n) {
    console.log(n);
		this.onNewItemComponent.itemCreateModal.onModalOpen();
	}

  public onShowCountChange($event) {
    this.itemsPerPage = $event.target.value;
  }

  public onFilterDateChange($event) {
		this.filterDate = $event.target.value;
		console.log($event.target.value);
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

}
