 import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportExcelService } from '../../../shared/report-excel.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ApiService } from '../../../shared/api.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-retailer-list-by-distributor',
  templateUrl: './retailer-list-by-distributor.component.html',
  styleUrls: ['./retailer-list-by-distributor.component.css']
})
export class RetailerListByDistributorComponent implements OnInit {
  chooseDistributorForm: FormGroup;
  submitted = false;

  loading: boolean;
  constructor(private router: Router,
    private excelService: ReportExcelService,
    private apiService: ApiService,
    private formBuilder: FormBuilder) { }
  headers: any[];
  reports: any[];
  retailers: any[];
  selectedCompany: string;
  selectedCompanyName: string;
  companies: any[];
  successSubmitted: boolean;
  ngOnInit() {
    this.createForm();
    this.companies = [];
    this.selectedCompany = '';
    this.selectedCompanyName = '';
    this.retailers = [];
    this.loading = false;
    this.successSubmitted = false;

    this.headers = ["Distributor", "Retailer", "Owner", "Street", "Township", "Country", "Created Date"];
    this.getCompany('companies/');
  }

  createForm() {
    this.chooseDistributorForm = this.formBuilder.group({
      company: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.chooseDistributorForm.controls; }

  chooseDistributor(value: string) {
    this.selectedCompany = value;
  }
  getRetailers(url: string) {
    this.loading = true;
    this.apiService.get(url)
		.subscribe(ret => {
      if(ret['code'] ==  '2001') {
        let data: any[] = JSON.parse(JSON.stringify(ret['data']));
        //console.log(Object.values(data));
        //alert(data.message);
        //console.log(data.data);
        this.retailers = Object.values(data);
      }
      else {
        console.log('Not Found');
        this.retailers = [];
      }
      this.loading = false;
    },
		(err) => {
			console.log(err);
		});
  }
  getCompanyName(value: string) {
    var temp = this.companies;
    var company_name = '';
    for(var x=0;x<temp.length;x++) {
      if(temp[x].id == value) {
        company_name = temp[x].name;
      }
    }
    return company_name;
  }
  getCompany(url: string) {
    this.apiService.get(url)
		.subscribe(comp => {
      let data: any[] = JSON.parse(JSON.stringify(comp['data']));
      //alert(data.message);
      //console.log(data.data);
      this.companies = Object.values(data);
    },
		(err) => {
			console.log(err);
		});
  }

  showSalesTable() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.chooseDistributorForm.invalid) {
        return;
    }
    else {
      this.successSubmitted = true;

      this.selectedCompanyName = this.getCompanyName(this.selectedCompany);
      if(this.selectedCompany == 'all') {
        this.getRetailers('retailers/');
      }
      else {
        this.getRetailers('retailers/?company_id='+this.selectedCompany);
      }

    }
  }
  hideSalesTable() {
    this.successSubmitted = false;
    this.retailers = [];
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
      pdf.save('Retailer List By Distributor.pdf'); // Generated PDF
      this.submitted = false;
    });
  }
  checkIfEmpty(val: string) {
    var value = '';
    if(val != null) {
      value = val;
    }
    return value;
  }
  exportToFile(format: string) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.chooseDistributorForm.invalid) {
        return;
    }
    else {
      this.selectedCompanyName = this.getCompanyName(this.selectedCompany);
      if(this.selectedCompany == 'all') {
        this.getRetailers('retailers/');
      }
      else {
        this.getRetailers('retailers/?company_id='+this.selectedCompany);
      }
      var content = [];
      if(format == 'pdf') {
        this.successSubmitted = true;
        var i = 0;
        var self = this;
        var timer = window.setInterval(function() {
          var data = <HTMLInputElement>document.getElementById('pdfContent');
          //wait until the element comes out
          ++i;
          if(data && !self.loading) {
            clearInterval(timer);
            self.captureTable(data);
          }
        }, 1000);
      }
      else {
        var i = 0;
        var self = this;
        var timer = window.setInterval(function() {
          ++i;
          if(!self.loading) {
            clearInterval(timer);
            let r = Object.values(self.retailers);
            var c = self.companies;
            for(var x=0;x<r.length;x++) {
              var temp = {};
              if(self.selectedCompany == 'all') {
                var company_name = '';
                //find in company
                for(var y=0;y<c.length;y++) {
                  if(c[y].id == r[x].company_id) {
                    company_name = c[y].name;
                  }
                }
                temp['company'] = company_name;
              }
              else {
                temp['company'] = self.checkIfEmpty(self.selectedCompanyName);
              }
              temp['name'] = self.checkIfEmpty(r[x].name);
              temp['owner'] = self.checkIfEmpty(r[x].owner);
              //validation for house number because it is optional
              temp['house_number'] = self.checkIfEmpty(r[x].house_number);
              temp['street_name'] = self.checkIfEmpty(r[x].street_name);
              temp['township'] = self.checkIfEmpty(r[x].township);
              temp['country'] = self.checkIfEmpty(r[x].country);
              content.push(temp);
            }
            self.excelService.generateExcel('Retailer List By Distributor', 'retailer_list_by_distributor', content, self.headers, format, self.selectedCompanyName);
            console.log(content);
          }
        }, 1000);

      }
    }

  }
}
