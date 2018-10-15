import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../core-modal/modal/modal.component';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { ApiService } from '../../../shared/api.service';

//import { Inputs } from './data.model';

@Component({
	selector: 'app-adduser-modal',
	templateUrl: './adduser-modal.component.html',
	styleUrls: ['./adduser-modal.component.css']
})
export class AddUserComponent implements OnInit {
	@ViewChild('itemCreateModal') itemCreateModal: ModalComponent;

public data: any[];
public json_data: any[];
public response: any[];

/*
	profileForm = new FormGroup({
		firstName: new FormControl(''),
		lastName: new FormControl(''),
		username: new FormControl(''),
		email: new FormControl(''),
		password: new FormControl(''),
		role: new FormControl(''),
	});
*/

public profileForm = this.fb.group({
		firstName: ['', Validators.required],
		lastName: ['', Validators.required],
		username: ['', Validators.required],
		email: ['', Validators.required],
		password: ['', Validators.required],
		role: ['', Validators.required],
	});



	constructor(private fb: FormBuilder, private apiService: ApiService) {}


	ngOnInit() {
	}


	onSubmit() {
		//this.data = JSON.stringify(this.profileForm.value, null, 4);
		this.data = this.profileForm.value;

		let userdata = {};
		    userdata['username'] = this.profileForm.get('username').value;
				userdata['password'] = this.profileForm.get('password').value;
				userdata['email'] = this.profileForm.get('email').value;
				userdata['first_name'] = this.profileForm.get('firstName').value;
				userdata['last_name'] = this.profileForm.get('lastName').value;
				userdata['is_superuser'] = false;
				userdata['is_staff'] = false;
				userdata['is_active'] = false;
				userdata['profile'] = {
					"role_id": this.profileForm.get('role').value,
					"company_id": 1
				};

		let user_json_string = userdata;
		console.log(user_json_string);
/*

this.json_data = {
	"username": this.data.username,
	"password": this.data.password,
	"email": this.data.email,
	"first_name": this.data.firstName,
	"last_name": this.data.lastName,
	"is_superuser": false,
	"is_staff": false,
	"is_active": false,
	"profile": {
		"role_id": this.data.role,
		"company_id": 1,
		}
	};

*/


//console.log(this.json_data);
//alert(JSON.stringify(this.json_data, null, 4));

this.apiService.post('users/',user_json_string).subscribe(ret => {
	let data: any[] = JSON.parse('['+JSON.stringify(ret)+']');
	//console.log(Object.values(data));
	this.response = Object.values(data);
	console.log(this.response);
	//alert(JSON.stringify(this.response, null, 4));
	alert("Success");
	location.reload();
	this.itemCreateModal.onModalClose();
	},
	(err) => {
		console.log(err);
	}
);


/*
		this.json_data = '[{
			"username": this.data.username,
			"password": this.data.password,
			"email": this.data.email,
			"first_name": this.data.firstName,
			"last_name": this.data.lastName,
			"is_superuser": False,
			"is_staff": False,
			"is_active": False,
			"profile": {
				"role_id": this.data.role,
				"company_id": 1,
				}
			}]';
*/

			//alert(this.json_data);

/*
		this.apiService.get('item_returns/')
		.subscribe(ret => {
			let data: any[] = JSON.parse('['+JSON.stringify(ret)+']');
			//console.log(Object.values(data));
			this.inventoryList = Object.values(data);
			console.log(this.inventoryList);
			//alert(JSON.stringify(this.inventoryList, null, 4));

			},
			(err) => {
				console.log(err);
			}
		)
*/



		//alert(this.data.firstName);
  // TODO: Use EventEmitter with form value
  //console.warn(this.profileForm.value);
}




	openModal() {
		this.itemCreateModal.onModalOpen();
	}

	closeModal() {
		this.itemCreateModal.onModalClose();
	}


/*
	addUser(title:string){
    console.log(title);
		alert(title);
		this.itemCreateModal.onModalClose();
	}
	*/

	public addUser() {
		//this.filterSearchQuery = this.searchQuery;
    //console.log(this.firstName);
	}



}
