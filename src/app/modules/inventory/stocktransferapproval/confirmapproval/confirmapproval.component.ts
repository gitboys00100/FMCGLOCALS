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

  constructor(private apiService: ApiService) { }

  ngOnInit() {

  }

  onApproveStock(){
    var qty = this.input.nativeElement.value;
    console.log("approved qty: "+qty);
    var data = {};
    data['quantity_received'] = qty;
    let stockjson = JSON.stringify(data);
    this.approvedQty('stock_issues/',stockjson);

    // .catch(this.handleError);
  }
  approvedQty(url: string, payload: string){
    this.apiService.patch(url, payload)
		.subscribe((response) => {
      console.log(response);
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
