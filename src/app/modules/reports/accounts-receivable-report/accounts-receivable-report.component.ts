import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ApiService } from '../../../shared/api.service';
import { HttpClient,HttpParams } from '@angular/common/http';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ReportExcelService } from '../../../shared/report-excel.service';

@Component({
  selector: 'app-accounts-receivable-report',
  templateUrl: './accounts-receivable-report.component.html',
  styleUrls: ['./accounts-receivable-report.component.css']
})
export class AccountsReceivableReportComponent implements OnInit {
  submitted:boolean = false;
  headers: any[];
  reports: any[];

  accountsReceivableForm: FormGroup;
  submittedForm:boolean = false;
  payment_terms: any[];
  agents: any[];
  retailers: any[];
  loadingPayment: boolean = false;
  loadingAgents: boolean = false;
  loadingRetailers: boolean = false;
  loadingPaymentTerms: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService,
              private excelService: ReportExcelService) { }

  ngOnInit() {
    this.headers = ["Agent","Selling Date","Sales Invoice #","Due Date","Customer Name","Amount","Payment Terms"];
    this.reports = [];
    this.payment_terms = [];
    // this.reports = [
    //   {
    //     "agent":"John Doe",
    //     "selling_date": "11/27/2018",
    //     "sales_invoice_number": "230913131",
    //     "due_date":"12/04/2018",
    //     "customer_name": "ABC Store",
    //     "amount": "20,000.00",
    //     "payment_terms": "1 Week"
    //   }
    // ];
    this.getPaymentTermsAPI();
    this.getAgentAPI();
    this.getRetailerAPI();
    this.createForm();
  }

  createForm() {
    this.accountsReceivableForm = this.formBuilder.group({
      // region: ['', Validators.required],
      agent: [''],
      customer: [''],
      sales_invoice_number: [''],
      due_date: [''],
      payment_terms: ['']
    });
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


  getAgentAPI() {
    this.loadingAgents = true;
    this.apiService.get('users/')
    .subscribe(ret => {
      let data: any[] = JSON.parse(JSON.stringify(ret));
      //alert(data.message);
      //console.log(data.data);
      this.agents = Object.values(data)[2];
      //console.log(Object.values(dgetSalesReportAPIata));W
      this.loadingAgents = false;
    },
    (err) => {
      console.log(err);
    });
  }
  getRetailerAPI() {
    this.loadingRetailers = true;
    this.apiService.get('retailers/')
    .subscribe(ret => {
      let data: any[] = JSON.parse(JSON.stringify(ret));
      //alert(data.message);
      //console.log(data.data);
      this.retailers = Object.values(data)[2];
      //console.log(Object.values(dgetSalesReportAPIata));
      this.loadingRetailers = false;
    },
    (err) => {
      console.log(err);
    });
  }

  getAccountsReceivableAPI(params) {
    this.loadingPayment = true;
    this.apiService.get('reports/accounts_receivable/?'+params)
    .subscribe(ret => {
      let data: any[] = JSON.parse(JSON.stringify(ret));
      //alert(data.message);
      //console.log(data.data);
      console.log(Object.values(data));
      var code = Object.values(data)[1];

      if(code == 4005) {
        this.reports = [];
      }
      else {
        this.reports = Object.values(data)[2];
      }
      this.loadingPayment = false;
      //console.log(Object.values(dgetSalesReportAPIata));
    },
    (err) => {
      console.log(err);
    });
  }
  getPaymentTermsAPI() {
    this.loadingPaymentTerms = true;
    this.apiService.get('payment_terms/')
    .subscribe(response => {
      let data: any[] = JSON.parse(JSON.stringify(response));
      //alert(data.message);
      //console.log(data.data);
      console.log(Object.values(data));
      var code = Object.values(data)[1];

      if(code == 4005) {
        this.payment_terms = [];
      }
      else {
        this.payment_terms = Object.values(data)[2];
      }
      this.loadingPaymentTerms = false;
    },
    (err) => {
      console.log(err);
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.accountsReceivableForm.controls; }

  showAccountsTable() {
    this.submittedForm = true;
    if (this.accountsReceivableForm.invalid) {
        return;
    }
    else {
      this.submitted = true;
      var param_agent_id = this.removeNull(this.accountsReceivableForm.get('agent').value);
      var param_customer_id = this.removeNull(this.accountsReceivableForm.get('customer').value);
      var param_sales_invoice_number = this.removeNull(this.accountsReceivableForm.get('sales_invoice_number').value);
      var param_due_date = this.removeNull(this.accountsReceivableForm.get('due_date').value);
      var param_payment_terms = this.removeNull(this.accountsReceivableForm.get('payment_terms').value);

      var params = new HttpParams()
        .set('agent_id', param_agent_id)
        .set('retailer_id', param_customer_id)
        .set('deadline_date', param_due_date)
        .set('payment_term_id', param_payment_terms)
        .set('purchase_order_id', param_sales_invoice_number)

      // alert(params);
      this.getAccountsReceivableAPI(params);
    }
  }
  hideAccountsTable() {
    this.submitted = false;
    this.reports = [];
    this.accountsReceivableForm.reset();
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
      pdf.save('Accounts_Receivable.pdf'); // Generated PDF
      // this.submitted = false;
    });
  }

  exportToFile(format: string) {
    this.submittedForm = true;
    if (this.accountsReceivableForm.invalid) {
        return;
    }
    else {
      if(format == 'pdf') {
        // this.submitted = true;
        var i = 0;
        var self = this;


        var timer = window.setInterval(function() {
          var data = <HTMLInputElement>document.getElementById('pdfContent');
          //wait until the element comes out
          ++i;
          if(data && !self.loadingPayment) {
            clearInterval(timer);
            self.captureTable(data);

            //var width = <HTMLInputElement>document.getElementById('pdfContent').offsetWidth;
            //alert(width);
          }
        }, 1000);

      }
      else {
        var param_agent_id = this.removeNull(this.accountsReceivableForm.get('agent').value);
        var param_customer_id = this.removeNull(this.accountsReceivableForm.get('customer').value);
        var param_sales_invoice_number = this.removeNull(this.accountsReceivableForm.get('sales_invoice_number').value);
        var param_due_date = this.removeNull(this.accountsReceivableForm.get('due_date').value);
        var param_payment_terms = this.removeNull(this.accountsReceivableForm.get('payment_terms').value);

        var params = new HttpParams()
          .set('agent_id', param_agent_id)
          .set('retailer_id', param_customer_id)
          .set('deadline_date', param_due_date)
          .set('payment_term_id', param_payment_terms)
          .set('purchase_order_id', param_sales_invoice_number)

        this.apiService.get('reports/accounts_receivable/?'+params)
        .subscribe(ret => {
          let data: any[] = JSON.parse(JSON.stringify(ret));
          var code = Object.values(data)[1];
          var r = [];
          if(code == 4005) {
            r = [];
          }
          else {
            r = Object.values(data)[2];
          }

          this.excelService.generateExcel('Accounts Receivable', 'accounts_receivable', r, this.headers, format);
        },
        (err) => {
          console.log(err);
        });

      }
    }
  }
}
