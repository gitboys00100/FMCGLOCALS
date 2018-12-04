import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-agent-tracking',
  templateUrl: './agent-tracking.component.html',
  styleUrls: ['./agent-tracking.component.css']
})
export class AgentTrackingComponent implements OnInit {
  @Input() selectedAgent;

  constructor() { }

  ngOnInit() {
  }

}
