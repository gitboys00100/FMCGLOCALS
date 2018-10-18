import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ReportExcelService {

  constructor() { }

  checkIfEmpty(val: string) {
    var value = '';
    if(val != null) {
      value = val;
    }
    return value;
  }
  generateExcel(title: string, name: string, data: any[], headers: any[], format: string, agentIndex?: string, company?: string) {
    //Create workbook and worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(title);
    //Add Row and formatting
    let titleRow = worksheet.addRow([title]);

    var rowValues = [];
    for(var x=0;x<headers.length;x++) {
      //console.log(headers[x]);
      var col = worksheet.getColumn(x+1);
      col.header = headers[x];
      col.key = headers[x].toString().toLowerCase();
      col.width = 15;
    }
    if(name == 'sales_report') {
      for(var x=0;x<data.length;x++) {
        rowValues[1] = data[x].region;
        rowValues[2] = data[x].cluster;
        rowValues[3] = data[x].township;
        rowValues[4] = data[x].distributor;
        rowValues[5] = data[x].retailer;
        rowValues[6] = data[x].sku;
        let arr = data[x].sales;
        for(var y=0;y<arr.length;y++) {
          rowValues[y+7] = arr[y];
        }
        worksheet.addRow(rowValues);
      }
    }
    else if(name == 'retailer_inventory_status') {
      for(var x=0;x<data.length;x++) {
        rowValues[1] = data[x].region;
        rowValues[2] = data[x].cluster;
        rowValues[3] = data[x].township;
        rowValues[4] = data[x].distributor;
        rowValues[5] = data[x].retailer;
        rowValues[6] = data[x].sku;
        rowValues[7] = data[x].inventory;
        worksheet.addRow(rowValues);
      }
    }
    else if(name == 'retailer_list_by_distributor') {
      
      for(var x=0;x<data.length;x++) {
        rowValues[1] = this.checkIfEmpty(data[x].company);
        rowValues[2] = this.checkIfEmpty(data[x].name);
        rowValues[3] = this.checkIfEmpty(data[x].owner);
        rowValues[4] = this.checkIfEmpty(data[x].house_number)+' '+this.checkIfEmpty(data[x].street_name);
        rowValues[5] = this.checkIfEmpty(data[x].township);
        rowValues[6] = this.checkIfEmpty(data[x].country);
        worksheet.addRow(rowValues);
      }
    }
    else if(name == 'agent_reports') {
      for(var x=0;x<data.length;x++) {
        for(var y=0;y<data[x].products.length;y++) {
          rowValues[1] = data[x].agent;
          rowValues[2] = data[x].transferordernumber;
          rowValues[3] = data[x].date;
          rowValues[4] = data[x].products[y].productname;
          rowValues[5] = data[x].products[y].uom;
          rowValues[6] = data[x].products[y].requestedquantity;
          rowValues[7] = data[x].products[y].loadinquantity;
          rowValues[8] = data[x].products[y].loadoutquantity;
          rowValues[9] = data[x].products[y].estimatedsales;

          worksheet.addRow(rowValues);
        }
      }
    }
    else if(name == 'agent_reports_per_products') {
      for(var x=0;x<data.length;x++) {
        if(data[x].id == agentIndex) {
          for(var y=0;y<data[x].products.length;y++) {
            rowValues[1] = data[x].agent;
            rowValues[2] = data[x].products[y].productname;
            rowValues[3] = data[x].products[y].uom;
            rowValues[4] = data[x].products[y].requestedquantity;
            rowValues[5] = data[x].products[y].loadinquantity;
            rowValues[6] = data[x].products[y].loadoutquantity;
            rowValues[7] = data[x].products[y].estimatedsales;

            worksheet.addRow(rowValues);
          }
        }
      }
    }

    //console.log(data);

    //Generate Excel File with given name


    if(format == 'excel') {
      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, title+'.xlsx');
      })
    }
    else if(format == 'csv') {
      workbook.csv.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, title+'.csv');
      })
    }

  }
}
