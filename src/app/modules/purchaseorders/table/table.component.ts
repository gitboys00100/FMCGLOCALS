import { Component, OnInit, ViewChild } from '@angular/core';
import { PurchaseOrderService } from '../purchaseorders.service';
import { PoModal } from '../po-modal/po-modal.component';

import { ApiService } from '../../../shared/api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class PoComponent implements OnInit {
  @ViewChild('onNewItemComponent') onNewItemComponent: PoModal;

  loading:boolean;

  public purchaseorderReport = [];
  public itemsPerPage: number = 5;

  public filterDate: string = '';
	public filterSearchQuery: string = '';
	public searchQuery: string = '';

  arrRetailers: any[];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loading = false;
    this.getPO();
    //this.purchaseorderReport = this.reportsService.getDSCRReport();
  }




  getPO() {
    /*
    this.apiService.get('retailers/').subscribe(
      (terms) => {
        console.log(terms);
      },
      (err) => {
        console.log(err);
      }
    )
  */
  this.loading = true;
  this.apiService.get('purchase_orders/')
  .subscribe(ret => {
    let data: any[] = JSON.parse('['+JSON.stringify(ret)+']');
    console.log(Object.values(data));
    this.arrRetailers = Object.values(data);
    this.loading = false;
    },
    (err) => {
      console.log(err);
    }
  )

  //console.log("aa");
  //console.log(this.arrRetailers);

  }

  public getTotalPtoRequests(arr){
    /*
    let qty: number = 0;

    for (var i=0; i<arr.length; i++) {
      qty = qty + arr[i].quantity_ordered;
      console.log(qty);
    }

    return qty;
    */
    return arr.length;
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
