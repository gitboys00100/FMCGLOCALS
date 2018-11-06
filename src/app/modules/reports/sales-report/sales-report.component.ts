import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportExcelService } from '../../../shared/report-excel.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {
  from_date = '';
  to_date = '';
  salesReportForm: FormGroup;

  submitted:boolean = false;
  submittedForm:boolean = false;
  constructor(private router: Router, private excelService: ReportExcelService,private formBuilder: FormBuilder) { }
  reports: any[];
  headers: any[];
  sched: string;

  ngOnInit() {
    this.headers = ["Region/State","Cluster","Township","Distributor","Retailer","SKU"];
    for(var x=21;x<28;x++) {
      this.headers.push(x);
    }
    // this.reports = [{"region":"Ayeyarwady Region","cluster":"Ayeyarwady","township":"Pathein","distributor":"Success World","retailer":"Chit Gabar","sku":"GSM Top Up Card 3000MMK","sales":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
    // {"region":"Ayeyarwady Region","cluster":"Ayeyarwady","township":"Pathein","distributor":"Success World","retailer":"Chit Gabar","sku":"CDMA(450)MHz Top Up Card 5000MMK","sales":[0,0,0,0,0,0,0,0,0,0,0,0,10,0,0,0,0,0,0,0,0,0,0,0,10,0,0,0,0,0,0]}];
    this.reports = [{
    "region": {
     "region_name": "Yangon",
     "cluster": [{
      "cluster_name": "Yangon West",
      "township": {
       "township_name": "XXXX",
       "distributor": {
        "company_name": "ABC",
        "retailers": [{
         "store_name": "AK",
         "items": [
         {
          "item_name": "Sim Card WCDMA (YGN-Huawei) with jacket",
          "sales": {
           "sales_date": "2018-10-24T14:04:02.677000+06:30",
    "amount": 1000,
    "quantity": 12
          }
         },
         {
          "item_name": "GSM Top Up Card 1000MMK",
          "sales": {
           "sales_date": "2018-10-24T14:04:02.677000+06:30",
    "amount": 0,
    "quantity": 0
          }
         }
         ]
        },
        {
         "store_name": "MT",
         "items": {
          "item_name": "Sim Card WCDMA (YGN-Huawei) with jacket",
          "sales": {
           "sales_date": "2018-10-24T14:04:02.677000+06:30",
    "amount": 202,
    "quantity": 5
          }
         }
        }]

       }
      }
     },
     {
       "cluster_name": "Yangon East"
     }]
    }
    }];
    this.sched = 'daily';
    this.createForm();
  }
  createForm() {
    this.salesReportForm = this.formBuilder.group({
      region: ['', Validators.required],
      cluster: ['', Validators.required],
      township: ['', Validators.required],
      agent: ['', Validators.required],
      retailer: ['', Validators.required],
      from_date: ['', Validators.required],
      to_date: ['', Validators.required],
      sched: ['', Validators.required]
    });
  }

  showSalesTable() {
    this.submittedForm = true;
    if (this.salesReportForm.invalid) {
        return;
    }
    else {
      this.submitted = true;
    }
  }

  clickFrom(date){
    this.from_date = date;
    this.compareDates('from');
  }

  checkDates(date){
    this.to_date = date;
    this.compareDates('to');
  }
  compareDates(clicked) {
    var from = this.from_date;
    var to = this.to_date;
    if(from && to) {
      if(from > to) {
        //clear from
        //alert('From is greater than to');
        alert('Invalid Date Range');
        if(clicked == 'from') {
          this.salesReportForm.get('from_date').setValue('');
        }
        else if(clicked == 'to') {
          this.salesReportForm.get('to_date').setValue('');
        }
      }
      else if(from < to) {
        //alert('From is less than to');
      }
      else {
        //alert('Equal');
      }
    }

  }
  // convenience getter for easy access to form fields
  get f() { return this.salesReportForm.controls; }

  hideSalesTable() {
    this.submitted = false;
  }
  routerNavigate() {
    this.router.navigate(['sales-report-table']);
  }
  getObjectSize(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  }
  captureTable(data: HTMLInputElement) {
    html2canvas(data).then(canvas=>{
      // Few necessary setting options
      var imgWidth = 210;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save('Distributor Sales Report.pdf'); // Generated PDF
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
      this.excelService.generateExcel('Distributor Sales Report', 'sales_report', r, this.headers, format);
    }
  }

}
