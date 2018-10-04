import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reports: any[];
  selectedReport: string;
  constructor(private router: Router) { }

  ngOnInit() {
    this.selectedReport = 'Agent Report';
    this.reports = [
      {
        "name":"Agent Report",
        "link":"./agent-report"
      },
      {
        "name":"Sales Report",
        "link":"./sales-report"
      },
      {
        "name": "Retailer Inventory Status",
        "link": "./retailer-inventory-status"
      },
      {
        "name": "Retailer List By Distributor",
        "link": "./retailer-list-by-distributor"
      }
    ];

  }

  routerNavigate() {
    this.router.navigate(['/reports/sales-report-table']);
  }
  setSelectedReport(selected: string) {
    this.selectedReport = selected;
  }
}
