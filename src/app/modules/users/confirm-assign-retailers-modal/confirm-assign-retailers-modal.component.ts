import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../components/modal/modal.component';
import { UsersService } from '../users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-confirm-assign-retailers-modal',
	templateUrl: './confirm-assign-retailers-modal.component.html',
	styleUrls: ['./confirm-assign-retailers-modal.component.css']
})
export class ConfirmAssignRetailersModalComponent implements OnInit {
	@ViewChild('onConfirmAssignRetailersComponent') onConfirmAssignRetailersComponent: ModalComponent;
	@Output() onAssignRetailerOutput = new EventEmitter<any>();

	public retailers: any[] = [];
	public agent: any;
	
	constructor(
		private usersService: UsersService,
		private toastr: ToastrService
	) { }
	
	ngOnInit() { }

	public openModal(retailers, agent) {		
		this.retailers = retailers;
		this.agent = agent;
		this.onConfirmAssignRetailersComponent.onModalOpen();
	}
	
	public closeModal() {
		this.retailers = [];
		this.agent = null;
		this.onConfirmAssignRetailersComponent.onModalClose();
	}
	
	public onAssignRetailers() {
		this.usersService.assignRetailers(this.agent, this.retailers)
			.then((res) => {
				this.toastr.success('Retailer(s) has been successfully assigned!', 'Retailer Assignment', { positionClass: 'toast-top-right' });
				this.onAssignRetailerOutput.emit(true);
				this.closeModal();
			})
			.catch((err) => this.toastr.error('Failed to assign retailer(s)!', 'Retailer Assignment', { positionClass: 'toast-top-right' }))
	}
}
