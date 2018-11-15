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
        if(typeof arr != 'undefined') {
          arr.forEach(function (arrayItem) {
            var time = new Date(arrayItem.timestamp).getTime();
            if(isNaN(time)) {
              time = 0;
            }
            if((this.getFullDate(time) == this.getFullDate(date)) || (isNaN(date))) {
              //check if used in other module
              var toPush = {};
              toPush['id'] = arrayItem.id;
              var tempUser = {};
              tempUser['first_name'] = arrayItem.user.first_name;
              tempUser['last_name'] = arrayItem.user.last_name;
              tempUser['username'] = arrayItem.user.username;
              toPush['user'] = tempUser;
              toPush['timestamp'] = arrayItem.timestamp;
              toPush['user_id'] = arrayItem.user_id;
              var tempItem = [];
              if(arrayItem.items) {
                arrayItem.items.forEach(function(item){
                  var itemToPush = [];
                  itemToPush['id'] = item.id;
                  var itemInfo = {};
                  itemInfo['name'] = item.item.name;
                  itemInfo['uom'] = item.item.uom;
                  itemToPush['item'] = itemInfo;
                  itemToPush['projected_sales'] = item.projected_sales;
                  itemToPush['quantity_approved'] = item.quantity_approved;
                  itemToPush['quantity_on_hand'] = item.quantity_on_hand;
                  itemToPush['quantity_received'] = item.quantity_received;
                  itemToPush['quantity_requested'] = item.quantity_requested;
                  itemToPush['quantity_returned'] = item.quantity_returned;
                  tempItem.push(itemToPush);
                });
              }
              toPush['items'] = tempItem;
              TempArr.push(toPush);
            }
            this.datacount = TempArr.length;
            this.data.changeReportsCount(this.datacount);
          }, this);
        }
        /*
        for(var x =0;x<arr.length;x++) {
          var time;

          if(!isNaN(new Date(arr[x].timestamp).getTime())) {
            time = new Date(arr[x].timestamp).getTime();
          }
          else {
            time = '';
          }

          if(this.getFullDate(parseInt(time)) == this.getFullDate(date)) {
            //check if used in other module
            var toPush = {};
            toPush['id'] = arr[x].id;
            TempArr.push(toPush);
          }
          this.datacount = TempArr.length;
          this.data.changeReportsCount(this.datacount);
        }
*/
      }
      else if(name == 'retailer_list_by_distributor') {
        if(typeof arr != 'undefined') {
          arr.forEach(function (arrayItem) {
            var time = new Date(arrayItem.timestamp).getTime();
            if(isNaN(time)) {
              time = 0;
            }
            if(this.getFullDate(time) == this.getFullDate(date)) {
              //check if used in other modul
              var toPush = {};
              toPush['id'] = arrayItem.id;
              toPush['company_id'] = arrayItem.company_id;
              toPush['name'] = arrayItem.name;
              toPush['owner'] = arrayItem.owner;
              toPush['house_number'] = arrayItem.house_number;
              toPush['street_name'] = arrayItem.street_name;
              toPush['township'] = arrayItem.township;
              toPush['country'] = arrayItem.country;
              toPush['timestamp'] = arrayItem.timestamp;
              TempArr.push(toPush);
            }
            //console.log(TempArr);
            this.datacount = TempArr.length;
            this.data.changeReportsCount(this.datacount);
          }, this);
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
            toPush['id'] = arr[x].announcement_id;
            toPush['company_id'] = arr[x].company_id;
            toPush['item_name'] = arr[x].item_id;
            toPush['announcement_type'] = arr[x].type;
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
      if(typeof arr != 'undefined') {
        arr.forEach(function (arrayItem) {
          var time = new Date(arrayItem.timestamp).getTime();
          if(isNaN(time)) {
            time = 0;
          }
          if(this.getFullDate(time) == this.getFullDate(date)) {
            //check if used in other modul
            var toPush = {};
            toPush['id'] = arrayItem.id;
            toPush['total_amount'] = arrayItem.total_amount;
            toPush['agent'] = arrayItem.agent;
            toPush['timestamp'] = arrayItem.timestamp;
            toPush['is_received'] = arrayItem.is_received;
            toPush['denomination'] = arrayItem.denomination;
            TempArr.push(toPush);
          }
          //console.log(TempArr);
          this.datacount = TempArr.length;
          this.data.changeRemittanceReceivableCount(this.datacount);
        }, this);
      }

      // for(var x =0;x<arr.length;x++) {
      //   if(this.getFullDate(parseInt(arr[x].timestamp)) == this.getFullDate(date)) {
      //     //check if used in other module
      //     var toPush = {};
      //     toPush['total_amount'] = arr[x].total_amount;
      //     TempArr.push(toPush);
      //   }
      //   this.datacount = TempArr.length;
      //
      //   this.data.changeRemittanceCount(this.datacount);
      // }
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
