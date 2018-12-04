import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ViewRetailerModalComponent } from '../view-retailer-modal/view-retailer-modal.component';
import { UsersService } from '../users.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmRemoveRetailersModalComponent } from '../confirm-remove-retailers-modal/confirm-remove-retailers-modal.component';
import { ConfirmReassignRetailersModalComponent } from '../confirm-reassign-retailers-modal/confirm-reassign-retailers-modal.component';

@Component({
	selector: 'app-assigned-retailers',
	templateUrl: './assigned-retailers.component.html',
	styleUrls: ['./assigned-retailers.component.css']
})
export class AssignedRetailersComponent implements OnInit {
	@Input() selectedAgent;
	@Input() agents;
	@ViewChild('onViewRetailerComponent') onViewRetailerComponent: ViewRetailerModalComponent;
	@ViewChild('onRemoveAssignRetailersComponent') onRemoveAssignRetailersComponent: ConfirmRemoveRetailersModalComponent;
	@ViewChild('onReassignRetailersComponent') onReassignRetailersComponent: ConfirmReassignRetailersModalComponent;

	public itemsPerPage: number = 5;
	public isLoading: boolean = true;
	public assignedRetailers: any[] = [];

	public filterSearchQuery: string = '';
	public searchQuery: string = '';
	  
	public checkedRetailers: any[] = [];
	public userRetailers: any[] = [];
	
	constructor(
		private usersService: UsersService,
		private toastr: ToastrService,
		private elRef: ElementRef
	) { }
	
	ngOnInit() {
		this.initData();
	}

	public initData() {
		this.isLoading = true;
		this.checkedRetailers = [];

		this.usersService.getAssignedRetailers(this.selectedAgent)
			.then(async (res: any) => {
				this.usersService.getUserRetailers(this.selectedAgent)
					.then((uRetailers: any) => {
						this.userRetailers = uRetailers;
					}) 
					.catch(err => {
						this.userRetailers = [];
					});

				if (res) this.assignedRetailers = res;
				else this.assignedRetailers = [];
				this.isLoading = false;
			})
			.catch(err => {
				this.assignedRetailers = [];
				this.isLoading = false;
			});
	}

	public onShowCountChange($event) {
		this.itemsPerPage = $event.target.value;
	}
	
	public onFilterSearchChange($event) {
		this.searchQuery = $event.target.value;
		
		if (this.searchQuery === '')
		this.onSearch();
	}
	
	public onSearch() {
		this.filterSearchQuery = this.searchQuery;
	}
	
	public onKeyDown($event) {
		if ($event.keyCode === 13) {
			this.onSearch();
			$event.preventDefault();
		}
	}

	public onViewRetailer(retailer) {
		this.onViewRetailerComponent.openModal(retailer);
	}
	
	public onRemoveRetailers() {
		if (this.checkedRetailers.length > 0) 
			this.onRemoveAssignRetailersComponent.openModal(this.checkedRetailers, this.selectedAgent, this.userRetailers);
		else
			this.toastr.error('Pls select a retailer(s)', 'Remove Retailers', { positionClass: 'toast-top-right' })
	}

	public onReassignRetailers() {
		if (this.checkedRetailers.length > 0) 
			this.onReassignRetailersComponent.openModal(this.checkedRetailers, this.userRetailers, this.selectedAgent, this.agents);
		else
			this.toastr.error('Pls select a retailer(s)', 'Remove Retailers', { positionClass: 'toast-top-right' })
	}

	public onRemoveRetailerOutput($event) {
		this.initData();
	}

	public onReassignRetailerOutput($event) {
		this.initData();
	}

	public onCheckAllChange($event) {
		this.checkAllCheckboxes($event.target.checked);
		if ($event.target.checked) {
			for (let i = 0; i < this.assignedRetailers.length; i++)
				this.assignedRetailers[i].isChecked = true;
				
			this.checkedRetailers = this.assignedRetailers.slice();
		}
		else {
			for (let i = 0; i < this.assignedRetailers.length; i++)
				this.assignedRetailers[i].isChecked = false;
			this.checkedRetailers = [];
		}
	}

	public onRetailerCheckChange($event, retailer) {
		if ($event.target.checked) {
			let urIndex = this.assignedRetailers.findIndex(uRetailer => {
				return uRetailer.id === retailer.id
			});
			this.assignedRetailers[urIndex].isChecked = true;
			this.checkedRetailers.push(retailer);
		}
		else {
			let urIndex = this.assignedRetailers.findIndex(uRetailer => {
				return uRetailer.id === retailer.id
			});
			this.assignedRetailers[urIndex].isChecked = false;

			let cRetailerIndex = this.checkedRetailers.findIndex((lRetailer) => {
				return lRetailer.id === retailer.id;
			});
			this.checkedRetailers.splice(cRetailerIndex, 1);
		}
	}

	private checkAllCheckboxes(value) {
		let checkboxes = this.elRef.nativeElement.querySelectorAll('.r-checkboxes');
		for (let i = 0; i < checkboxes.length; i ++)
			checkboxes[i].checked = value;
	}
}
