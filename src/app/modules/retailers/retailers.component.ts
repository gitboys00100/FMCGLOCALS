import { Component, OnInit, ViewChild } from '@angular/core';
//import { InventoryItemCreateComponent } from '../inventory-item-create/inventory-item-create.component';
import { NewRetailerComponent } from './new-retailer/new-retailer.component';

@Component({
  selector: 'app-retailers',
  templateUrl: './retailers.component.html',
  styleUrls: ['./retailers.component.css']
})
export class RetailersComponent implements OnInit {

	@ViewChild('onNewRetailer') onNewRetailer: NewRetailerComponent;
  constructor() { }

  ngOnInit() {

  }

  public onNewRet() {
    this.onNewRetailer.newretailerCreateModal.onModalOpen();
  }

}
