import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportExcelService } from '../../../shared/report-excel.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { PlacesService } from '../../../shared/places.service';

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
  constructor(private router: Router, private excelService: ReportExcelService,private formBuilder: FormBuilder, private placesAPI: PlacesService) { }
  reports_daily: any[];
  reports_weekly: any[];
  reports_monthly: any[];
  headers_daily: any[];
  headers_weekly: any[];
  headers_monthly: any[];
  sched: string;
  places: any[];
  selectedRegion: string;
  selectedCluster: string;
  selectedTownship: string;
  clusterList: any[];
  townshipList: any[];

  ngOnInit() {
    this.headers_daily = ["Region/State","Cluster","Township","Distributor","Retailer","SKU"];
    for(var x=21;x<28;x++) {
      this.headers_daily.push(x);
    }
    this.headers_weekly = ["Region/State","Cluster","Township","Distributor","Retailer","SKU", "Week1", "Week2", "Week3", "Week4"];
    this.headers_monthly = ["Region/State","Cluster","Township","Distributor","Retailer","SKU", "August"];

    this.selectedRegion = '';
    this.selectedCluster = '';
    this.selectedTownship = '';
    this.clusterList = [];
    this.townshipList = [];

    this.reports_daily = [
      {
        "region": "Yangon",
        "cluster": "Yangon West",
        "township": "XXXX",
        "distributor": "ABC",
        "retailers": "AK",
        "sku": "Sim Card WCDMA (YGN-Huawei) with jacket",
        "sales_amount": 1000,
        "sales_quantity": 12
      },
      {
        "region": "Yangon",
        "cluster": "Yangon West",
        "township": "XXXX",
        "distributor": "ABC",
        "retailers": "AK",
        "sku": "GSM Top Up Card 1000MMK",
        "sales_amount": 0,
        "sales_quantity": 0
      },
      {
        "region": "Yangon",
        "cluster": "Yangon West",
        "township": "XXXX",
        "distributor": "ABC",
        "retailers": "AK",
        "sku": "GSM Top Up Card 3000MMK",
        "sales_amount": 20,
        "sales_quantity": 5
      }
    ];
    this.reports_weekly = [
      {
        "region": "Yangon",
        "cluster": "Yangon West",
        "township": "XXXX",
        "distributor": "ABC",
        "retailers": "AK",
        "sku": "Sim Card WCDMA (YGN-Huawei) with jacket",
        "sales_amount": 1000,
        "sales_quantity": 12
      },
      {
        "region": "Yangon",
        "cluster": "Yangon West",
        "township": "XXXX",
        "distributor": "ABC",
        "retailers": "AK",
        "sku": "GSM Top Up Card 1000MMK",
        "sales_amount": 0,
        "sales_quantity": 0
      },
      {
        "region": "Yangon",
        "cluster": "Yangon West",
        "township": "XXXX",
        "distributor": "ABC",
        "retailers": "AK",
        "sku": "GSM Top Up Card 3000MMK",
        "sales_amount": 20,
        "sales_quantity": 5
    }];
    this.reports_monthly = [
      {
        "region": "Yangon",
        "cluster": "Yangon West",
        "township": "XXXX",
        "distributor": "ABC",
        "retailers": "AK",
        "sku": "Sim Card WCDMA (YGN-Huawei) with jacket",
        "sales_amount": 1000,
        "sales_quantity": 12
      },
      {
        "region": "Yangon",
        "cluster": "Yangon West",
        "township": "XXXX",
        "distributor": "ABC",
        "retailers": "AK",
        "sku": "GSM Top Up Card 1000MMK",
        "sales_amount": 0,
        "sales_quantity": 0
      },
      {
        "region": "Yangon",
        "cluster": "Yangon West",
        "township": "XXXX",
        "distributor": "ABC",
        "retailers": "AK",
        "sku": "GSM Top Up Card 3000MMK",
        "sales_amount": 20,
        "sales_quantity": 5
    }];
    this.sched = 'daily';
    this.createForm();
    this.places = this.placesAPI.getPlaces();
    console.log(this.places);
  }
  selectSched(value: string) {
    if(value == 'daily') {
      this.salesReportForm.removeControl('specific_date');
      this.salesReportForm.addControl('from_date', new FormControl('', Validators.required));
      this.salesReportForm.addControl('to_date', new FormControl('', Validators.required));
    }
    else {
      this.salesReportForm.removeControl('from_date');
      this.salesReportForm.removeControl('to_date');
      this.salesReportForm.addControl('specific_date', new FormControl('', Validators.required));
    }
    this.sched = value;
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
      specific_date: [],
      sched: ['', Validators.required]
    });
  }

  showSalesTable() {
    this.submittedForm = true;
    if (this.salesReportForm.invalid) {
        return;
    }
    else {
      this.sched = this.salesReportForm.get('sched').value;
      this.submitted = true;
    }
  }
  pickRegion(value: string) {
    this.selectedRegion = value;
    //this.salesReportForm.get('township').disable();
    this.clusterList = [];
    var cluster = [];
    this.places.forEach(function(p){
      if(p.region == value) {
        cluster = p.districts;
      }
    });
    this.clusterList = cluster;
    this.salesReportForm.get('cluster').setValue('');
    this.salesReportForm.get('cluster').enable();
    this.salesReportForm.get('township').setValue('');
    this.salesReportForm.get('township').disable();
  }
  pickCluster(value: string) {
    this.selectedCluster = value;
    var townships = [];
    this.clusterList.forEach(function(c){
        if(value == c.district) {
          townships = c.townships;
        }
    });
    this.townshipList = townships;
    this.salesReportForm.get('township').setValue('');
    this.salesReportForm.get('township').enable();
  }
  pickTownship(value: string) {
    this.selectedTownship = value;
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
    this.submittedForm = true;
    if (this.salesReportForm.invalid) {
        return;
    }
    else {
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
        var header = [];
        let r;
        this.sched = this.salesReportForm.get('sched').value;
        if(this.sched == 'daily') {
          header = this.headers_daily;
          r = Object.values(this.reports_daily);
        }
        else if(this.sched == 'weekly') {
          header = this.headers_weekly;
          r = Object.values(this.reports_weekly);
        }
        else if(this.sched == 'monthly') {
          header = this.headers_monthly;
          r = Object.values(this.reports_monthly);
        }
        this.excelService.generateExcel('Distributor Sales Report', 'sales_report', r, header, format);
      }
    }

  }

}
