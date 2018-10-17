import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportExcelService } from '../../../shared/report-excel.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-retailer-inventory-status',
  templateUrl: './retailer-inventory-status.component.html',
  styleUrls: ['./retailer-inventory-status.component.css']
})
export class RetailerInventoryStatusComponent implements OnInit {
  submitted:boolean = false;

  constructor(private router: Router, private excelService: ReportExcelService) { }
  reports: any[];
  headers: any[];
  sched: string;
  ngOnInit() {
    this.headers = ["Region/State","Cluster","Township","Distributor","Retailer","SKU","Inventory"];
    this.reports = [{"region":"Ayeyarwady Region","cluster":"Ayeyarwady","township":"Pathein","distributor":"Success World","retailer":"Chit Gabar","sku":"GSM Top Up Card 3000MMK","inventory": "8"},
    {"region":"Ayeyarwady Region","cluster":"Ayeyarwady","township":"Pathein","distributor":"Success World","retailer":"Chit Gabar","sku":"CDMA(450)MHz Top Up Card 5000MMK", "inventory": "10"}];
    this.sched = 'daily';
    console.log(this.reports);
  }
  showSalesTable() {
    this.submitted = true;
  }
  hideSalesTable() {
    this.submitted = false;
  }
  routerNavigate() {
    this.router.navigate(['sales-report-table']);
  }
  captureTable(data: HTMLInputElement) {
    html2canvas(data).then(canvas=>{
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('Retailer Inventory Status.pdf'); // Generated PDF
      this.submitted = false;
    });
  }
  exportToFile(format: string) {
    if(format == 'pdf') {
      this.submitted = true;
      window.setTimeout(()=>{
        var data = <HTMLInputElement>document.getElementById('pdfContent');
        //wait until the element comes out
        if(data) {
          this.captureTable(data);
        }
      }, 1);
    }
    else {
      let r = Object.values(this.reports);
      this.excelService.generateExcel('Retailer Inventory Status', 'retailer_inventory_status', r, this.headers, format);
    }
  }
}
