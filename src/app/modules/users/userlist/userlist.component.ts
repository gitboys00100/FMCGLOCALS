import { Component, OnInit, ViewChild } from '@angular/core';

import { RetailerService } from '../retailer-service';
import { Retailer } from '../retailer.model';
import { AddUserComponent } from '../adduser-modal/adduser-modal.component';
import { EditUserComponent } from '../edituser-modal/edituser-modal.component';
import { DeleteUserComponent } from '../deleteuser-modal/deleteuser-modal.component';

import { ModalComponent } from '../../../modules/core-modal/modal/modal.component';
import { ApiService } from '../../../shared/api.service';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { TranslateService } from '../../../shared/translate.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserListComponent implements OnInit {
  	@ViewChild('onAddComponent') onAddComponent: AddUserComponent;
    @ViewChild('onEditComponent') onEditComponent: EditUserComponent;
    @ViewChild('onDeleteComponent') onDeleteComponent: DeleteUserComponent;

    @ViewChild('deleteDialog') deleteDialog: ModalComponent;
    @ViewChild('editDialog') editDialog: ModalComponent;

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
    public profileForm = this.fb.group({
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

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.loading = false;
    this.getUsers();
    this.getRoles();

    //this.retailerList = this.itRetailerService.getRetailerData();
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



  public onAdd() {
    this.onAddComponent.reset();
		this.onAddComponent.itemCreateModal.onModalOpen();
	}




  onSubmit() {
    //this.data = JSON.stringify(this.profileForm.value, null, 4);
    //alert(this.data);
    //this.data = this.profileForm.value;
    //alert(this.profileForm.get('username').value);

    /*
    this.json_data = {
      "username": this.profileForm.get('username').value,
      "email": this.profileForm.get('email').value,
      "first_name": this.profileForm.get('firstName').value,
      "last_name": this.profileForm.get('lastName').value,
      "profile": {
        "role_id": this.role
        }
      };
    */
    let userdata = {};
		    userdata['username'] = this.profileForm.get('username').value;
				userdata['email'] = this.profileForm.get('email').value;
				userdata['first_name'] = this.profileForm.get('firstName').value;
				userdata['last_name'] = this.profileForm.get('lastName').value;
				userdata['profile'] = [{
					"role_id": this.role
				}];

		let user_json_string = userdata;

    console.log(userdata);

    /*
    let e_link = 'users/'+this.id;
      this.apiService.patch(e_link,user_json_string).subscribe(ret => {
        let data: any[] = JSON.parse('['+JSON.stringify(ret)+']');
        console.log(Object.values(data));
        //this.retailerList = Object.values(data);
        alert('Update Successful');
        this.getUsers();
        this.editDialog.onModalClose();
        //location.reload();
        },
        (err) => {
          console.log(err);
        }
      );
    */
    this.apiService.patch('users/'+this.id+'/', user_json_string)
    .subscribe((response) => {
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
    this.profileForm.get('firstName').setValue(user.first_name);
    this.profileForm.get('lastName').setValue(user.last_name);
    this.profileForm.get('username').setValue(user.username);
    this.profileForm.get('email').setValue(user.email);

    this.editDialog.onModalOpen();
  }

  onEditSubmitModal() {
    //alert(this.id);
    this.editDialog.onModalClose();
  }

  closeEditModal() {
    this.editDialog.onModalClose();
  }



  onDelete(user) {
    //alert(user);
    this.id = user.id;
    //alert(this.id);
    this.fullName = user.first_name+" "+user.last_name;

    this.deleteDialog.onModalOpen();
  }

  onDeleteSubmitModal() {
    //alert(this.id);
    /*
    let link = 'users/'+this.id;
    this.apiService.delete(link).subscribe(ret => {
      let data: any[] = JSON.parse('['+JSON.stringify(ret)+']');
      console.log(Object.values(data));
      alert('Success');
      this.getUsers();
      this.editDialog.onModalClose();
      //this.retailerList = Object.values(data);
      },
      (err) => {
        console.log(err);
      }
    );
    */
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


}
