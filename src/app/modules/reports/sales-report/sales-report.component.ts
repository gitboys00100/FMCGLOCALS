import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportExcelService } from '../../../shared/report-excel.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { PlacesService } from '../../../shared/places.service';
import { ApiService } from '../../../shared/api.service';
import { HttpClient,HttpParams } from '@angular/common/http';
import { addDays, subDays, eachDay, getDate, getDay, lastDayOfMonth, startOfMonth, format, getMonth } from 'date-fns';
import { Directive, Output, EventEmitter, Input, SimpleChange} from '@angular/core';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
@Directive({
  selector: '[onCreate]'
})
export class SalesReportComponent implements OnInit {
  from_date = '';
  to_date = '';
  salesReportForm: FormGroup;

  submitted:boolean = false;
  submittedForm:boolean = false;
  selected_date_range: any[];
  selectedMonth: string;

  @Output() onCreate: EventEmitter<any> = new EventEmitter<any>();
  constructor(private router: Router,
              private excelService: ReportExcelService,
              private formBuilder: FormBuilder,
              private placesAPI: PlacesService,
              private apiService: ApiService) { }

  reports_daily_count: number;
  reports_weekly_count: number;
  reports_monthly_count: number;
  daily_col_count: number;
  weekly_col_count: number;
  monthly_col_count: number;

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
  selectedAgent: string;
  clusterList: any[];
  townshipList: any[];
  agents: any[];
  retailers: any[];
  monthsName: any[];
  loopCounter: number = 1;
  counterWeek: number = 0;
  loop: number = 0;

  ngOnInit() {
    this.headers_daily = [];
    this.headers_weekly = [];
    this.headers_monthly = [];
    this.reports_daily_count = 0;
    this.reports_weekly_count = 0;
    this.reports_monthly_count = 0;
    this.daily_col_count = 6;
    this.monthly_col_count = 6;
    this.weekly_col_count = 6;

    this.selectedRegion = '';
    this.selectedCluster = '';
    this.selectedTownship = '';
    this.clusterList = [];
    this.townshipList = [];
    this.selected_date_range = [];
    this.monthsName = [];
    this.selectedMonth = '';

    this.onCreate.emit('dummy');

    this.reports_daily = [];
    this.reports_weekly = [];
    this.reports_monthly = [];

    this.sched = 'daily';
    this.createForm();
    this.places = this.placesAPI.getPlaces();
    this.getAgentAPI();
  }
  getAgentAPI() {
    this.apiService.get('users/')
    .subscribe(ret => {
      let data: any[] = JSON.parse(JSON.stringify(ret));
      //alert(data.message);
      //console.log(data.data);
      this.agents = Object.values(data)[2];
      //console.log(Object.values(dgetSalesReportAPIata));
    },
    (err) => {
      console.log(err);
    });
  }

