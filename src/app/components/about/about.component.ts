import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { DashboardModalComponent } from '../dashboard-modal/dashboard-modal.component';

@Component({
	selector: 'app-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
	@ViewChild('onViewItemComponent') onViewItemComponent: DashboardModalComponent;
	public legendOptions = {
		legend: {
			position: 'bottom'
		}
	}

	public topCustomers: any[] = [];
	public topCustomersChart: any;
	public isTopCustomerTable: boolean = false;

	public topProducts: any[] = [];
	public topProductsChart: any;
	public isTopProductsTable: boolean = false;

	public topCustNoSales: any[] = [];
	public topCustNoSalesChart: any;
	public isTopCustNoSalesTable: boolean = false;

	public topLeastVisitedCustomer: any[] = [];
	public topLeastVisitedCustomerChart: any;
	public isTopLeastVisitedCustomerTable: boolean = false;

	public topCustomerIssues: any[] = [];
	public topCustomerIssuesChart: any;
	public isTopCustomerIssuesTable: boolean = false;
	
	constructor(private api: ApiService) { }
	
	ngOnInit() {
		this.topCustomers = [];
		this.topProducts = [];
		this.topCustNoSales = [];
		this.topLeastVisitedCustomer = [];
		this.topCustomerIssues = [];
		
		this.api.get('reports/agent_performance')
			.map((res: any) => res.data)
			.subscribe((data: any) => {
				this.getTopCustomers(data);
				this.getTopProducts(data);
				this.getTopCustomerNoSales(data);
				this.getTopLeastVisitedCustomer(data);
				this.getTopCustomerIssues(data);
			},
			(err) => {
				this.topCustomers = [];
				this.topCustomersChart = null;
			});

	}

	public getTopCustomers(data: any) {
		this.topCustomers = data.top_customers.slice(0, 10);

		if (this.topCustomers) {
			let cData = [];
			let labels = [];
			let totalPercent = 0;

			for (let i = 0; i < this.topCustomers.length; i++) {
				labels.push(this.topCustomers[i].retailer);
				cData.push(this.topCustomers[i].percent_share);
				totalPercent += parseFloat(this.topCustomers[i].percent_share);
			}

			this.topCustomersChart = {
				data: [...cData, 100 - totalPercent],
				labels: [...labels, 'Others'],
				chartType: 'pie'
			}
		}
	}

	public getTopProducts(data) {
		this.topProducts = data.top_products.slice(0, 10);

		if (this.topProducts) {
			let cData = [];
			let labels = [];
			let totalPercent = 0;

			for (let i = 0; i < this.topProducts.length; i++) {
				labels.push(this.topProducts[i].product);
				cData.push(this.topProducts[i].percent_share);
				totalPercent += parseFloat(this.topProducts[i].percent_share);
			}

			this.topProductsChart = {
				data: [...cData, 100 - totalPercent],
				labels: [...labels, 'Others'],
				chartType: 'doughnut'
			}
		}
	}

	public getTopCustomerNoSales(data) {
		this.topCustNoSales = data.customer_no_sales;
		this.topCustNoSales = this.topCustNoSales.sort((cust1, cust2) => {
			if (parseFloat(cust1.last_sales_amount) > parseFloat(cust2.last_sales_amount)) return 1;
			if (parseFloat(cust1.last_sales_amount) < parseFloat(cust2.last_sales_amount)) return -1;
			return 0;
		})

		if (this.getTopCustomerNoSales) {
			let cData = [];
			let labels = [];
			let totalPercent = 0;

			this.topCustNoSales = data.customer_no_sales.slice(0, 10);

			for (let i = 0; i < this.topCustNoSales.length; i++) {
				labels.push(this.topCustNoSales[i].retailer);
				cData.push(this.topCustNoSales[i].last_sales_amount);
				totalPercent += parseFloat(this.topCustNoSales[i].last_sales_amount);
			}

			this.topCustNoSalesChart = {
				data: [
					{data: [...cData, 100 - totalPercent], label: 'Values'},
				],
				labels: [...labels, 'Others'],
				chartType: 'bar'
			}
		}
	}

	public getTopLeastVisitedCustomer(data) {
		this.topLeastVisitedCustomer = data.customer_least_visited.slice(0, 10);

		if (this.topLeastVisitedCustomer) {
			let cData = [];
			let labels = [];
			let totalPercent = 0;

			for (let i = 0; i < this.topLeastVisitedCustomer.length; i++) {
				labels.push(this.topLeastVisitedCustomer[i].retailer);
				cData.push(this.topLeastVisitedCustomer[i].number_of_visits);
				totalPercent += parseFloat(this.topLeastVisitedCustomer[i].number_of_visits);
			}

			this.topLeastVisitedCustomerChart = {
				data: [
					{data: [...cData, 100 - totalPercent], label: 'Values'},
				],
				labels: [...labels, 'Others'],
				chartType: 'bar'
			}
		}
	}

	public getTopCustomerIssues(data) {
		this.topCustomerIssues = data.customer_issues.slice(0, 10);

		if (this.topCustomerIssues) {
			let cData = [];
			let labels = [];
			let totalPercent = 0;

			for (let i = 0; i < this.topCustomerIssues.length; i++) {
				labels.push(this.topCustomerIssues[i].retailer);
				cData.push(this.topCustomerIssues[i].number_of_issues);
				totalPercent += parseFloat(this.topCustomerIssues[i].number_of_issues);
			}

			this.topCustomerIssuesChart = {
				data: [...cData],
				labels: [...labels],
				chartType: 'pie'
			}
		}
	}
	
	public onToggleIsCustomerTable() {
		this.isTopCustomerTable = !this.isTopCustomerTable;
	}

	public onToggleIsProductTable() {
		this.isTopProductsTable = !this.isTopProductsTable;
	}

	public onToggleCustNoSaleTable() {
		this.isTopCustNoSalesTable = !this.isTopCustNoSalesTable;
	}

	public onToggleLeastVisitedCustomerTable() {
		this.isTopLeastVisitedCustomerTable = !this.isTopLeastVisitedCustomerTable;
	}

	public onToggleIsTopCustomerIssuesTable() {
		this.isTopCustomerIssuesTable = !this.isTopCustomerIssuesTable;
	}

	public onViewItem(type, title, data) {
		this.onViewItemComponent.openModal(type, title, data);
	}

}
