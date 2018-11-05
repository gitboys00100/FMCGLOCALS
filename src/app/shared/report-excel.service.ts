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
        rowValues[7] = this.checkIfEmpty(data[x].created_date);
        worksheet.addRow(rowValues);
      }
    }
    else if(name == 'agent_reports') {
      if(typeof data != 'undefined') {
        data.forEach(function (d) {
          if(d.items) {
            d.items.forEach(function(i){
              rowValues[1] = d.user.first_name+' '+d.user.last_name;
              rowValues[2] = d.id;
              rowValues[3] = d.timestamp;
              rowValues[4] = i.item.name;
              rowValues[5] = i.item.uom;
              rowValues[6] = i.quantity_requested;
              rowValues[7] = i.quantity_received;
              rowValues[8] = i.quantity_returned;
              rowValues[9] = i.projected_sales;

              worksheet.addRow(rowValues);
            });
          }
        });
      }
    }
    else if(name == 'agent_reports_per_products') {
      console.log(data);
      if(typeof data != 'undefined' || data != null) {
        data.forEach(function (d) {
          if(d.id == agentIndex) {
            if(d.items) {
              d.items.forEach(function(i){
                rowValues[1] = d.user.first_name+' '+d.user.last_name;
                rowValues[2] = i.item.name;
                rowValues[3] = i.item.uom;
                rowValues[4] = i.quantity_requested;
                rowValues[5] = i.quantity_received;
                rowValues[6] = i.quantity_returned;
                rowValues[7] = i.projected_sales;

                worksheet.addRow(rowValues);
              });
            }
          }
        });
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
