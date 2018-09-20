import { Component, OnInit, ViewChild } from '@angular/core';

import { RetailerService } from '../retailer-service';
import { Retailer } from '../retailer.model';
import { AddUserComponent } from '../adduser-modal/adduser-modal.component';
import { EditUserComponent } from '../edituser-modal/edituser-modal.component';
import { DeleteUserComponent } from '../deleteuser-modal/deleteuser-modal.component';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserListComponent implements OnInit {
  	@ViewChild('onAddComponent') onAddComponent: AddUserComponent;
    @ViewChild('onEditComponent') onEditComponent: EditUserComponent;
    @ViewChild('onDeleteComponent') onDeleteComponent: DeleteUserComponent;
    public retailerList: Retailer[];

    public filterRole: string = '';
    public filterSearchQuery: string = '';
  	public searchQuery: string = '';
    public itemsPerPage: number = 5;

  constructor(private itRetailerService: RetailerService) { }

  ngOnInit() {
    this.retailerList = this.itRetailerService.getRetailerData();
  }

  public onAdd() {
		this.onAddComponent.itemCreateModal.onModalOpen();
	}

  public onEdit() {
		this.onEditComponent.itemEditModal.onModalOpen();
	}

  public onDelete() {
		this.onDeleteComponent.itemDeleteModal.onModalOpen();
    //document.getElementById("zz").style.color = "blue";
	}



  public onShowCountChange($event) {
    this.itemsPerPage = $event.target.value;
  }

  public onFilterRole($event) {
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

}
