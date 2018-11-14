import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportExcelService } from '../../../shared/report-excel.service';
import { ApiService } from '../../../shared/api.service';
import { HttpClient,HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { PlacesService } from '../../../shared/places.service';

@Component({
  selector: 'app-retailer-inventory-status',
  templateUrl: './retailer-inventory-status.component.html',
  styleUrls: ['./retailer-inventory-status.component.css']
})
export class RetailerInventoryStatusComponent implements OnInit {
  submitted:boolean = false;
  retailerInventoryForm: FormGroup;
  submittedForm:boolean = false;

  constructor(private router: Router,
              private excelService: ReportExcelService,
              private formBuilder: FormBuilder,
              private apiService: ApiService,
              private placesAPI: PlacesService) { }
  reports: any[];
  headers: any[];
  sched: string;
  agents: any[];
  places: any[];
  retailers: any[];
  selectedRegion: string;
  selectedCluster: string;
  selectedTownship: string;
  selectedAgent: string;
  clusterList: any[];
  townshipList: any[];
  loading: boolean = false;

  ngOnInit() {
    this.headers = ["Region/State","Cluster","Township","Distributor","Retailer","SKU","Inventory"];
    // this.reports = [{"region":"Ayeyarwady Region","cluster":"Ayeyarwady","township":"Pathein","distributor":"Success World","retailer":"Chit Gabar","sku":"GSM Top Up Card 3000MMK","inventory": "8"},
    // {"region":"Ayeyarwady Region","cluster":"Ayeyarwady","township":"Pathein","distributor":"Success World","retailer":"Chit Gabar","sku":"CDMA(450)MHz Top Up Card 5000MMK", "inventory": "10"}];
    this.sched = 'daily';
    this.reports = [];
    this.createForm();
    this.places = this.placesAPI.getPlaces();
    this.getAgentAPI();
  }

  createForm() {
    this.retailerInventoryForm = this.formBuilder.group({
      // region: ['', Validators.required],
      region: [''],
      cluster: [''],
      township: [''],
      agent: [''],
      retailer: ['']
    });
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
    this.retailerInventoryForm.get('cluster').setValue('');
    this.retailerInventoryForm.get('cluster').enable();
    this.retailerInventoryForm.get('township').setValue('');
    this.retailerInventoryForm.get('township').disable();
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
    this.retailerInventoryForm.get('township').setValue('');
    this.retailerInventoryForm.get('township').enable();
  }
  pickTownship(value: string) {
    this.selectedTownship = value;
  }
  pickAgent(value: string) {
    this.retailers = [];
    this.selectedAgent = value;
    this.getRetailerAPI(this.selectedAgent);
    this.retailerInventoryForm.get('retailer').setValue('');
    this.retailerInventoryForm.get('retailer').enable();
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

  // convenience getter for easy access to form fields
  get f() { return this.retailerInventoryForm.controls; }

  showSalesTable() {
    this.submittedForm = true;
    if (this.retailerInventoryForm.invalid) {
        return;
    }
    else {

      var param_region = this.retailerInventoryForm.get('region').value;
      var param_cluster = this.retailerInventoryForm.get('cluster').value;
      var param_township = this.retailerInventoryForm.get('township').value;

      var param_agent = this.retailerInventoryForm.get('agent').value;
      var param_retailer = this.retailerInventoryForm.get('retailer').value;
      var params = new HttpParams()
        .set('agent_id', param_agent)
        .set('retailer_id', param_retailer)
        .set('retailer_region', param_region)
        .set('retailer_cluster', param_cluster)
        .set('retailer_township', param_township)

      this.getRetailerInventoryAPI(params);
      this.submitted = true;
    }
  }

  getRetailerInventoryAPI(param) {
    this.loading = true;
    this.apiService.get('reports/retailer_inventory/?'+param)
    .subscribe(ret => {
      let data: any[] = JSON.parse(JSON.stringify(ret));
      console.log(Object.values(data));
      var code = Object.values(data)[1];
      if(code == 4005) {
        this.reports = [];
      }
      else {
        this.reports = Object.values(data)[2];
      }
      this.loading = false;
      //alert(data.message);
      //console.log(data.data);
      //console.log(Object.values(data));
    },
    (err) => {
      console.log(err);
    });
  }

  hideSalesTable() {
    //this.retailerInventoryForm.reset();
    this.reports = [];
    this.submitted = false;
    this.retailerInventoryForm.reset();
    // var form = <HTMLFormElement>document.getElementById('retailerInventoryForm');
    // form.reset();
  }
  routerNavigate() {
    this.router.navigate(['sales-report-table']);
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
      pdf.save('Retailer Inventory Status.pdf'); // Generated PDF
      this.submitted = false;
    });
  }
  exportToFile(format: string) {
    this.submittedForm = true;
    if (this.retailerInventoryForm.invalid) {
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
        var param_region = this.retailerInventoryForm.get('region').value;
        var param_cluster = this.retailerInventoryForm.get('cluster').value;
        var param_township = this.retailerInventoryForm.get('township').value;

        var param_agent = this.retailerInventoryForm.get('agent').value;
        var param_retailer = this.retailerInventoryForm.get('retailer').value;
        var params = new HttpParams()
          .set('agent_id', param_agent)
          .set('retailer_id', param_retailer)
          .set('retailer_region', param_region)
          .set('retailer_cluster', param_cluster)
          .set('retailer_township', param_township)

        this.apiService.get('reports/retailer_inventory/?'+params)
        .subscribe(ret => {
          let data: any[] = JSON.parse(JSON.stringify(ret));
          // console.log(Object.values(data));
          // var code = Object.values(data)[1];
          // if(code == 4005) {
          //   this.reports = [];
          // }
          // else {
          //   this.reports = Object.values(data)[2];
          // }
          let r = Object.values(data)[2];
          this.excelService.generateExcel('Retailer Inventory Status', 'retailer_inventory_status', r, this.headers, format);
        },
        (err) => {
          console.log(err);
        });

      }

    }

  }
}
