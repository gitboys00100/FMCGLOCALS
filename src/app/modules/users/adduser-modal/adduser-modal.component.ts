import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../core-modal/modal/modal.component';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { ApiService } from '../../../shared/api.service';
import { Md5HasherService } from '../../../shared/md5-hasher.service';

//import { Inputs } from './data.model';
import { TranslateService } from '../../../shared/translate.service';


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

public userRoles: any[];
public fuserRoles: any[];

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
		password2: ['', Validators.required],
	});

public passInfo : string = '';
public passInfo2 : string = '';


	constructor(
		private fb: FormBuilder,
		private apiService: ApiService,
		private MD5hasher: Md5HasherService,
		private translateService: TranslateService
	) {}


	ngOnInit() {
		this.getRoles();
	}


	getRoles() {
    this.apiService.get('roles/')
    .subscribe(ret => {
      let data: any[] = JSON.parse('['+JSON.stringify(ret)+']');
      //console.log(Object.values(data));
      this.userRoles = Object.values(data);
			this.validateRole();
      },
      (err) => {
        console.log(err);
      }
    )
  }

	validateRole() {
		let rdata = [];
		for(var x=0; x<=this.userRoles[0]['data'].length -1; x++){
		if(this.userRoles[0]['data'][x].name !== 'Main Admin (CDSG)'){
			rdata.push({'id':this.userRoles[0]['data'][x].id,'name':this.userRoles[0]['data'][x].name});
		}
	}
	this.fuserRoles = rdata;
	console.log(this.fuserRoles);
}


	onSubmit() {
		//this.data = JSON.stringify(this.profileForm.value, null, 4);
		let userstorage = localStorage.getItem("session_data");
    let parser = window.atob(userstorage);
    let usersession = JSON.parse(parser);


		//console.log(usersession);

		this.data = this.profileForm.value;

		var hashPass = this.MD5hasher.MD5(this.profileForm.get('password').value);

		let userdata = {};
		    userdata['username'] = this.profileForm.get('username').value;
				userdata['password'] = hashPass;
				userdata['email'] = this.profileForm.get('email').value;
				userdata['first_name'] = this.profileForm.get('firstName').value;
				userdata['last_name'] = this.profileForm.get('lastName').value;
				userdata['profile'] = {
					"role_id": this.profileForm.get('role').value,
					"company_id": usersession.profile.role.company.id
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
	alert("The user was added successfully.");
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
		this.profileForm.reset();
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

	reset(){
		this.profileForm.reset();
	}

	translate(word){
	  return this.translateService.getTranslate(word);
	}

	complexPass(){
		let pass1 = this.profileForm.get('password').value;

		/*
    if( /[^a-zA-Z0-9]/.test(pass1) ) {
       this.passInfo = 'Password should have upper and lower letters, numbers and special character.';
    }
		else{
			 this.passInfo = '';
		}
		*/


	}

	confirmPass(){
		let pass1 = this.profileForm.get('password').value;
		let pass2 = this.profileForm.get('password2').value;

		if(pass1 != pass2){
			this.passInfo2 = 'The Confirm Password does not match.';
		}
		else{
			this.passInfo2 = '';
		}
	}

}
