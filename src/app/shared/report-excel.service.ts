import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { getDate } from 'date-fns';

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
  getDate(date) {
    return getDate(date);
  }
  getMonthValue(monthsName: any[], index: number) {
    var m = monthsName[index];
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
  generateExcel(title: string, name: string, data: any[], headers: any[], format: string, agentIndex?: string, company?: string, selected_date_range?: any[], sched?: string, monthsName?: any[]) {
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
      var regionRange = [];
      var currentRegion = '';
      var prevRegion = '';
      var nextRegion = '';
      var start, end;

      var clusterRange = [];
      var currentCluster = '';
      var prevCluster = '';
      var nextCluster = '';
      var startCluster, endCluster;

      var townshipRange = [];
      var currentTownship = '';
      var prevTownship = '';
      var nextTownship = '';
      var startTownship, endTownship;

      var agentRange = [];
      var currentAgent = '';
      var prevAgent = '';
      var nextAgent = '';
      var startAgent, endAgent;

      var retailerRange = [];
      var currentRetailer = '';
      var prevRetailer = '';
      var nextRetailer = '';
      var startRetailer, endRetailer;

      for(var x=0;x<data.length;x++) {
        rowValues[1] = data[x].region;
        rowValues[2] = data[x].cluster;
        rowValues[3] = data[x].township;
        rowValues[4] = data[x].agent;
        rowValues[5] = data[x].retailer;
        rowValues[6] = data[x].item;
        if(sched == 'daily') {
          var counter = 1;
          selected_date_range.forEach(function(s){
            if(this.getDate(s) == data[x].day) {
              rowValues[counter+6] = data[x].sales;
            }
            else {
              rowValues[counter+6] = 0;
            }
            counter += 1;
          }, this);
        }
        else if(sched == 'weekly') {
          var l = 4*monthsName.length;
          var monthCounter = 0;
          var weekCounter = 1;
          var counter = 1;
          for(var c = 1;c<=l;c++) {
            if(weekCounter > 4) {
              weekCounter = 1;
              monthCounter += 1;
            }
            if((data[x].week != c) || (data[x].month != this.getMonthValue(monthsName, monthCounter))) {
              rowValues[counter+6] = 0
            }
            else {
              rowValues[counter+6] = data[x].sales;
            }
            weekCounter += 1;
            counter += 1;
          }
        }
        else if(sched == 'monthly') {
          rowValues[7] = data[x].sales;
        }
        worksheet.addRow(rowValues);

        //merge
        currentRegion = data[x].region;
        var isLastLoop = false;
        if(x+1 != data.length) {
          nextRegion = data[x+1].region;
        }
        else {
          // nextRegion = data[x].region;
          isLastLoop = true;
        }
        if(prevRegion != currentRegion) {
          regionRange.push(x+2);
          start = (x+2);
        }
        else {
          //merge
          // worksheet.mergeCells('A'+(x+1)':A'+(x+2));
          if((nextRegion != currentRegion) || (isLastLoop)) {
            end = (x+2);
            console.log('A'+start+':A'+end);
            worksheet.mergeCells('A'+start+':A'+end);
          }
        }
        prevRegion = data[x].region;
        //--------------------------//
        //merge
        currentCluster = data[x].cluster;
        var isLastLoopCluster = false;
        if(x+1 != data.length) {
          nextCluster = data[x+1].cluster;
        }
        else {
          // nextRegion = data[x].region;
          isLastLoopCluster = true;
        }
        if(prevCluster != currentCluster) {
          clusterRange.push(x+2);
          startCluster = (x+2);
        }
        else {
          //merge
          // worksheet.mergeCells('A'+(x+1)':A'+(x+2));
          if((nextCluster != currentCluster) || (isLastLoopCluster)) {
            endCluster = (x+2);
            console.log('B'+startCluster+':B'+endCluster);
            worksheet.mergeCells('B'+startCluster+':B'+endCluster);
          }
        }
        prevCluster = data[x].cluster;
        //--------------------------//
        //merge
        currentTownship = data[x].township;
        var isLastLoopTownship = false;
        if(x+1 != data.length) {
          nextTownship = data[x+1].township;
        }
        else {
          // nextRegion = data[x].region;
          isLastLoopTownship = true;
        }
        if(prevTownship != currentTownship) {
          townshipRange.push(x+2);
          startTownship = (x+2);
        }
        else {
          //merge
          // worksheet.mergeCells('A'+(x+1)':A'+(x+2));
          if((nextTownship != currentTownship) || (isLastLoopTownship)) {
            endTownship = (x+2);
            // console.log('B'+startTownship+':B'+endTownship);
            worksheet.mergeCells('C'+startTownship+':C'+endTownship);
          }
        }
        prevTownship = data[x].township;
        //--------------------------//
        //merge
        currentAgent = data[x].agent;
        var isLastLoopAgent = false;
        if(x+1 != data.length) {
          nextAgent = data[x+1].agent;
        }
        else {
          // nextRegion = data[x].region;
          isLastLoopAgent = true;
        }
        if(prevAgent != currentAgent) {
          agentRange.push(x+2);
          startAgent = (x+2);
        }
        else {
          //merge
          // worksheet.mergeCells('A'+(x+1)':A'+(x+2));
          if((nextAgent != currentAgent) || (isLastLoopAgent)) {
            endAgent = (x+2);
            // console.log('B'+startTownship+':B'+endTownship);
            worksheet.mergeCells('D'+startAgent+':D'+endAgent);
          }
        }
        prevAgent = data[x].agent;

        //--------------------------//
        //merge
        currentRetailer = data[x].retailer;
        var isLastLoopRetailer = false;
        if(x+1 != data.length) {
          nextRetailer = data[x+1].retailer;
        }
        else {
          // nextRegion = data[x].region;
          isLastLoopRetailer = true;
        }
        if(prevRetailer != currentRetailer) {
          retailerRange.push(x+2);
          startRetailer = (x+2);
        }
        else {
          //merge
          // worksheet.mergeCells('A'+(x+1)':A'+(x+2));
          if((nextRetailer != currentRetailer) || (isLastLoopRetailer)) {
            endRetailer = (x+2);
            // console.log('B'+startTownship+':B'+endTownship);
            worksheet.mergeCells('E'+startRetailer+':E'+endRetailer);
          }
        }
        prevRetailer = data[x].retailer;


    }

    for(var x=0;x<data.length;x++) {
      worksheet.getCell('A'+(x+1)).alignment = { vertical: 'middle' };
      worksheet.getCell('B'+(x+1)).alignment = { vertical: 'middle' };
      worksheet.getCell('C'+(x+1)).alignment = { vertical: 'middle' };
      worksheet.getCell('D'+(x+1)).alignment = { vertical: 'middle' };
      worksheet.getCell('E'+(x+1)).alignment = { vertical: 'middle' };
    }
    // worksheet.verticalCentered = true;
      // console.log('region_range');
      // console.log(regionRange);
    }
    else if(name == 'retailer_inventory_status') {
      for(var x=0;x<data.length;x++) {
        rowValues[1] = data[x].region;
        rowValues[2] = data[x].cluster;
        rowValues[3] = data[x].township;
        rowValues[4] = data[x].agent_name;
        rowValues[5] = data[x].retailer_name;
        rowValues[6] = data[x].sku;
        rowValues[7] = data[x].quantity;
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
