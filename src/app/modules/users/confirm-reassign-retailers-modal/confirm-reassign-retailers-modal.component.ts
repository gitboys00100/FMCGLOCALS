import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../core-modal/modal/modal.component';
import { UsersService } from '../users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-confirm-reassign-retailers-modal',
	templateUrl: './confirm-reassign-retailers-modal.component.html',
	styleUrls: ['./confirm-reassign-retailers-modal.component.css']
})
export class ConfirmReassignRetailersModalComponent implements OnInit {
	@ViewChild('onConfirmReassignRetailerComponent') onConfirmReassignRetailerComponent: ModalComponent;
	@Output() onReassignRetailerOutput = new EventEmitter<any>();

	public retailers: any[] = [];
	public uRetailers: any[] = [];
	public agent: any;
	public agents: any[] = [];
	public newAssignedAgent: any;

	// NGX Agent Dropdown Variables
	public ngxSelectedAgent: any[] = [];
	public config = {
		displayKey: "fullname",
		search: true,
	};

	
	constructor(
		private usersService: UsersService,
		private toastr: ToastrService
	) { }
	
	ngOnInit() { }

	public openModal(retailers, uRetailers, agent, agents) {		
		this.retailers = retailers;
		this.uRetailers = uRetailers;
		this.agent = agent;
		this.agents = agents.filter(fAgent => {
			return fAgent.id !== this.agent.id
		});
		this.onConfirmReassignRetailerComponent.onModalOpen();
	}
	
	public closeModal() {
		this.retailers = [];
		this.uRetailers = [];
		this.agent = null;
		this.agents = [];
		this.onConfirmReassignRetailerComponent.onModalClose();
	}
	
	public onReassignRetailers() {
		this.usersService.removeRetailers(this.agent, this.retailers, this.uRetailers)
			.then((res) => {
				this.usersService.assignRetailers(this.newAssignedAgent, this.retailers)
					.then((res) => {
						this.toastr.success('Retailer(s) has been successfully Reassigned!', 'Retailer Reassignment', { positionClass: 'toast-top-right' });
						this.onReassignRetailerOutput.emit(true);
						this.closeModal();
					})
					.catch((err) => this.toastr.error('Failed to reassign retailer(s)!', 'Retailer Reassignment', { positionClass: 'toast-top-right' }))
			})
			.catch((err) => this.toastr.error('Failed to reassign retailer(s)!', 'Retailer Reassignment', { positionClass: 'toast-top-right' }))
	}

	public onSelectAgentChange($event) {
		if (this.ngxSelectedAgent.length > 0)
			this.newAssignedAgent = this.ngxSelectedAgent[0];
		else
			this.newAssignedAgent = null;
	}
	
}
