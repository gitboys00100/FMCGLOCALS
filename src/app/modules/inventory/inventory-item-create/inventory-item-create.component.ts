import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalComponent } from '../../core-modal/modal/modal.component';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/api.service';

@Component({
	selector: 'app-inventory-item-create',
	templateUrl: './inventory-item-create.component.html',
	styleUrls: ['./inventory-item-create.component.css']
})
export class InventoryItemCreateComponent implements OnInit {
	@ViewChild('itemCreateModal') itemCreateModal: ModalComponent;
	@Input() inventoryList = [];

	public data: any[];
	public response: any[];

	public profileForm = this.fb.group({
			name: ['', Validators.required],
			sku: ['', Validators.required],
			category: ['', Validators.required],
			item_code: ['', Validators.required],
			barcode_number: ['', Validators.required],
			sub_category: ['', Validators.required],
			item_description: ['', Validators.required],
			weight: ['', Validators.required],
			price: ['', Validators.required],
			uom: ['', Validators.required],
		});

	constructor(private fb: FormBuilder, private apiService: ApiService) { }

	ngOnInit() {
	}

	reset(){
		this.profileForm.reset();
	}

	openModal() {
		this.itemCreateModal.onModalOpen();
	}

	closeModal() {
		this.profileForm.reset();
		this.itemCreateModal.onModalClose();
	}




	onSubmit() {
		//this.data = this.profileForm.value;

		let additem = {};
		    additem['company_id'] = 1;
				additem['category_id'] = 1;
				additem['name'] = this.profileForm.get('name').value;
				additem['name_bm'] = null;
				additem['srp'] = this.profileForm.get('price').value;
				additem['sku'] = this.profileForm.get('sku').value;
				additem['size'] = this.profileForm.get('weight').value;
				additem['uom'] = this.profileForm.get('uom').value;
				additem['item_code'] = this.profileForm.get('item_code').value;
				additem['barcode'] = this.profileForm.get('barcode_number').value;
				additem['description'] = this.profileForm.get('item_description').value;
				//additem['additional_fields'] = [];

		let user_json_string = additem;
		console.log(user_json_string);

this.apiService.post('items/',user_json_string).subscribe(ret => {
	let data: any[] = JSON.parse('['+JSON.stringify(ret)+']');
	this.response = Object.values(data);
	console.log(this.response);
	alert("Success");
	location.reload();
	},
	(err) => {
		console.log(err);
	}
);

this.itemCreateModal.onModalClose();
}



convertToNegative() {
  var input = <HTMLInputElement>document.getElementById('barcode_number');
  // Listen for input event on numInput.
  var number = input.value;
  if(!isNaN(parseInt(number))) {
    //var numberInInt = Math.abs(parseInt(number));
    var numberInString = number.toLocaleString();
    this.profileForm.get('barcode_number').setValue(numberInString.toString());
  }
  else {
    this.profileForm.get('barcode_number').setValue('');
  }
}








}
