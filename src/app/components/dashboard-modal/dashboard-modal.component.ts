import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../modules/core-modal/modal/modal.component';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Component({
	selector: 'app-dashboard-modal',
	templateUrl: './dashboard-modal.component.html',
	styleUrls: ['./dashboard-modal.component.css']
})
export class DashboardModalComponent implements OnInit {
	@ViewChild('onViewItemComponent') onViewItemComponent: ModalComponent;
	public type: string;
	public data: any[] = [];
	public title: string = '';
	
	constructor() { }
	
	ngOnInit() {
	}
	
	openModal(type, title, data) {
		this.type = type;
		this.data = data;
		this.title = title;
		this.onViewItemComponent.onModalOpen();
	}
	
	closeModal() {
		this.data = [];
		this.onViewItemComponent.onModalClose();
	}
	
	public downloadExcel() {
		let workbook = new Workbook();
		let worksheet = workbook.addWorksheet(this.title);
		let titleRow = worksheet.addRow([this.title]);
		
		let rowValues = [];
		let headers = [];
		if (this.data) headers = Object.keys(this.data[0]);
		
		for (let i = 0; i < headers.length; i++) {
			let col = worksheet.getColumn(i + 1);
			col.header = headers[i];
			col.key = headers[i] ? headers[i].toString() : '-';
			col.width = 20;
		}

		for (let i = 0; i < this.data.length; i++) {
			for (let j = 0; j < headers.length; j++)
				rowValues[j + 1] = this.data[i][headers[j]] ? this.data[i][headers[j]] : '-';

			worksheet.addRow(rowValues);
		}

		workbook.xlsx.writeBuffer().then((data) => {
			let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
			fs.saveAs(blob, this.type + '.xlsx');
		})
	}
	
}
