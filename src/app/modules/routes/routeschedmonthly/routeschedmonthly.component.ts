import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DatePickerService } from '../../../shared/datepicker.service';
import { ApiService } from '../../../shared/api.service';
import { ModalComponent } from '../../core-modal/modal/modal.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as jQuery from 'jquery'; (window as any).jQuery = (window as any).$ = jQuery;
import * as bootstrap from "bootstrap";
import * as moment from 'moment'
import 'fullcalendar';
import 'rxjs/add/operator/map';
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
  agentname = '';
  loading: boolean;
  @ViewChild('onSchedulerDetails') onSchedulerDetails: ModalComponent;
  constructor(private data: DatePickerService,private apiService: ApiService) { }

  ngOnInit() {
    this.getItineraryList();
    this.caldata;
    this.calheader;
    this.timestamp;
    this.agentname;
  }

  getItineraryList() {
    this.loading = true;
    this.apiService.get('itineraries/agents/')
      .map((res:any) => res.data)
  		.subscribe((data:any[]) => {
        let item: any[] = JSON.parse('['+JSON.stringify(data)+']');
        // console.log("asd: "+JSON.stringify(Object.values(data)));
        this.itineraryList = Object.values(data);

        var datas = [];
        for (let entry of this.itineraryList) {

          var trimday = entry.days;
          var dayL = trimday.length;
          var newDate;

          if(dayL == 7){
            for(var i=0; i<dayL; i++){
              if(i == 0){ // get all day
                if(String(entry.days).charAt(i) === "1"){
                    var dayofMonth = this.getMondays(i);

                    for (var j = 0; j < dayofMonth.length; j++) {

                      var fname = entry.user['first_name'];
                      var lname = entry.user['last_name'];
                      var dataobj = {
                            id: entry.id,
                            title: entry.itinerary['name'],
                            start: this.getFormattedDate(dayofMonth[j]),
                            retailers: entry.itinerary['retailers'],
                            agent: fname+" "+lname,
                      }
                      datas.push(dataobj);
                    }
                }else{}

              }else if(i == 1){

                if(String(entry.days).charAt(i) === "1"){
                    var dayofMonth = this.getMondays(i);

                    for (var j = 0; j < dayofMonth.length; j++) {

                      var fname = entry.user['first_name'];
                      var lname = entry.user['last_name'];
                      var dataobj = {
                            id: entry.id,
                            title: entry.itinerary['name'],
                            start: this.getFormattedDate(dayofMonth[j]),
                            retailers: entry.itinerary['retailers'],
                            agent: fname+" "+lname,
                      }
                      datas.push(dataobj);
                    }
                }else{}

              }else if(i == 2){

                if(String(entry.days).charAt(i) === "1"){
                    var dayofMonth = this.getMondays(i);

                    for (var j = 0; j < dayofMonth.length; j++) {

                      var fname = entry.user['first_name'];
                      var lname = entry.user['last_name'];
                      var dataobj = {
                            id: entry.id,
                            title: entry.itinerary['name'],
                            start: this.getFormattedDate(dayofMonth[j]),
                            retailers: entry.itinerary['retailers'],
                            agent: fname+" "+lname,
                      }
                      datas.push(dataobj);
                    }
                }else{}

              }else if(i == 3){

                if(String(entry.days).charAt(i) === "1"){
                    var dayofMonth = this.getMondays(i);

                    for (var j = 0; j < dayofMonth.length; j++) {

                      var fname = entry.user['first_name'];
                      var lname = entry.user['last_name'];
                      var dataobj = {
                            id: entry.id,
                            title: entry.itinerary['name'],
                            start: this.getFormattedDate(dayofMonth[j]),
                            retailers: entry.itinerary['retailers'],
                            agent: fname+" "+lname,
                      }
                      datas.push(dataobj);
                    }
                }else{}

              }else if(i == 4){

                if(String(entry.days).charAt(i) === "1"){
                    var dayofMonth = this.getMondays(i);

                    for (var j = 0; j < dayofMonth.length; j++) {

                      var fname = entry.user['first_name'];
                      var lname = entry.user['last_name'];
                      var dataobj = {
                            id: entry.id,
                            title: entry.itinerary['name'],
                            start: this.getFormattedDate(dayofMonth[j]),
                            retailers: entry.itinerary['retailers'],
                            agent: fname+" "+lname,
                      }
                      datas.push(dataobj);
                    }
                }else{}

              }else if(i == 5){

                if(String(entry.days).charAt(i) === "1"){
                    var dayofMonth = this.getMondays(i);

                    for (var j = 0; j < dayofMonth.length; j++) {

                      var fname = entry.user['first_name'];
                      var lname = entry.user['last_name'];
                      var dataobj = {
                            id: entry.id,
                            title: entry.itinerary['name'],
                            start: this.getFormattedDate(dayofMonth[j]),
                            retailers: entry.itinerary['retailers'],
                            agent: fname+" "+lname,
                      }
                      datas.push(dataobj);
                    }
                }else{}

              }else if(i == 6){

                if(String(entry.days).charAt(i) === "1"){
                    var dayofMonth = this.getMondays(i);

                    for (var j = 0; j < dayofMonth.length; j++) {
                      console.log(dayofMonth[j]);
                      var fname = entry.user['first_name'];
                      var lname = entry.user['last_name'];
                      var dataobj = {
                            id: entry.id,
                            title: entry.itinerary['name'],
                            start: this.getFormattedDate(dayofMonth[j]),
                            retailers: entry.itinerary['retailers'],
                            agent: fname+" "+lname,
                      }
                      datas.push(dataobj);
                    }
                }else{}

              }
            }

          }else{
            console.log("NOT APPLICABLE SCHEDULE: "+JSON.stringify(entry.days).length);
          }
        }// end for
        this.callCalendar(datas);

        this.loading = false;
      },
		(err) => {
			console.log(err);
		});
  }

  public callCalendar(datas: any){
    $('#calendar').fullCalendar({
      // editable: true,
      eventLimit: true,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: ''
      },
      selectable: true,
      height: 600,
      eventSources: [
        {
            events: datas,
            color: '#6c757d',     // an option!
            textColor: '#fff' // an option!
        }
      ],
      eventClick: (event) => {
          // console.log(JSON.stringify(event.start))
          this.onSchedulerDetailsOpen(event.retailers,event.title,event.start,event.agent);
      },

    });
    // $('.fc-prev-button span').click(function(){
    //    getItineraryList();
    // });
    //
    // $('.fc-next-button span').click(function(){
    //    getItineraryList();
    // });
  }

  public onSchedulerDetailsOpen(value: any, header: any, timedate: any, agent: any) {
    this.caldata = value;
    this.calheader = header;
    this.timestamp = timedate;
    this.agentname = agent;
		this.onSchedulerDetails.onModalOpen();
	}

  public onSchedulerDetailsClose() {
		this.onSchedulerDetails.onModalClose();
	}


  checkedMonth(date, datepick) {
    alert(date+" - "+datepick);
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

 getMondays(day){
   var monday;
   if(day == 0){
    monday = moment()
     .startOf('month')
     .day("Sunday");
   }else if(day == 1){
     monday = moment()
      .startOf('month')
      .day("Monday");
   }else if(day == 2){
     monday = moment()
      .startOf('month')
      .day("Tuesday");
   }else if(day == 3){
     monday = moment()
      .startOf('month')
      .day("Wednesday");
   }else if(day == 4){
     monday = moment()
      .startOf('month')
      .day("Thursday");
   }else if(day == 5){
     monday = moment()
      .startOf('month')
      .day("Friday");
   }else if(day == 6){
     monday = moment()
      .startOf('month')
      .day("Saturday");
   }
   if (monday.date() > 7) monday.add(7,'d');
   var month = monday.month();
   var listofdays = [];
   while(month === monday.month()){
       listofdays.push(monday.toString());
       monday.add(7,'d');

   }
   return listofdays;

 }

}
