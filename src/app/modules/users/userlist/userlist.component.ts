import { Component, OnInit, ViewChild } from '@angular/core';

import { RetailerService } from '../retailer-service';
import { Retailer } from '../retailer.model';
import { AddUserComponent } from '../adduser-modal/adduser-modal.component';
import { EditUserComponent } from '../edituser-modal/edituser-modal.component';
import { DeleteUserComponent } from '../deleteuser-modal/deleteuser-modal.component';

import { ModalComponent } from '../../../modules/core-modal/modal/modal.component';
import { ApiService } from '../../../shared/api.service';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Md5HasherService } from '../../../shared/md5-hasher.service';

import { TranslateService } from '../../../shared/translate.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserListComponent implements OnInit {
  	@ViewChild('onAddComponent') onAddComponent: AddUserComponent;

    @ViewChild('deleteDialog') deleteDialog: ModalComponent;
    @ViewChild('editDialog') editDialog: ModalComponent;
    @ViewChild('addDialog') addDialog: ModalComponent;

    loading: boolean;

    public retailerList: Retailer[];
    public userRoles: any[];
    public fuserRoles: any[];

    public filterRole: string = '';
    public filterSearchQuery: string = '';
  	public searchQuery: string = '';
    public itemsPerPage: number = 5;

    public id: string = '';
    public role: number = 0;
    public fullName: string = '';

    public data: any[];
    public profileFormEdit = this.fb.group({
    		firstName: ['', Validators.required],
    		lastName: ['', Validators.required],
    		username: ['', Validators.required],
    		email: ['', Validators.required],
    	});

    order: string = 'first_name';
    reverse: boolean = false;

    th_name: boolean = false;
    th_email: boolean = true;
    th_role: boolean = true;

    public response: any[];


    public profileFormAdd = this.fb.group({
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
    public emailInfo : string = '';
    public vv = false;
    public vv2 = false;
    public p1 = 0;
    public p2 = 0;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private translateService: TranslateService,
    private MD5hasher: Md5HasherService,
  ) { }

  ngOnInit() {
    this.loading = false;
    this.getUsers();
    this.getRoles();

    //this.retailerList = this.itRetailerService.getRetailerData();
  }



  getRoles() {
		let userstorage = localStorage.getItem("session_data");
    let parser = window.atob(userstorage);
    let usersession = JSON.parse(parser);
//console.log('a'+ JSON.stringify(usersession));
    //this.apiService.get('roles/?company_id=1')
    this.apiService.get('roles/?company_id='+usersession.profile.role.company.id)
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


  getUsers() {
    this.loading = true;
    this.apiService.get('users/')
    .subscribe(ret => {
      let data: any[] = JSON.parse('['+JSON.stringify(ret)+']');
      console.log(Object.values(data));
      this.retailerList = Object.values(data);
      //this.retailerList = [];
      this.loading = false;
      },
      (err) => {
        console.log(err);
      }
    )
  }

/*
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
}
*/


  public onAdd() {
    this.addDialog.onModalOpen();

    //this.onAddComponent.reset();
		//this.onAddComponent.itemCreateModal.onModalOpen();
	}

  closeModal() {
		this.profileFormAdd.reset();
		this.addDialog.onModalClose();
	}




  onEditSubmit() {
    let userdata = {};
		    userdata['username'] = this.profileFormEdit.get('username').value;
				userdata['email'] = this.profileFormEdit.get('email').value;
				userdata['first_name'] = this.profileFormEdit.get('firstName').value;
				userdata['last_name'] = this.profileFormEdit.get('lastName').value;
				userdata['profile'] = {
					"role_id": this.role
				};

		let user_json_string = userdata;

    console.log(userdata);

    this.apiService.patch('users/'+this.id+'/', user_json_string)
    .subscribe((response) => {
      //console.log(response);
      if(response['code'] == 2004 && response['message'] == 'Entry updated') {
        alert('Update Successful!');
        this.getUsers();
        this.editDialog.onModalClose();
        //window.location.reload();
      }
      else {
        alert(response['code']+':'+response['message']);
      }
    });


      this.editDialog.onModalOpen();

}



  onEdit(user) {
    console.log(user);
    this.id = user.id;
    this.role = user.profile.role.id

    //alert(this.role);
    this.profileFormEdit.get('firstName').setValue(user.first_name);
    this.profileFormEdit.get('lastName').setValue(user.last_name);
    this.profileFormEdit.get('username').setValue(user.username);
    this.profileFormEdit.get('email').setValue(user.email);

    this.editDialog.onModalOpen();
  }

  closeEditModal() {
    this.editDialog.onModalClose();
  }



  onDelete(user) {
    this.id = user.id;
    this.fullName = user.first_name+" "+user.last_name;

    this.deleteDialog.onModalOpen();
  }

  onDeleteSubmitModal() {
    this.apiService.delete('users/'+this.id+'/')
    .subscribe((response) => {
      if(response['code'] == 2005 && response['message'] == 'Entry deleted') {
        alert('Delete Successful!');
        //window.location.reload();
        this.getUsers();
      }
      else {
        alert(response['code']+':'+response['message']);
      }
    });

    this.deleteDialog.onModalClose();
  }

  closeDeleteModal() {
    this.deleteDialog.onModalClose();
  }




  public onShowCountChange($event) {
    this.itemsPerPage = $event.target.value;
  }

  public onFilterRole($event) {
    //alert(JSON.stringify($event.target, null, 4));
		this.filterRole = $event.target.value;
		console.log($event.target.value);
	}

	public onFilterSearchChange($event) {
		this.searchQuery = $event.target.value;

		if (this.searchQuery === '')
		this.onSearch();
	}

	public onSearch() {
		this.filterSearchQuery = this.searchQuery;
    console.log(this.searchQuery);
	}

	public onKeyDown($event) {
		if ($event.keyCode === 13) {
			this.onSearch();
			$event.preventDefault();
		}
	}

  setHeaderOrder(value: string, caret_name: string) {
    if(this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
    if(caret_name == 'th_name') {
      this.th_name = false;
      this.th_email = true;
      this.th_role = true;
    }
    else if(caret_name == 'th_email') {
      this.th_name = true;
      this.th_email = false;
      this.th_role = true;
    }
    else if(caret_name == 'th_role') {
      this.th_name = true;
      this.th_email = true;
      this.th_role = false;
    }
  }


language(){
  let userstorage = localStorage.getItem("session_data");
  let parser = window.atob(userstorage);
  let usersession = JSON.parse(parser);

  //console.log(usersession.username);
  //var add = {"lang":"en"}
  //usersession.push(add);
  usersession['lang'] = 'my';
  //console.log(usersession);
  let jsonStringyfy = JSON.stringify(usersession);
  let sessionHash =  window.btoa(jsonStringyfy);
  localStorage.setItem('session_data', sessionHash);
  /*
  let jsonStringyfy = JSON.stringify(resJSON['data']['user']);
  let sessionHash =  window.btoa(jsonStringyfy);
  localStorage.setItem('session_data', sessionHash);
  */
  /*
  let userstorage2 = localStorage.getItem("session_data");
  let parser2 = window.atob(userstorage2);
  let usersession2 = JSON.parse(parser2);

  console.log(usersession2);
  */
}

translate(word){
  return this.translateService.getTranslate(word);
}
















onAddSubmit() {
  //this.data = JSON.stringify(this.profileForm.value, null, 4);
  let userstorage = localStorage.getItem("session_data");
  let parser = window.atob(userstorage);
  let usersession = JSON.parse(parser);


  //console.log(usersession);

  this.data = this.profileFormAdd.value;

  var hashPass = this.MD5hasher.MD5(this.profileFormAdd.get('password').value);

  let userdata = {};
      userdata['username'] = this.profileFormAdd.get('username').value;
      userdata['password'] = hashPass;
      userdata['email'] = this.profileFormAdd.get('email').value;
      userdata['first_name'] = this.profileFormAdd.get('firstName').value;
      userdata['last_name'] = this.profileFormAdd.get('lastName').value;
      userdata['profile'] = {
        "role_id": Number(this.profileFormAdd.get('role').value),
        "company_id": usersession.profile.role.company.id
      };

  let user_json_string = userdata;
  console.log(user_json_string);

this.apiService.post('users/',user_json_string).subscribe(ret => {
  let data: any[] = JSON.parse('['+JSON.stringify(ret)+']');
  //console.log(Object.values(data));
  this.response = Object.values(data);
  console.log(this.response);
  //alert(JSON.stringify(this.response, null, 4));
  alert("The user was added successfully.");
  this.getUsers();
  },
  (err) => {
    console.log(err);
  }
  );

  this.addDialog.onModalClose();

}





complexPass(){
  let pass1 = this.profileFormAdd.get('password').value;
  let alpha = 0;
  let numeric = 0;
  let special = 0;

  if (/[A-Za-z]/.test(pass1))
  {
      alpha = 1;
  }

  if (/[0-9]/.test(pass1))
  {
      numeric = 1;
  }

  if (/[\^$.|?*+(){}@!]/.test(pass1))
  {
      special = 1;
  }

  //console.log(alpha+" "+numeric+" "+special);

  if((alpha+numeric+special != 3)){
    this.passInfo = 'Your Password should have a letter, number and a special character.';
    this.p1 = 0;
  }
  else{
    this.passInfo = '';
    this.p1 = 1;
  }

  this.confirmPass();
  /*
  if( /[^a-zA-Z0-9]/.test(pass1) ) {
     this.passInfo = 'Password should have upper and lower letters, numbers and special character.';
  }
  else{
     this.passInfo = '';
  }
  */
  if((this.p1 == 1)&&(this.p2 == 1)){
    this.vv = true;
  }
  else{
    this.vv = false;
  }


}

confirmPass(){
  let pass1 = this.profileFormAdd.get('password').value;
  let pass2 = this.profileFormAdd.get('password2').value;

  if(pass1 != pass2){
    this.passInfo2 = 'The Confirm Password does not match.';
    this.p2 = 0;
  }
  else{
    this.passInfo2 = '';
    this.p2 = 1;
  }

  if((this.p1 == 1)&&(this.p2 == 1)){
    this.vv = true;
  }
  else{
    this.vv = false;
  }

}

formValid(){
	if((this.profileFormAdd.valid == true) && (this.vv == true) && (this.vv2 == true)){
		return true
	}
	else
	return false;
}
formValidEdit(){
	if(this.profileFormEdit.valid == true){
		return true
	}
	else
	return false;
}



checkEmail(){
  let valEmail = this.profileFormAdd.get('email').value;
  if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(valEmail))
  {
      this.emailInfo = 'Please enter a valid email address!';
      this.vv2 = false;
  }
  else{
      this.emailInfo = '';
      this.vv2 = true;
  }
}


}
