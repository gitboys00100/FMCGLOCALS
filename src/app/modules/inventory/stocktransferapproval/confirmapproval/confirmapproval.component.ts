import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalComponent } from '../../../core-modal/modal/modal.component';
import { ApiService } from '../../../../shared/api.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-confirmapproval',
  templateUrl: './confirmapproval.component.html',
  styleUrls: ['./confirmapproval.component.css']
})
export class ConfirmapprovalComponent implements OnInit {
  @ViewChild('ConfirmApprovalModal') ConfirmApprovalModal: ModalComponent;
  @ViewChild('ipt') input: ElementRef;

  public stock_issue_id: number = 0;
  public stock_issue_item_id: number = 0;

  constructor(private apiService: ApiService) { }
  data_content = null;

  ngOnInit() {
    this.data_content;
  }

  getContent(content){
    if(this.data_content != null){
      this.data_content = content;
      this.stock_issue_id = this.data_content.id;
      this.stock_issue_item_id = this.data_content.items[0].id;
      //console.log(this.stock_issue_id);
      //console.log(this.stock_issue_item_id);
      //console.log(this.data_content);
    }

  }

  onApproveStock(){
    var qty = this.input.nativeElement.value;
    console.log("approved qty: "+qty);
    var data = {};
    //data['quantity_approved'] = qty;
    //data['status'] = "Approved";
    //data['items'] = {"quantity_approved" : qty};
    data['quantity_approved'] = qty;
    //data['status'] = "Approved";
    console.log(this.data_content);
    let stockjson = JSON.stringify(data);
    this.approvedQty('stock_issues/'+this.stock_issue_id+'/items/'+this.stock_issue_item_id,stockjson);

    // .catch(this.handleError);
  }
  approvedQty(url: string, payload: string){
/*
    this.apiService.patch(url, payload)
		.subscribe((response) => {
      console.log(response);
    });
*/
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
  isEmpty(obj: any) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }


  // modal
  openModal() {
		this.ConfirmApprovalModal.onModalOpen();
	}

	closeModal() {
		this.ConfirmApprovalModal.onModalClose();
	}

}
