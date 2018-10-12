import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../modules/core-modal/modal/modal.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-agentitinerary',
  templateUrl: './agentitinerary.component.html',
  styleUrls: ['./agentitinerary.component.css']
})
export class AgentitineraryComponent implements OnInit {
  editRetailerDetails: FormGroup;
  submitted = false;

  @ViewChild('deleteConfirmation') deleteConfirmation: ModalComponent;
  @ViewChild('editModal') editModal: ModalComponent;
  @ViewChild('editDetailsModal') editDetailsModal: ModalComponent;
  selectedRetailer: string;

  @Input() itinerary;
  constructor(private elRef: ElementRef, private formBuilder: FormBuilder) {
    this.createForm();
  }

  public isOpen: boolean = false;

  ngOnInit() {
  }

  createForm() {
    this.editRetailerDetails = this.formBuilder.group({
      retailer: '',
      number_of_items: '',
      balance: ''
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.editRetailerDetails.controls; }

  openEditModal() {
    this.editModal.onModalOpen();
  }
  closeEditModal() {
    this.editModal.onModalClose();
  }

  openDeleteConfirmationModal() {
    this.deleteConfirmation.onModalOpen();
  }
  closeDeleteConfirmationModal() {
    this.deleteConfirmation.onModalClose();
  }

  openEditDetailsModal(orderId: string) {
    this.selectedRetailer = orderId;
    let retailer, number_of_items, balance;

    for(var x=0;x<this.itinerary.itinerary_list.length;x++) {
      if(this.itinerary.itinerary_list[x].order == orderId) {
        retailer = this.itinerary.itinerary_list[x].retailer;
        number_of_items = this.itinerary.itinerary_list[x].no_of_items;
        balance = this.itinerary.itinerary_list[x].balance;
      }
    }
    this.editRetailerDetails.get('retailer').setValue(retailer);
    this.editRetailerDetails.get('number_of_items').setValue(number_of_items);
    this.editRetailerDetails.get('balance').setValue(balance);

    this.editDetailsModal.onModalOpen();
  }
  closeEditDetailsModal() {
    this.editDetailsModal.onModalClose();
  }

  public toggleBody() {
  	let rBody = this.elRef.nativeElement.querySelector('.row-body');
	if(!this.isOpen) {
		if (rBody.classList)
			rBody.classList.add('open');
		else
			rBody.className += 'open';
	}
	else {
		if (rBody.classList)
			rBody.classList.remove('open');
		else
			rBody.className = rBody.className.replate(/ *\b\S*?selected\S*\b/g, '');
	}
	this.isOpen = !this.isOpen;
   }

   public getTotalBalance(itineraryVal) {
   	let total = 0;

	for (let i = 0; i < itineraryVal.itinerary_list.length; i++) {
		total += parseFloat(itineraryVal.itinerary_list[i].balance);

	}

	return total;
   }
}
