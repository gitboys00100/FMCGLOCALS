import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../components/modal/modal.component';
import { UsersService } from '../users.service';
import { ToastrService } from 'ngx-toastr';


@Component({
	selector: 'app-confirm-remove-retailers-modal',
	templateUrl: './confirm-remove-retailers-modal.component.html',
	styleUrls: ['./confirm-remove-retailers-modal.component.css']
})
export class ConfirmRemoveRetailersModalComponent implements OnInit {
	@ViewChild('onConfirmRemoveAssignRetailersComponent') onConfirmRemoveAssignRetailersComponent: ModalComponent;
	@Output() onRemoveRetailerOutput = new EventEmitter<any>();

	public retailers: any[] = [];
	public agent: any;
	public usersRetailers: any[] = [];

	constructor(
		private usersService: UsersService,
		private toastr: ToastrService
	) { }
	
	ngOnInit() { }

	public openModal(retailers, agent, uRetailers) {		
		this.retailers = retailers;
		this.usersRetailers = uRetailers;
		this.agent = agent;
		this.onConfirmRemoveAssignRetailersComponent.onModalOpen();
	}
	
	public closeModal() {
		this.retailers = [];
		this.usersRetailers = [];
		this.agent = null;
		this.onConfirmRemoveAssignRetailersComponent.onModalClose();
	}

	public onRemoveRetailers() {
		this.usersService.removeRetailers(this.agent, this.retailers, this.usersRetailers)
			.then((res) => {
				this.toastr.success('Retailer(s) has been successfully removed!', 'Remove Retailer', { positionClass: 'toast-top-right' });
				this.onRemoveRetailerOutput.emit(true);
				this.closeModal();
			})
			.catch((err) => {
				console.log(err);
				this.toastr.error('Failed to remove retailer(s)!', 'Remove Retailer', { positionClass: 'toast-top-right' });
			})
	}
	
}
