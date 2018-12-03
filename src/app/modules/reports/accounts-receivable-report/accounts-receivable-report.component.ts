import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.headers = ["Agent","Selling Date","Sales Invoice #","Due Date","Customer Name","Amount","Payment Terms"];
    this.reports = [
      {
        "agent":"John Doe",
        "selling_date": "11/27/2018",
        "sales_invoice_number": "230913131",
        "due_date":"12/04/2018",
        "customer_name": "ABC Store",
        "amount": "20,000.00",
        "payment_terms": "1 Week"
      }
    ];
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

  // convenience getter for easy access to form fields
  get f() { return this.accountsReceivableForm.controls; }

  showAccountsTable() {
    this.submittedForm = true;
    if (this.accountsReceivableForm.invalid) {
        return;
    }
    else {
      this.submitted = true;
    }
  }
  hideAccountsTable() {
    this.submitted = false;
  }
}
