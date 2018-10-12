import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportExcelService } from '../../../shared/report-excel.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-retailer-list-by-distributor',
  templateUrl: './retailer-list-by-distributor.component.html',
  styleUrls: ['./retailer-list-by-distributor.component.css']
})
export class RetailerListByDistributorComponent implements OnInit {
  submitted:boolean = false;

  constructor(private router: Router, private excelService: ReportExcelService) { }
  headers: any[];
  reports: any[];

  ngOnInit() {
    this.headers = ["Distributor", "Retailer", "POS Fmt", "Owner Name", "Region/State",
      "Cluster", "Township", "G/T", "Tier", "Address", "Contact Number", "E-Topup Number", "Multi E-Topup",
      "Retailer Code", "MPOS Id", "Created Date"];
    this.reports = [{"distributor":"Distributor 1", "retailer": "Retailer 1", "pos_fmt": "Grocery Store",
      "owner_name":"Owner 1", "region": "Ayeyarwady Region", "cluster": "Ayeyarwady", "township": "Maubin", "g_t": "", "tier": "",
      "address": "University Avenue, Yangon, Myanmar", "contact_number": "9422496113", "etop": "",
      "multi_etop": "", "retailer_code":"", "mpos_id": "", "created_date": "2018/10/25"},
      {"distributor":"Distributor 2", "retailer": "Retailer 2", "pos_fmt": "Grocery Store",
        "owner_name":"Owner 2", "region": "Yangon Region", "cluster": "Yangon South West", "township": "Kyeemyindaing", "g_t": "", "tier": "",
        "address": "University Avenue, Yangon, Myanmar", "contact_number": "9422496113", "etop": "",
        "multi_etop": "", "retailer_code":"", "mpos_id": "", "created_date": "2018/10/25"}];
  }

  showSalesTable() {
    this.submitted = true;
  }
  hideSalesTable() {
    this.submitted = false;
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
      this.excelService.generateExcel('Retailer List By Distributor', 'retailer_list_by_distributor', r, this.headers, format);
    }
  }
}
