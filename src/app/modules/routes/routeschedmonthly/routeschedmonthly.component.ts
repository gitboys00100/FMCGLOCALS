import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePickerService } from '../../../shared/datepicker.service';
import * as jQuery from 'jquery';
(window as any).jQuery = (window as any).$ = jQuery;
import 'fullcalendar';
import { ApiService } from '../../../shared/api.service';
import 'rxjs/add/operator/map';
import * as bootstrap from "bootstrap";
import { ModalComponent } from '../../core-modal/modal/modal.component';
@Component({
  selector: 'app-routeschedmonthly',
  templateUrl: './routeschedmonthly.component.html',
  styleUrls: ['./routeschedmonthly.component.css']
})
export class RouteschedmonthlyComponent implements OnInit {
  agents: any[];
  agents2: any[];
  datepicked:Date;
  calendarOptions: Object;
  itineraryList = [];
  caldata = [];
  calheader = '';
  timestamp = '';
  @ViewChild('onSchedulerDetails') onSchedulerDetails: ModalComponent;
  constructor(private data: DatePickerService,private apiService: ApiService) { }

  ngOnInit() {
    this.getItineraryList();
    this.caldata;
    this.calheader;
    this.timestamp;
  }

  getItineraryList() {
    this.apiService.get('itineraries/')
      .map((res:any) => res.data)
  		.subscribe((data:any[]) => {
        let item: any[] = JSON.parse('['+JSON.stringify(data)+']');
        //console.log("asd: "+JSON.stringify(Object.values(data)));
        this.itineraryList = Object.values(data);


        var datas = [];
        for (let entry of this.itineraryList) {
          var newDate = this.getFormattedDate(entry.timestamp);
          var dataobj = {
                id: entry.id,
                title: entry.name,
                start: newDate,
                retailers: entry.retailers,
          }
          datas.push(dataobj);
        }// end for

        $('#calendar').fullCalendar({
          // editable: true,
          eventLimit: true,
          header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month'
          },
          selectable: true,
          eventSources: [
            {
                events: datas,
                color: '#6c757d',     // an option!
                textColor: '#fff' // an option!
            }
          ],
          eventClick: (event) => {
              // console.log(JSON.stringify(event.start))
              this.onSchedulerDetailsOpen(event.retailers,event.title,event.start);
          }

        });

      },
		(err) => {
			console.log(err);
		});
  }

  public onSchedulerDetailsOpen(value: any, header: any, timedate: any) {
    this.caldata = value;
    this.calheader = header;
    this.timestamp = timedate;
		this.onSchedulerDetails.onModalOpen();
	}

  public onSchedulerDetailsClose() {
		this.onSchedulerDetails.onModalClose();
	}


  checkedMonth(date, datepick) {
    datepick = new Date(datepick);
    var m = datepick.getMonth();
    var hasMonth = false;
    date.forEach(function(value) {
      var d = new Date(+value);
      if(m === d.getMonth()) {
        hasMonth = true;
      }
    });
    return !hasMonth;
  }

  getFormattedDate(date) {
   var start = new Date(date);
   var year = start.getFullYear();

   var month = (1 + start.getMonth()).toString();
   month = month.length > 1 ? month : '0' + month;

   var day = start.getDate().toString();
   day = day.length > 1 ? day : '0' + day;

   return year + '-' + month + '-' + day;
 }

}
