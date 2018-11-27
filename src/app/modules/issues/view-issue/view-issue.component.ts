import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../core-modal/modal/modal.component';

@Component({
	selector: 'app-view-issue',
	templateUrl: './view-issue.component.html',
	styleUrls: ['./view-issue.component.css']
})
export class ViewIssueComponent implements OnInit {
	@ViewChild('onViewItemComponent') onViewItemComponent: ModalComponent;
	public issue: any;
	
	constructor() { }
	
	ngOnInit() {
	}
	
	openModal(issue) {
		this.issue = issue;
		this.onViewItemComponent.onModalOpen();
	}
	
	closeModal() {
		this.onViewItemComponent.onModalClose();
	}
}
