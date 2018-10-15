import { Component, OnInit, Input } from '@angular/core';
import { ItineraryService } from '../../../shared/itinerary.services';

@Component({
  selector: 'app-agentitinerary-weekly',
  templateUrl: './agentitinerary-weekly.component.html',
  styleUrls: ['./agentitinerary-weekly.component.css']
})
export class AgentitineraryWeeklyComponent implements OnInit {
  itineraryList = [];

  @Input() itinerary;
  constructor(private itService: ItineraryService) { }

  ngOnInit() {
    //add a condition where date
  	this.itineraryList = this.itService.getItineraryList();
  }

}