  getRetailerAPI(agent: string) {
    this.apiService.get('retailers/?assigned_agent_id='+agent)
    .subscribe(ret => {
      let data: any[] = JSON.parse(JSON.stringify(ret));
      //console.log(Object.values(data));
      //alert(data.message);
      //console.log(data.data);
      this.retailers = Object.values(data)[2];
      //console.log(Object.values(data));
    },
    (err) => {
      console.log(err);
    });
  }
  getSalesReportAPI(param, sched: string) {
    this.apiService.get('reports/sales/?'+param)
    .subscribe(ret => {
      let data: any[] = JSON.parse(JSON.stringify(ret));
      // console.log(Object.values(data));
      var code = Object.values(data)[1];
      if(sched == 'daily') {
        this.reports_daily = [];
        this.reports_daily = Object.values(data)[2];
        this.daily_col_count += this.selected_date_range.length;
        if(code == 4005) {
          this.reports_daily_count = 0;
          this.reports_daily = [];
        }
        else {
          this.reports_daily_count = Object.values(data)[2];
        }
      }
      else if(sched == 'weekly') {
        this.reports_weekly = [];
        this.reports_weekly = Object.values(data)[2];
        this.weekly_col_count += this.selected_date_range.length;
        if(code == 4005) {
          this.reports_weekly_count = 0;
          this.reports_weekly = [];
        }
        else {
          this.reports_weekly_count = Object.values(data)[2];
        }
      }
      else if(sched == 'monthly') {
        this.reports_monthly = [];
        this.reports_monthly = Object.values(data)[2];
        this.monthly_col_count += 1;
        if(code == 4005) {
          this.reports_monthly_count = 0;
          this.reports_monthly = [];
        }
        else {
          this.reports_monthly_count = Object.values(data)[2];
        }
      }
      //alert(data.message);
      //console.log(data.data);
      //console.log(Object.values(data));
    },
    (err) => {
      console.log(err);
    });
  }
  selectSched(value: string) {
    if(value != 'monthly') {
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
      region: [''],
      cluster: [''],
      township: [''],
      agent: [''],
      retailer: [''],
      from_date: ['', Validators.required],
      to_date: ['', Validators.required],
      specific_date: [''],
      sched: ['', Validators.required]
    });
  }
  addToLoopCounter() {
    this.loop += 1;
    this.loopCounter += 1;
  }
  showLoop() {
    return this.loop;
  }
  updateWeekCounter() {
    this.counterWeek += 1;
  }
  showWeekCounter() {
    if(this.counterWeek >= this.monthsName.length) {
      this.counterWeek = 0;
    }
    //return this.counterWeek;
  }
  updateLoopCounter(week: string, sales: number, month: string) {

    if(this.loopCounter > 4) {
      this.loopCounter = 1;
      this.counterWeek += 1;
    }
    if((parseInt(week) != this.loopCounter) || (parseInt(month) != this.getMonthValue(this.counterWeek)))  {
      sales = 0;
    }
    return sales;
  }
  getMonthValue(index: number) {
    var m = this.monthsName[index];
    var month;
    switch(m) {
      case 'January':
        month = 1;
        break;
      case 'February':
        month = 2;
        break;
      case 'March':
        month = 3;
        break;
      case 'April':
        month = 4;
        break;
      case 'May':
        month = 5;
        break;
      case 'June':
        month = 6;
        break;
      case 'July':
        month = 7;
        break;
      case 'August':
        month = 8;
        break;
      case 'September':
        month = 9;
        break;
      case 'October':
        month = 10;
        break;
      case 'November':
        month = 11;
        break;
      case 'December':
        month = 12;
        break;
    }
    return month;
  }
  showSalesTable() {
    this.submittedForm = true;
    if (this.salesReportForm.invalid) {
        return;
    }
    else {
      var param_region = this.removeNull(this.salesReportForm.get('region').value);
      var param_cluster = this.removeNull(this.salesReportForm.get('cluster').value);
      var param_township = this.removeNull(this.salesReportForm.get('township').value);

      var param_agent = this.removeNull(this.salesReportForm.get('agent').value);
      var param_retailer = this.removeNull(this.salesReportForm.get('retailer').value);
      var param_sched = this.removeNull(this.salesReportForm.get('sched').value);
      var param_from_date, param_to_date, specific_date, params;

      if(param_sched != 'monthly') {
        param_from_date = this.removeNull(this.salesReportForm.get('from_date').value);
        param_to_date = this.removeNull(this.salesReportForm.get('to_date').value);
        if(param_sched == 'weekly') {
          //adjust weekl
          param_from_date = this.adjustDate(param_from_date, 'left');
          param_to_date = this.adjustDate(param_to_date, 'right');
        }
        params = new HttpParams()
          .set('agent_id', param_agent)
          .set('retailer_id', param_retailer)
          .set('retailer_region_exact', param_region)
          .set('retailer_cluster_exact', param_cluster)
          .set('retailer_township_exact', param_township)
          .set('timestamp_gte', param_from_date)
          .set('timestamp_lte', param_to_date)
          .set('report_type', param_sched);
        //alert(params);
        //this.selected_date_range = eachDay(addDays(param_from_date, 1), addDays(param_to_date, 1));

        this.selected_date_range = eachDay(param_from_date, param_to_date);

        this.selected_date_range.forEach(function(dt){
          var exist = false
          this.monthsName.forEach(function(mo){
            if(mo == this.getMonthFullName(getMonth(dt))) {
              exist = true;
            }
          }, this);
          if(!exist) {
            this.monthsName.push(this.getMonthFullName(getMonth(dt)));
          }
        }, this);

        if(param_sched == 'weekly') {
          this.headers_weekly = ["Region/State","Cluster","Township","Agent","Retailer","SKU"];
          for(var i=0;i<this.monthsName.length;i++) {
            this.headers_weekly.push("Week1");
            this.headers_weekly.push("Week2");
            this.headers_weekly.push("Week3");
            this.headers_weekly.push("Week4");
          }
        }
        else if(param_sched == 'daily') {
          this.headers_daily = ["Region/State","Cluster","Township","Agent","Retailer","SKU"];
          this.selected_date_range.forEach(function(d){
            this.headers_daily.push(getDate(d));
            // console.log(getDate(d));
          }, this);
        }
      }
      else {

        specific_date = this.removeNull(this.salesReportForm.get('specific_date').value);
        var start_of_month = format(startOfMonth(specific_date), 'YYYY-MM-DD');
        var last_of_month = format(lastDayOfMonth(specific_date), 'YYYY-MM-DD');
        this.selectedMonth = this.getMonthFullName(getMonth(specific_date));
        params = new HttpParams()
          .set('agent_id', param_agent)
          .set('retailer_id', param_retailer)
          .set('retailer_region_exact', param_region)
          .set('retailer_cluster_exact', param_cluster)
          .set('retailer_township_exact', param_township)
          .set('timestamp_gte', start_of_month)
          .set('timestamp_lte', last_of_month)
          .set('report_type', param_sched);

        if(param_sched == 'monthly') {
          this.headers_monthly = ["Region/State","Cluster","Township","Agent","Retailer","SKU"];
          this.headers_monthly.push(this.selectedMonth);
        }
      }
      // alert(params);
      this.getSalesReportAPI(params, param_sched);
      this.sched = this.removeNull(this.salesReportForm.get('sched').value);
      this.submitted = true;
    }
  }
  getMonthFullName(month: number) {
    var name = '';
    switch(month) {
      case 0:
        name = 'January';
        break;
      case 1:
        name = 'February';
        break;
      case 2:
        name = 'March';
        break;
      case 3:
        name = 'April';
        break;
      case 4:
        name = 'May';
        break;
      case 5:
        name = 'June';
        break;
      case 6:
        name = 'July';
        break;
      case 7:
        name = 'August';
        break;
      case 8:
        name = 'September';
        break;
      case 9:
        name = 'October';
        break;
      case 10:
        name = 'November';
        break;
      case 11:
        name = 'December';
        break;
    }
    return name;
  }
  adjustDate(date, direction) {
    var new_start_date = date;
    var counter;
    if(direction == 'left') {
      var day = getDate(date);
      if(day <= 7) {
        counter = 1;
      }
      else if((day > 7) && (day <= 14)) {
        counter = 8;
      }
      else if((day > 14) && (day <= 21)) {
        counter = 15;
      }
      else if(day > 22) {
        counter = 22;
      }
      while(getDate(new_start_date) != counter) {
        new_start_date = subDays(new_start_date, 1);
      }
    }
    else if(direction == 'right') {
      var day = getDate(date);
      if(day <= 7) {
        counter = 7;
      }
      else if((day > 7) && (day <= 14)) {
        counter = 14;
      }
      else if((day > 14) && (day <= 21)) {
        counter = 21;
      }
      else if(day > 21) {
        counter = 'undefined';
      }
      if(counter != 'undefined') {
        while(getDate(new_start_date) != counter) {
          new_start_date = addDays(new_start_date, 1);
        }
      }
      else {
        new_start_date = lastDayOfMonth(date);
      }
    }
    return format(new_start_date, 'YYYY-MM-DD');
  }
  arrayGenerate(n: number): any[] {
    return Array(n);
  }
  getDate(date) {
    return getDate(date);
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
  pickAgent(value: string) {
    this.retailers = [];
    this.selectedAgent = value;
    this.getRetailerAPI(this.selectedAgent);
    this.salesReportForm.get('retailer').setValue('');
    this.salesReportForm.get('retailer').enable();
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
          this.from_date = '';
        }
        else if(clicked == 'to') {
          this.salesReportForm.get('to_date').setValue('');
          this.to_date = '';
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
    this.headers_daily = [];
    this.headers_weekly = [];
    this.headers_monthly = [];

    this.selectedRegion = '';
    this.selectedCluster = '';
    this.selectedTownship = '';
    this.selected_date_range = [];
    this.monthsName = [];
    this.loopCounter = 1;
    this.counterWeek = 0;
    this.loop = 0;
    this.selectedMonth = '';


    this.submitted = false;
    this.submittedForm = false;
    this.salesReportForm.reset();
    // var form = <HTMLFormElement>document.getElementById('salesReportForm');
    // form.reset();

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
  GetFormattedDate(date: Date) {
    var todayTime = date;
    var month = todayTime .getMonth() + 1;
    var day = todayTime .getDate();
    var year = todayTime .getFullYear();
    return year + "-" + month + "-" + day;
  }
  removeNull(data) {
    var d;
    if(data == null) {
      d = '';
    }
    else {
      d = data;
    }
    return d;
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

        var param_region = this.removeNull(this.salesReportForm.get('region').value);
        var param_cluster = this.removeNull(this.salesReportForm.get('cluster').value);
        var param_township = this.removeNull(this.salesReportForm.get('township').value);

        var param_agent = this.removeNull(this.salesReportForm.get('agent').value);
        var param_retailer = this.removeNull(this.salesReportForm.get('retailer').value);
        var param_sched = this.removeNull(this.salesReportForm.get('sched').value);
        var param_from_date, param_to_date, specific_date, params;
        if(param_sched != 'monthly') {
          param_from_date = this.removeNull(this.salesReportForm.get('from_date').value);
          param_to_date = this.removeNull(this.salesReportForm.get('to_date').value);
          if(param_sched == 'weekly') {
            //adjust weekl
            param_from_date = this.adjustDate(param_from_date, 'left');
            param_to_date = this.adjustDate(param_to_date, 'right');
          }
          params = new HttpParams()
            .set('agent_id', param_agent)
            .set('retailer_id', param_retailer)
            .set('retailer_region_exact', param_region)
            .set('retailer_cluster_exact', param_cluster)
            .set('retailer_township_exact', param_township)
            .set('timestamp_gte', param_from_date)
            .set('timestamp_lte', param_to_date)
            .set('report_type', param_sched);
          //alert(params);
          //this.selected_date_range = eachDay(addDays(param_from_date, 1), addDays(param_to_date, 1));

          this.selected_date_range = eachDay(param_from_date, param_to_date);

          this.selected_date_range.forEach(function(dt){
            var exist = false
            this.monthsName.forEach(function(mo){
              if(mo == this.getMonthFullName(getMonth(dt))) {
                exist = true;
              }
            }, this);
            if(!exist) {
              this.monthsName.push(this.getMonthFullName(getMonth(dt)));
            }
          }, this);

          if(param_sched == 'weekly') {
            this.headers_weekly = ["Region/State","Cluster","Township","Agent","Retailer","SKU"];
            for(var i=0;i<this.monthsName.length;i++) {
              this.headers_weekly.push("Week1");
              this.headers_weekly.push("Week2");
              this.headers_weekly.push("Week3");
              this.headers_weekly.push("Week4");
            }
            header = this.headers_weekly;
          }
          else if(param_sched == 'daily') {
            this.headers_daily = ["Region/State","Cluster","Township","Agent","Retailer","SKU"];
            this.selected_date_range.forEach(function(d){
              this.headers_daily.push(getDate(d));
              // console.log(getDate(d));
            }, this);

            header = this.headers_daily;
          }

        }
        else {
          specific_date = this.removeNull(this.salesReportForm.get('specific_date').value);

          var start_of_month = this.GetFormattedDate(startOfMonth(specific_date));
          var last_of_month = this.GetFormattedDate(lastDayOfMonth(specific_date));
          this.selectedMonth = this.getMonthFullName(getMonth(specific_date));
          params = new HttpParams()
            .set('agent_id', param_agent)
            .set('retailer_id', param_retailer)
            .set('retailer_region_exact', param_region)
            .set('retailer_cluster_exact', param_cluster)
            .set('retailer_township_exact', param_township)
            .set('timestamp_gte', start_of_month)
            .set('timestamp_lte', last_of_month)
            .set('report_type', param_sched);

          if(param_sched == 'monthly') {
            this.headers_monthly = ["Region/State","Cluster","Township","Agent","Retailer","SKU"];
            this.headers_monthly.push(this.selectedMonth);

            header = this.headers_monthly;
          }
        }
        this.apiService.get('reports/sales/?'+params)
        .subscribe(ret => {
          let data: any[] = JSON.parse(JSON.stringify(ret));
          // console.log(Object.values(data));
          var code = Object.values(data)[1];
          if(param_sched == 'daily') {
            r = Object.values(data)[2];
            this.daily_col_count += this.selected_date_range.length;
            if(code == 4005) {
              this.reports_daily_count = 0;
              r = [];
            }
            else {
              this.reports_daily_count = Object.values(data)[2];
            }
          }
          else if(param_sched == 'weekly') {
            r = Object.values(data)[2];
            this.weekly_col_count += this.selected_date_range.length;
            if(code == 4005) {
              this.reports_weekly_count = 0;
              r = [];
            }
            else {
              this.reports_weekly_count = Object.values(data)[2];
            }
          }
          else if(param_sched == 'monthly') {
            r = Object.values(data)[2];
            this.monthly_col_count += 1;
            if(code == 4005) {
              this.reports_monthly_count = 0;
              r = [];
            }
            else {
              this.reports_monthly_count = Object.values(data)[2];
            }
          }
          this.excelService.generateExcel('Distributor Sales Report', 'sales_report', r, header, format,'','',this.selected_date_range, param_sched, this.monthsName);
          //alert(data.message);
          //console.log(data.data);
          //console.log(Object.values(data));
        },
        (err) => {
          console.log(err);
        });
      }
    }

  }

}
