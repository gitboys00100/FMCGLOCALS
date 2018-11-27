import { Component, OnInit, Input, ElementRef,ViewChild } from '@angular/core';
import { StockTransferOrdersService } from '../../../shared/stock-transfer-orders.service';
import { StocktransferapprovalComponent } from '../stocktransferapproval/stocktransferapproval.component';
import { ApiService } from '../../../shared/api.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ModalComponent } from '../../core-modal/modal/modal.component';


@Component({
  selector: 'app-stock-transfer-orders',
  templateUrl: './stock-transfer-orders.component.html',
  styleUrls: ['./stock-transfer-orders.component.css']
})
export class StockTransferOrdersComponent implements OnInit {
  @ViewChild('onStockApprovedComponent') onStockApprovedComponent: StocktransferapprovalComponent;
  @ViewChild('stockDetails') stockDetails : ModalComponent;
  @ViewChild('confirmApproval') confirmApproval : ModalComponent;
    @ViewChild('ipt') input: ElementRef;
  loading:boolean;

  stocktransferoderlist = [];
  public filterSearchQuery: string = '';
	public searchQuery: string = '';
  public itemsPerPage: number = 5;
  public filterTransfer: string = '';
	public filterAgent: string = '';
	public filterDate: string = '';
  order: string = 'id';
	reverse: boolean = false;

  orNumber: boolean = false;
  orAgent: boolean = true;
  orDate: boolean = true;

	type: string = 'asc';
  arr: Array<{}> = [];
  data_content: Array<{}> = [];
  prodNames: Array<{}> = [];
  //public arr = <any>{};
  public stock_issue_id: number = 0;
  public stock_issue_item_id: number = 0;
  public stock_issue_user: number = 0;

  public requested: number = 0;

  constructor(private apiService: ApiService,private stockDetailsService: StockTransferOrdersService) { }

  ngOnInit() {
    this.loading = false;
    this.scrollwidth();
    this.getStocksTransferOrderList();
  }

  // --------------------- API CALL ------------------------------------------------------
  getStocksTransferOrderList() {
    this.loading = true;
    this.apiService.get('stock_issues/').map((res:any) => res.data)
		.subscribe((data:any[]) => {
      let item: any[] = JSON.parse('['+JSON.stringify(data)+']');
      //console.log("asd: "+JSON.stringify(Object.values(data)));
      this.stocktransferoderlist = Object.values(data);
      //this.stocktransferoderlist = [];
      console.log(this.stocktransferoderlist);
      let ctr = 0;
      for(var o of this.stocktransferoderlist){

if(ctr == 0){
  this.arr.push({
    username: o.user.username,
    name: o.user.first_name+' '+o.user.last_name,
  });

  ctr = 1;
}

var ui = 0;
/*
var i;
for (i = 0; i < this.arr.length; i++) {
  if(this.arr[i].username == o.user.username){
    ui = 1;
  }
}
*/
for(var i of this.arr){
  if(i['username'] == o.user.username){
    ui = 1;
  }
}

if(ui == 0){
  this.arr.push({
    username: o.user.username,
    name: o.user.first_name+' '+o.user.last_name,
  });
}

      }

      this.loading = false;
      console.log(this.arr);

    },
		(err) => {
			console.log(err);
		});
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
  // ------------------------ others ------------------------------
  public scrollwidth(){
    $('table').on('scroll', function () {
      $("table > *").width($("table").width() + $("table").scrollLeft());
    });
	}




/*
	setOrder(value: string) {
    if(this.order === value) {
      this.reverse = !this.reverse;
      this.type = this.reverse ? 'desc' : 'asc';
    }

    this.order = value;
  }
*/
setOrder(value: string, caret_name: string) {
  if(this.order === value) {
    this.reverse = !this.reverse;
  }

  this.order = value;
  if(caret_name == 'number') {
    this.orNumber = false;
    this.orAgent = true;
    this.orDate = true;
  }
  else if(caret_name == 'agent') {
    this.orNumber = true;
    this.orAgent = false;
    this.orDate = true;
  }
  else if(caret_name == 'date') {
    this.orNumber = true;
    this.orAgent = true;
    this.orDate = false;
  }

}







  public openForApproveModal(datas){
    this.stock_issue_user = datas.user_id;
    this.stock_issue_id = datas.id;
    this.data_content = datas;
    this.stockDetails.onModalOpen();
  }
  public closeForApproveModal(){
    this.stockDetails.onModalClose();
  }

  public onConfirmApproval(content) {
    //console.log(content.quantity_requested);
    this.requested = content.quantity_requested;
    this.stock_issue_item_id = content.id;
    this.stockDetails.onModalClose();

    let x = <HTMLInputElement>document.getElementById('qty');
    x.value = '';
    this.confirmApproval.onModalOpen();
  }
  public onConfirmClose() {
    this.confirmApproval.onModalClose();
  }

  onApproveStock(){
    var qty = this.input.nativeElement.value;

    let inputValue : number = 0;
    let inputValue2 = '';
    if (qty.indexOf(',') > -1) {
      let inputQTY = qty.split(',');

      for(var o of inputQTY){
        inputValue2 += o;
      }
      inputValue = parseInt(inputValue2);
    }
    else{
      inputValue = qty;
    }



    console.log("approved qty: "+inputValue);

    if(inputValue > this.requested){
      alert('Quantity is higher than requested!');
      this.confirmApproval.onModalClose();
    }
    else{
      var data = {};
      data['quantity_approved'] = inputValue;
      console.log(this.data_content);
      let stockjson = JSON.stringify(data);
      this.approvedQty('stock_issues/'+this.stock_issue_id+'/items/'+this.stock_issue_item_id,stockjson);


      let data2 = {};
      data2['user_id'] = this.stock_issue_user;
      data2['status'] = 2;
      let stockjson2 = JSON.stringify(data2);
      //let user_json_string = data2;
      console.log(data2);
      //this.approvedQty2('stock_issues/'+this.stock_issue_id+'/status/', stockjson2);
      // .catch(this.handleError);
    }

  }




  approvedQty(url: string, payload: string){

    this.apiService.patch(url, payload)
    .subscribe((response) => {
      if(response['code'] == 2004 && response['message'] == 'Entry updated') {
        console.log(response);
        //alert('Approved!');
        //window.location.reload();
      }
      else {
        alert(response['code']+':'+response['message']);
      }
    });




  }



  approvedQty2(url: string, load: string){

  this.apiService.post(url, load)
  .subscribe((response) => {
    if(response['status'] == 201 && response['statusText'] == 'Created') {
      alert('Success!');
      window.location.reload();
    }
    else {
      alert(response['status']+':'+response['statusText']);
    }
  });

}



checkQTY(val){
  var input = <HTMLInputElement>document.getElementById('qty');
  var number = input.value;

  if (number.indexOf(',') > -1) {
    let inputQTY = number.split(',');
    let inputValue = '';

    for(var o of inputQTY){
      inputValue += o;
    }

    let numberInInt = Math.abs(parseInt(inputValue));
    let numberInString = numberInInt.toLocaleString();
    let x = <HTMLInputElement>document.getElementById('qty');
    x.value = numberInString.toString()


   }
   else{

     if(val <= 0){
       alert("Invalid Quantity!");
     }


       var numberInInt = Math.abs(parseInt(number));
       var numberInString = numberInInt.toLocaleString();

       if(numberInString == 'NaN'){
         let x = <HTMLInputElement>document.getElementById('qty');
         x.value = '';
       }
       else{
         console.log(numberInString.toString());
         let x = <HTMLInputElement>document.getElementById('qty');
         x.value = numberInString.toString();
       }

   }



}

}
