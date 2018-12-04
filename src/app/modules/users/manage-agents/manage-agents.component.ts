import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../users.service';
import { AgentActivitiesComponent } from '../agent-activities/agent-activities.component';
import { AuthService } from '../../../shared/auth.service';

@Component({
	selector: 'app-manage-agents',
	templateUrl: './manage-agents.component.html',
	styleUrls: ['./manage-agents.component.css']
})
export class ManageAgentsComponent implements OnInit {
	@ViewChild('agentActivitiesComponent') agentActivitiesComponent: AgentActivitiesComponent;
	public loading: boolean = true;
	public agents: any[] = [];
	public selectedAgent: any;
	public componentType: string;

	// NGX Agent Dropdown Variables
	public ngxSelectedAgent: any[] = [];
	public config = {
		displayKey: "fullname",
		search: true,
	};
	private parentUser: any;

	
	// ###############################################
	// # LIFE CYCLE
	// ###############################################
	
	constructor(
		private usersService: UsersService,
		private authService: AuthService
	) { }
	
	ngOnInit() {
		this.parentUser = JSON.parse(this.authService.getUser());
		this.componentType = "agent_activities";
		this.usersService.getAgents()
			.map((res: any) => res.data)
			.subscribe(
				(data: any) => {
					this.agents = data;
					this.agents.map( agent => agent['fullname'] = agent.first_name + ' ' + agent.last_name);

					this.agents.sort((agent1, agent2) => {
						if (agent1.fullname.toLowerCase() > agent2.fullname.toLowerCase()) return 1;
						if (agent1.fullname.toLowerCase() < agent2.fullname.toLowerCase()) return -1;
						return 0;
					});

					console.log(this.parentUser);

					this.agents = this.agents.filter((agent) => {
						if (agent.profile.parent_user)
							return agent.profile.parent_user.id === this.parentUser.id;
						else
							return false;
					});

					this.loading = false;
				},
				(err) => {
					this.agents = [];
					this.loading = false;
				}
			);
	}


	// ###############################################
	// # PUBLIC
	// ###############################################

	public onSelectAgentChange($event) {
		if (this.ngxSelectedAgent.length > 0) {
			this.selectedAgent = this.ngxSelectedAgent[0];
			this.componentType = "agent_activities";
			setTimeout(() => {
				this.agentActivitiesComponent.ngOnInit();
			}, 1000);
		}
		else {
			this.selectedAgent = null;
			this.componentType = "agent_activities";
		}
			
	}
	
	public onTypeChange($event) {
		this.componentType = $event.target.value;
	}
}
