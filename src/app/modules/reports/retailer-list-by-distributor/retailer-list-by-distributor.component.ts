 import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportExcelService } from '../../../shared/report-excel.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ApiService } from '../../../shared/api.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-retailer-list-by-distributor',
  templateUrl: './retailer-list-by-distributor.component.html',
  styleUrls: ['./retailer-list-by-distributor.component.css'],
  providers: [ DatePipe ]
})
export class RetailerListByDistributorComponent implements OnInit {
  chooseDistributorForm: FormGroup;
  submitted = false;

  loading: boolean;
  loadingAgents: boolean = false;
  constructor(private router: Router,
    private excelService: ReportExcelService,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe) { }
  headers: any[];
  reports: any[];
  retailers: any[];
  selectedCompany: string;
  selectedCompanyName: string;
  companies: any[];
  successSubmitted: boolean;
  order: string = 'name';
  reverse: boolean = false;
  reverseName: boolean = false;
  reverseOwner: boolean = false;
  reverseHouseNumber: boolean = false;
  reverseTownship: boolean = false;
  reverseCountry: boolean = false;
  reverseCreatedDate: boolean = false;
  name: boolean = false;
  owner: boolean = false;
  house_number: boolean = false;
  township: boolean = false;
  country: boolean = false;
  created_date: boolean = false;
  today: number = Date.now();
  selectedDate: number;
  agents: any[];

  public filterSearchQuery: string = '';
  public searchQuery: string = '';
	public itemsPerPage: number = 5;
  ngOnInit() {
    this.createForm();
    this.companies = [];
    this.selectedCompany = '';
    this.selectedCompanyName = '';
    this.retailers = [];
    this.loading = false;
    this.successSubmitted = false;
    this.selectedDate = this.today;

    this.headers = ["Distributor", "Retailer", "Owner", "Street", "Township", "Country", "Created Date"];
    //this.getCompany('companies/');
    this.getAgents('users/');
  }


  setRetailerOrder(value: string, caret_name: string) {
    if(this.order === value) {
      this.reverse = !this.reverse;
      if(caret_name == 'name') {
        this.reverseName = !this.reverseName;
      }
      else if(caret_name == 'owner') {
        this.reverseOwner = !this.reverseOwner;
      }
      else if(caret_name == 'house_number') {
        this.reverseHouseNumber = !this.reverseHouseNumber;
      }
      else if(caret_name == 'township') {
        this.reverseTownship = !this.reverseTownship;
      }
      else if(caret_name == 'country') {
        this.reverseCountry = !this.reverseCountry;
      }
      else if(caret_name == 'created_date') {
        this.reverseCreatedDate = !this.reverseCreatedDate;
      }
    }
    this.order = value;
    if(caret_name == 'name') {
      this.name = false;
      this.owner = false;
      this.house_number = false;
      this.township = false;
      this.country = false;
      this.created_date = false;
      this.reverse = this.reverseName;
    }
    else if(caret_name == 'owner') {
      this.name = false;
      this.owner = false;
      this.house_number = false;
      this.township = false;
      this.country = false;
      this.created_date = false;
      this.reverse = this.reverseOwner;
    }
    else if(caret_name == 'house_number') {
      this.name = false;
      this.owner = false;
      this.house_number = false;
      this.township = false;
      this.country = false;
      this.created_date = false;
      this.reverse = this.reverseHouseNumber;
    }
    else if(caret_name == 'township') {
      this.name = false;
      this.owner = false;
      this.house_number = false;
      this.township = false;
      this.country = false;
      this.created_date = false;
      this.reverse = this.reverseTownship;
    }
    else if(caret_name == 'country') {
      this.name = false;
      this.owner = false;
      this.house_number = false;
      this.township = false;
      this.country = false;
      this.created_date = false;
      this.reverse = this.reverseCountry;
    }
    else if(caret_name == 'created_date') {
      this.name = false;
      this.owner = false;
      this.house_number = false;
      this.township = false;
      this.country = false;
      this.created_date = false;
      this.reverse = this.reverseCreatedDate;
    }

  }

  onChangeDate(date:any) {
    this.selectedDate = new Date(date).getTime();
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
        console.log('Retailers');
        console.log(Object.values(data));
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
    var temp = this.agents;
    var company_name = '';
    for(var x=0;x<temp.length;x++) {
      if(temp[x].id == value) {
        company_name = temp[x].first_name+' '+temp[x].last_name;
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

  getAgents(url: string) {
    this.loadingAgents = true;
    this.apiService.get(url)
		.subscribe(comp => {
      let data: any[] = JSON.parse(JSON.stringify(comp['data']));
      //alert(data.message);
      //console.log(data.data);
      // console.log(Object.values(data));
      this.agents = Object.values(data);
      this.loadingAgents = false;
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
        this.getRetailers('retailers/?assigned_agent_id='+this.selectedCompany);
      }

    }
  }
  hideSalesTable() {
    this.submitted = false;
    this.successSubmitted = false;
    this.chooseDistributorForm.reset();
    this.retailers = [];
  }
  captureTable(data: HTMLInputElement) {
    html2canvas(data).then(canvas=>{
      // Few necessary setting options
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', "a4"); // A4 size page of PDF

      var imgWidth = 210;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save('Retailer List By Distributor.pdf'); // Generated PDF
      this.successSubmitted = false;
    });
  }
  checkIfEmpty(val: string) {
    var value = '';
    if(val != null) {
      value = val;
    }
    return value;
  }
  transformDate(date: Date) {
    return this.datePipe.transform(date, 'MMMM dd, yyyy');
  }

  public onShowCountChange($event) {
		this.itemsPerPage = $event.target.value;
	}

  public onFilterSearchChange($event) {
		this.searchQuery = $event.target.value;

		if (this.searchQuery === '')
		this.onSearch();
	}

	public onSearch() {
		this.filterSearchQuery = this.searchQuery;
	}

	public onKeyDown($event) {
		if ($event.keyCode === 13) {
			this.onSearch();
			$event.preventDefault();
		}
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
        this.getRetailers('retailers/?assigned_agent_id='+this.selectedCompany);
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

            //var width = <HTMLInputElement>document.getElementById('pdfContent').offsetWidth;
            //alert(width);
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
              var date = self.transformDate(r[x].timestamp);
              //var date = formatDate(r[x].timestamp, 'MMMM dd, yyyy', self.locale);
              temp['created_date'] = self.checkIfEmpty(date);
              content.push(temp);
            }
            self.excelService.generateExcel('Retailer List By Distributor', 'retailer_list_by_distributor', content, self.headers, format, self.selectedCompanyName);
            //console.log(content);
          }
        }, 1000);

      }
    }

  }
}
