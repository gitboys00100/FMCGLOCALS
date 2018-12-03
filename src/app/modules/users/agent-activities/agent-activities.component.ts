import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-agent-activities',
	templateUrl: './agent-activities.component.html',
	styleUrls: ['./agent-activities.component.css']
})
export class AgentActivitiesComponent implements OnInit {
	@Input() selectedAgent;

	public isLoading: boolean = true;

	public itineraryAgents: any[] = [];
	
	constructor(
		private usersService: UsersService,
		private toastr: ToastrService
	) { }
	
	ngOnInit() {
		this.usersService.getAgentItineraries(this.selectedAgent)
			.then((res: any) => {
				this.isLoading = false;
				if (res) this.itineraryAgents = res;
				else this.itineraryAgents = [];
			})
			.catch((err) => {
				this.isLoading = false;
				this.itineraryAgents = [];
			})
	}
	
}
