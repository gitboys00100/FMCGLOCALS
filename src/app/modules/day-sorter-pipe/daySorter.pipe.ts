import { Pipe, PipeTransform } from '@angular/core';
import { DataCountsService } from '../../shared/data-counts.service';

@Pipe({ name: 'daySorter' })
export class DaySorterPipe implements PipeTransform {

  constructor(private data: DataCountsService) { }
  datacount: number;
  transform(arr: any[], date: number, pipeStatus: number, name?: string): any[] {
    var TempArr = [];

    if(name) {
      if(name == 'reports') {
        for(var x =0;x<arr.length;x++) {
          if(this.getFullDate(parseInt(arr[x].date)) == this.getFullDate(date)) {
            //check if used in other module
            var toPush = {};
            toPush['agent'] = arr[x].agent;
            toPush['transferordernumber'] = arr[x].transferordernumber;
            toPush['date'] = arr[x].date;
            toPush['productname'] = arr[x].productname;
            toPush['uom'] = arr[x].uom;
            toPush['requestedquantity'] = arr[x].requestedquantity;
            toPush['loadinquantity'] = arr[x].loadinquantity;
            toPush['loadoutquantity'] = arr[x].loadoutquantity;
            toPush['estimatedsales'] = arr[x].estimatedsales;
            TempArr.push(toPush);
          }
          this.datacount = TempArr.length;
          this.data.changeReportsCount(this.datacount);
        }

      }
      else if(name == 'retailer') {
        for(var x =0;x<arr.length;x++) {
          if(this.getFullDate(parseInt(arr[x].date)) == this.getFullDate(date)) {
            //check if used in other module
            var toPush = {};
            toPush['retailer_id'] = arr[x].retailer_id;
            toPush['company_id'] = arr[x].company_id;
            toPush['name'] = arr[x].name;
            toPush['agent'] = arr[x].agent;
            toPush['owner'] = arr[x].owner;
            toPush['coordinates'] = arr[x].coordinates;
            toPush['credit_limit'] = arr[x].credit_limit;
            toPush['current_credit'] = arr[x].current_credit;
            toPush['status'] = arr[x].status;
            toPush['image'] = arr[x].image;
            toPush['house_number'] = arr[x].house_number;
            toPush['street_name'] = arr[x].street_name;
            toPush['township'] = arr[x].township;
            toPush['country'] = arr[x].country;
            TempArr.push(toPush);
          }
          this.datacount = TempArr.length;
          this.data.changeReportsCount(this.datacount);
        }

      }
      else if(name == 'announcement') {
        for(var x =0;x<arr.length;x++) {
          if(this.getFullDate(parseInt(arr[x].datecreated)) == this.getFullDate(date)) {
            //check if used in other module
            var toPush = {};
            toPush['announcement_id'] = arr[x].announcement_id;
            toPush['company_id'] = arr[x].company_id;
            toPush['item_id'] = arr[x].item_id;
            toPush['type'] = arr[x].type;
            toPush['title'] = arr[x].title;
            toPush['description'] = arr[x].description;
            toPush['image'] = arr[x].image;
            toPush['start_date'] = arr[x].start_date;
            toPush['end_date'] = arr[x].end_date;
            toPush['datecreated'] = arr[x].datecreated;
            TempArr.push(toPush);
          }
          this.datacount = TempArr.length;
          this.data.changeAnnouncementCount(this.datacount);
        }
      }
    }
    else {
      for(var x =0;x<arr.length;x++) {
        if(this.getFullDate(parseInt(arr[x].receiveddate)) == this.getFullDate(date)) {
          //check if used in other module
          var toPush = {};
          toPush['rid'] = arr[x].rid;
          toPush['agent'] = arr[x].agent;
          toPush['retailer'] = arr[x].retailer;
          toPush['total'] = arr[x].total;
          toPush['amount_paid'] = arr[x].amount_paid;
          toPush['balance'] = arr[x].balance;
          toPush['receiveddate'] = arr[x].receiveddate;
          toPush['status'] = arr[x].status;
          TempArr.push(toPush);
        }
        this.datacount = TempArr.length;

        this.data.changeRemittanceCount(this.datacount);
      }
    }

    return TempArr;
  }
  getFullDate(date: number): string {
    var numSize = date.toString().length;
    var formattedDate;
    if(numSize<= 10) {
      formattedDate = new Date(date * 1000);
    }
    else {
      formattedDate = new Date(date);
    }
    var day = formattedDate.getDate();
    var monthName = new Array();
    monthName[0] = "January";
    monthName[1] = "February";
    monthName[2] = "March";
    monthName[3] = "April";
    monthName[4] = "May";
    monthName[5] = "June";
    monthName[6] = "July";
    monthName[7] = "August";
    monthName[8] = "September";
    monthName[9] = "October";
    monthName[10] = "November";
    monthName[11] = "December";

    var month = monthName[formattedDate.getMonth()];
    var year = formattedDate.getFullYear();
    return month+' '+day+', '+year;
  }
}
