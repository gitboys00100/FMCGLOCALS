import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportExcelService } from '../../../shared/report-excel.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {
  submitted:boolean = false;
  constructor(private router: Router, private excelService: ReportExcelService) { }
  reports: any[];
  headers: any[];
  sched: string;
  ngOnInit() {
    this.headers = ["Region/State","Cluster","Township","Distributor","Retailer","SKU"];
    for(var x=1;x<32;x++) {
      this.headers.push(x);
    }
    this.reports = [{"region":"Ayeyarwady Region","cluster":"Ayeyarwady","township":"Pathein","distributor":"Success World","retailer":"Chit Gabar","sku":"GSM Top Up Card 3000MMK","sales":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
    {"region":"Ayeyarwady Region","cluster":"Ayeyarwady","township":"Pathein","distributor":"Success World","retailer":"Chit Gabar","sku":"CDMA(450)MHz Top Up Card 5000MMK","sales":[0,0,0,0,0,0,0,0,0,0,0,0,10,0,0,0,0,0,0,0,0,0,0,0,10,0,0,0,0,0,0]}];
    this.sched = 'daily';
    console.log(this.reports);
  }

  showSalesTable() {
    this.submitted = true;
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
      pdf.save('Distributor Sales Report.pdf'); // Generated PDF
      //this.submitted = false;
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
      this.excelService.generateExcel('Distributor Sales Report', 'sales_report', r, this.headers, format);
    }
  }

}
