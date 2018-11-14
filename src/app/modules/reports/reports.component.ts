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
    if(this.router.url == '/reports') {
      this.selectedReport = '';
    }
    else if(this.router.url == '/reports/agent-report') {
      this.selectedReport = 'Agent Inventory Flow Report';
    }
    else if(this.router.url == '/reports/sales-report') {
      this.selectedReport = 'Sales Report';
    }
    else if(this.router.url == '/reports/retailer-inventory-status') {
      this.selectedReport = 'Retailer Inventory Status';
    }
    else if(this.router.url == '/reports/retailer-list-by-distributor') {
      this.selectedReport = 'Retailer List By User Report';
    }
    this.reports = [
      {
        "name":"Agent Inventory Flow Report",
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
        "name": "Retailer List By User Report",
        "link": "./retailer-list-by-distributor"
      }
    ];

  }

  routerNavigate(link: string) {
    this.router.navigate([link]);
  }
  setSelectedReport(selected: string) {
    if(selected == 'Agent Inventory Flow Report') {
      this.routerNavigate("/reports/agent-report");
    }
    else if(selected == 'Sales Report')
    {
      this.routerNavigate("/reports/sales-report");
    }
    else if(selected == 'Retailer Inventory Status') {
      this.routerNavigate("/reports/retailer-inventory-status");
    }
    else if(selected == 'Retailer List By User Report') {
      this.routerNavigate("/reports/retailer-list-by-distributor");
    }
    this.selectedReport = selected;
  }
}
