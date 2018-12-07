import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { UsersService } from '../users.service';
import { ViewRetailerModalComponent } from '../view-retailer-modal/view-retailer-modal.component';
import { ConfirmAssignRetailersModalComponent } from '../confirm-assign-retailers-modal/confirm-assign-retailers-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-unassigned-retailers',
	templateUrl: './unassigned-retailers.component.html',
	styleUrls: ['./unassigned-retailers.component.css']
})
export class UnassignedRetailersComponent implements OnInit {
	@Input() selectedAgent;
	@ViewChild('onViewRetailerComponent') onViewRetailerComponent: ViewRetailerModalComponent;
	@ViewChild('onConfirmAssignRetailersComponent') onConfirmAssignRetailersComponent: ConfirmAssignRetailersModalComponent;

	public itemsPerPage: number = 5;
	public isLoading: boolean = true;
	public unassignedRetailers: any[] = [];

	public filterSearchQuery: string = '';
	public searchQuery: string = '';
	  
	public checkedRetailers: any[] = [];
	
	constructor(
		private usersService: UsersService,
		private toastr: ToastrService,
		private elRef: ElementRef
	) { }
	
	ngOnInit() {
		this.initData();
	}


	// ###############################################
	// # PUBLIC
	// ###############################################


	public initData() {
		this.isLoading = true;
		this.checkedRetailers = [];
		this.usersService.getUnassignedRetailers()
			.then((res: any) => {
				if (res) this.unassignedRetailers = res;
				else this.unassignedRetailers = [];
				this.isLoading = false;
			})
			.catch(err => {
				this.unassignedRetailers = [];
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

	public onAssignRetailers() {
		if (this.checkedRetailers.length > 0) 
			this.onConfirmAssignRetailersComponent.openModal(this.checkedRetailers, this.selectedAgent);
		else
			this.toastr.error('Pls select a retailer(s)', 'Assign Retailers', { positionClass: 'toast-top-right' })
	}

	public onAssignRetailerOutput($event) {
		this.initData();
	}

	public onCheckAllChange($event) {
		this.checkAllCheckboxes($event.target.checked);
		if ($event.target.checked) {
			for (let i = 0; i < this.unassignedRetailers.length; i++)
				this.unassignedRetailers[i].isChecked = true;
				
			this.checkedRetailers = this.unassignedRetailers.slice();
		}
		else {
			for (let i = 0; i < this.unassignedRetailers.length; i++)
				this.unassignedRetailers[i].isChecked = false;
			this.checkedRetailers = [];
		}
	}

	public onRetailerCheckChange($event, retailer) {
		if ($event.target.checked) {
			let urIndex = this.unassignedRetailers.findIndex(uRetailer => {
				return uRetailer.id === retailer.id
			});
			this.unassignedRetailers[urIndex].isChecked = true;
			this.checkedRetailers.push(retailer);
		}
		else {
			let urIndex = this.unassignedRetailers.findIndex(uRetailer => {
				return uRetailer.id === retailer.id
			});
			this.unassignedRetailers[urIndex].isChecked = false;

			let cRetailerIndex = this.checkedRetailers.findIndex((lRetailer) => {
				return lRetailer.id === retailer.id;
			});
			this.checkedRetailers.splice(cRetailerIndex, 1);
		}
	}


	// ###############################################
	// # PRIVATE
	// ###############################################
	

	private checkAllCheckboxes(value) {
		let checkboxes = this.elRef.nativeElement.querySelectorAll('.r-checkboxes');
		for (let i = 0; i < checkboxes.length; i ++)
			checkboxes[i].checked = value;
	}
	
}
