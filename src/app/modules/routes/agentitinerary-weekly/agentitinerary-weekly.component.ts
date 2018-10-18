import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ItineraryService } from '../../../shared/itinerary.services';
import { ApiService } from '../../../shared/api.service';
import { ModalComponent } from '../../core-modal/modal/modal.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as jQuery from 'jquery'; (window as any).jQuery = (window as any).$ = jQuery;
import * as bootstrap from "bootstrap";
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
  constructor(private itService: ItineraryService,private apiService: ApiService) { }

  ngOnInit() {
    //add a condition where date
  	// this.itineraryList = this.itService.getItineraryList();
    this.getItineraryList();
    this.caldata;
    this.calheader;
    this.timestamp;
  }

  getItineraryList() {
    this.loading = true;
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
            right: 'basicWeek'
          },
          defaultView: 'basicWeek',
          selectable: true,
          height: 300,
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
        this.loading = false;
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
