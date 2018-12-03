import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ItineraryService } from '../../../shared/itinerary.services';
import { ApiService } from '../../../shared/api.service';
import { ModalComponent } from '../../core-modal/modal/modal.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as jQuery from 'jquery'; (window as any).jQuery = (window as any).$ = jQuery;
import * as bootstrap from "bootstrap";
import * as moment from 'moment'
import 'fullcalendar';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-agentitinerary-weekly',
  templateUrl: './agentitinerary-weekly.component.html',
  styleUrls: ['./agentitinerary-weekly.component.css']
})
export class AgentitineraryWeeklyComponent implements OnInit {
  itineraryList = [];
  caldata = [];
  calheader = '';
  timestamp = '';
  loading: boolean;
  @Input() itinerary;
  @ViewChild('onSchedulerDetails') onSchedulerDetails: ModalComponent;
  agentname = '';
  daycount = 0;

  date;
  type;
  totalbalance;
  itid;
  retailers;
  aid;
  itaids;
  binarydays;
  constructor(private itService: ItineraryService,private apiService: ApiService) { }

  ngOnInit() {
    //add a condition where date
  	// this.itineraryList = this.itService.getItineraryList();
    this.getItineraryList(this.date, this.type, this.daycount);
    this.caldata;
    this.calheader;
    this.timestamp;
    this.agentname;
    this.totalbalance;
    this.aid;
    this.itaids;


  }

  getItineraryList(date: any, type: any, daycount: any) {
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

                  if(String(entry.days).charAt(i) === "1"){

                      var dayofMonth = this.getDatesPerDay(i,type,daycount);

                      for (var j = 0; j < dayofMonth.length; j++) {
                        var fname = entry.user['first_name'];
                        var lname = entry.user['last_name'];
                        var dataobj = {
                              id: entry.itinerary['id'],
                              title: entry.itinerary['name'],
                              start: this.getFormattedDate(dayofMonth[j]),
                              end: '',
                              retailers: entry.itinerary['retailers'],
                              agent: fname+" "+lname,
                              userid: entry.user['id'],
                              itagentid: entry.id,
                              binary: entry.days,
                        }
                        datas.push(dataobj);
                      }
                  }else{}


              }

            }else{
              console.log("NOT APPLICABLE SCHEDULE: "+JSON.stringify(entry.days).length);
            }
        }// end for
        $('#calendar').fullCalendar( 'destroy' );
        if(type == 'prev'){
          this.callCalendar(datas, date, type);
        }else if(type == 'next'){
          this.callCalendar(datas, date, type);
        }else{
          this.callCalendar(datas, moment(), type);
        }


        this.loading = false;
      },
		(err) => {
			console.log(err);
		});
  }

  public callCalendar(datas: any, theDate: any, type: any){
    let self = this;
    var count = 0;
    var seletedDate = moment(new Date());
    $('#calendar').fullCalendar({
      // editable: true,
      eventLimit: true,
      customButtons: {
        custprev: {
            text: '<',
            click: function() {
                $('#calendar').fullCalendar('prev'); // call method
                var date = $('#calendar').fullCalendar('getDate');

                self.daycount = self.daycount-1;

                self.getItineraryList(date,"prev",self.daycount);
            }
        },custnext: {
            text: '>',
            click: function() {
                $('#calendar').fullCalendar('next'); // call method
                var date = $('#calendar').fullCalendar('getDate');

                self.daycount = self.daycount+1;

                self.getItineraryList(date,"next",self.daycount);
            }
        },custtoday: {
            text: 'Today',
            click: function() {
                $('#calendar').fullCalendar('today');
                var date = $('#calendar').fullCalendar('getDate');

                self.daycount = 0;

                self.getItineraryList(date,"",self.daycount);
            }
        },

      },
      header: {
        left: 'title',
        center: '',
        right: 'custprev, custtoday, custnext'
      },
      selectable: true,
      height: 250,
      eventSources: [
        {
            events: datas,
            color: '#6c757d',     // an option!
            textColor: '#fff' // an option!
        }
      ],
      eventClick: (event) => {
          // console.log(JSON.stringify(event.start))
          var totalarr = [];
          for(let i of event.retailers){
            var total = 0;
              for(let j of i.accounts_receivable){
                total += j.amount;
              }
              totalarr.push(total);
          }
          this.binarydays = event.binary;
          this.retailers = event.retailers;
          this.onSchedulerDetailsOpen(event.retailers,event.title,event.start,event.agent,
            totalarr,event.id,event.userid,event.itagentid);
      },
      defaultDate: theDate,
      defaultView: 'basicWeek',
    });
    // $("#calendar").fullCalendar('removeEvents', 51);
  }

  public onSchedulerDetailsOpen(value: any, header: any, timedate: any,
    agent: any, total: any, id: any, userid: any, itaid: any) {
    this.caldata = value;
    this.calheader = header;
    this.timestamp = timedate;
    this.agentname = agent;
    this.totalbalance = total;
    this.itid = id;
    this.aid = userid;
    this.itaids = itaid;
		this.onSchedulerDetails.onModalOpen();
	}

  public onSchedulerDetailsClose() {
		this.onSchedulerDetails.onModalClose();
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

 getDatesPerDay(day, type, daycount){

   var today;
   var d1;
   var d2;
   var futuremonth = moment().add(daycount, 'w');
   var pastmonth = moment().add(daycount, 'w');
   var dfnm = moment().add(1,'M');
   var dfpm = moment().subtract(1,'M');

   // get all date of schedule
   if(type == 'next'){
       today = moment(futuremonth).startOf('isoWeek').day(day);
   }else if(type == 'prev'){
       today = moment(pastmonth).startOf('isoWeek').day(day);
   }else{
       today = moment().startOf('isoWeek').day(day);
   }
   var listofdays = [];
   listofdays.push(today.toString());

   return listofdays;

 }


}
