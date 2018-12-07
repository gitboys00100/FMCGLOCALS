import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UsersService } from '../users.service';
import { ViewRetailerModalComponent } from '../view-retailer-modal/view-retailer-modal.component';
import * as moment from 'moment';

@Component({
	selector: 'app-agent-activities',
	templateUrl: './agent-activities.component.html',
	styleUrls: ['./agent-activities.component.css']
})
export class AgentActivitiesComponent implements OnInit {
	@Input() selectedAgent;
	@ViewChild('onViewRetailerComponent') onViewRetailerComponent: ViewRetailerModalComponent;

	public isLoading: boolean = true;

	public itineraryAgents: any[] = [];
	public weeks: any[] = [];
	public selectedWeek: any;
	public itineraryLogs: any;
	public retailers: any[] = [];
	public agentPerformance: any[] = [];
	public retailerCount: number = 0;
	
	constructor(private usersService: UsersService) { }
	
	ngOnInit() {
		this.initData();
	}


	// ###############################################
	// # PUBLIC
	// ###############################################

	public async initData() {
		this.weeks = [];
		this.getWeeks();
		this.agentPerformance = [
			{
				title: "Planned Calls",
				monday: 0,
				tuesday: 0,
				wednesday: 0,
				thursday: 0,
				friday: 0,
				saturday: 0,
				sunday: 0
			},
			{
				title: "Actual Calls",
				monday: 0,
				tuesday: 0,
				wednesday: 0,
				thursday: 0,
				friday: 0,
				saturday: 0,
				sunday: 0
			},
			{
				title: "Productive Calls",
				monday: 0,
				tuesday: 0,
				wednesday: 0,
				thursday: 0,
				friday: 0,
				saturday: 0,
				sunday: 0
			},
			{
				title: "Call Rate",
				monday: 0,
				tuesday: 0,
				wednesday: 0,
				thursday: 0,
				friday: 0,
				saturday: 0,
				sunday: 0
			},
			{
				title: "Hit Rate",
				monday: 0,
				tuesday: 0,
				wednesday: 0,
				thursday: 0,
				friday: 0,
				saturday: 0,
				sunday: 0
			}
		];
		this.selectedWeek = this.weeks[0];

		await this.usersService.getAgentItineraries(this.selectedAgent)
			.then(async (res: any) => {
				if (res) this.itineraryAgents = res;
				else this.itineraryAgents = [];

				if (this.itineraryAgents.length) {
					for (let i = 0; i < this.itineraryAgents.length; i++)
						for (let j = 0; j < this.itineraryAgents[i].length; j++)
							this.retailerCount += 1;
				}


				// temporary - is should get the assigned retailers not all
				await this.usersService.getRetailers()
					.then((res: any) => this.retailers = res)
					.catch((err) => this.retailers = []);

				this.getItineraryLogs();
			})
			.catch((err) => {
				this.getItineraryLogs();
				this.itineraryAgents = [];
				this.isLoading = false;
			})
	}

	public getItineraryLogs() {
		this.usersService.getItineraryLogs(this.selectedAgent, this.selectedWeek, this.retailers)
			.then((res : any[]) => {
				this.itineraryLogs = res;
				
				for (let i = 0; i < this.agentPerformance.length; i++) {
					let actualCalls = [0 ,0 ,0 ,0 ,0 ,0 ,0];

					for (let j = 0; j < this.selectedWeek.dates.length; j++) {
						for (let k = 0; k < this.itineraryLogs.length; k++) {
							let weekDate = this.selectedWeek.dates[j].substring(0, 10);
							let logDate = this.itineraryLogs[k].date_time.substring(0, 10);

							if (weekDate === logDate) {
								actualCalls[j]++;
							}
						}
					}

					// PLANNED CALLS
					if (i === 0) {
						this.agentPerformance[0].monday = this.itineraryAgents[0].length;
						this.agentPerformance[0].tuesday = this.itineraryAgents[1].length;
						this.agentPerformance[0].wednesday = this.itineraryAgents[2].length;
						this.agentPerformance[0].thursday = this.itineraryAgents[3].length;
						this.agentPerformance[0].friday = this.itineraryAgents[4].length;
						this.agentPerformance[0].saturday = this.itineraryAgents[5].length;
						this.agentPerformance[0].sunday = this.itineraryAgents[6].length;
					}

					// ACTUAL CALLS
					if (i === 1) {
						this.agentPerformance[1].monday = actualCalls[0];
						this.agentPerformance[1].tuesday = actualCalls[1];
						this.agentPerformance[1].wednesday = actualCalls[2];
						this.agentPerformance[1].thursday = actualCalls[3];
						this.agentPerformance[1].friday = actualCalls[4];
						this.agentPerformance[1].saturday = actualCalls[5];
						this.agentPerformance[1].sunday = actualCalls[6];
					}

					// PRODUCTIVE CALLS
					if (i === 2) {
						this.agentPerformance[2].monday = actualCalls[0];
						this.agentPerformance[2].tuesday = actualCalls[1];
						this.agentPerformance[2].wednesday = actualCalls[2];
						this.agentPerformance[2].thursday = actualCalls[3];
						this.agentPerformance[2].friday = actualCalls[4];
						this.agentPerformance[2].saturday = actualCalls[5];
						this.agentPerformance[2].sunday = actualCalls[6];
					}

					// CALL RATE
					if (i === 3) {
						this.agentPerformance[3].monday = actualCalls[0] / this.itineraryAgents[0].length ? actualCalls[0] / this.itineraryAgents[0].length : 0;
						this.agentPerformance[3].tuesday = actualCalls[1] / this.itineraryAgents[1].length ? actualCalls[1] / this.itineraryAgents[1].length : 0;
						this.agentPerformance[3].wednesday = actualCalls[2] / this.itineraryAgents[2].length ? actualCalls[2] / this.itineraryAgents[2].length : 0;
						this.agentPerformance[3].thursday = actualCalls[3] / this.itineraryAgents[3].length ? actualCalls[3] / this.itineraryAgents[3].length : 0;
						this.agentPerformance[3].friday = actualCalls[4] / this.itineraryAgents[4].length ? actualCalls[4] / this.itineraryAgents[4].length : 0;
						this.agentPerformance[3].saturday = actualCalls[5] / this.itineraryAgents[5].length ? actualCalls[5] / this.itineraryAgents[5].length : 0;
						this.agentPerformance[3].sunday = actualCalls[6] / this.itineraryAgents[6].length ? actualCalls[6] / this.itineraryAgents[6].length :  0;
					}

					// HIT RATE
					if (i === 4) {
						this.agentPerformance[4].monday = this.agentPerformance[2].monday / actualCalls[0] ? this.agentPerformance[2].monday / actualCalls[0] : 0;
						this.agentPerformance[4].tuesday = this.agentPerformance[2].tuesday / actualCalls[1] ? this.agentPerformance[2].tuesday / actualCalls[1] : 0;
						this.agentPerformance[4].wednesday = this.agentPerformance[2].wednesday / actualCalls[2] ? this.agentPerformance[2].wednesday / actualCalls[2] : 0;
						this.agentPerformance[4].thursday = this.agentPerformance[2].thursday / actualCalls[3] ? this.agentPerformance[2].thursday / actualCalls[3] : 0;
						this.agentPerformance[4].friday = this.agentPerformance[2].friday / actualCalls[4] ? this.agentPerformance[2].friday / actualCalls[4] : 0;
						this.agentPerformance[4].saturday = this.agentPerformance[2].saturday / actualCalls[5] ? this.agentPerformance[2].saturday / actualCalls[5] : 0;
						this.agentPerformance[4].sunday = this.agentPerformance[2].sunday / actualCalls[6] ? this.agentPerformance[2].sunday / actualCalls[6] : 0;
					}
				}

				this.isLoading = false;
			})
			.catch(err => {
				this.itineraryLogs = [];
				this.isLoading = false;
			});
	}

	public getWeeks() {
		let dateNow = new Date();
		let weekInYearNow = moment(dateNow.getMonth() + 1 + "-" + dateNow.getDate() + "-" + dateNow.getFullYear(), "MMDDYYYY").isoWeeks()
		
		for (let i = 1; i <= weekInYearNow; i++)
			this.weeks.push(this.getDateRangeOfWeek(i, dateNow.getFullYear()));
	}

	public onViewRetailer(retailer) {
		this.onViewRetailerComponent.openModal(retailer);
	}

	public onSelectedWeek($event) {
		this.selectedWeek = this.weeks[$event.target.value];
		this.getItineraryLogs();
	}


	// ###############################################
	// # PRIVATE
	// ###############################################

	private getWeek(varDate) {
		let date = new Date(varDate);

		date.setHours(0, 0, 0, 0);
		date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
		
		let week1 = new Date(date.getFullYear(), 0, 4);
		
		return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
	}
	
  
	private getDateRangeOfWeek(weekNo, year){
		let d1 = new Date(''+year+'');
		let numOfdaysPastSinceLastMonday = d1.getDay() - 1;
		let rangeIsFrom;
		let rangeIsTo;

		d1.setDate(d1.getDate() - numOfdaysPastSinceLastMonday);
		d1.setDate(d1.getDate() + (7 * (weekNo - this.getWeek(d1))));

		rangeIsFrom = d1.getFullYear() + "-" + this.getNumPad((d1.getMonth() + 1)) + "-" + this.getNumPad(d1.getDate());
		d1.setDate(d1.getDate() + 6);
		rangeIsTo = d1.getFullYear() + "-" + this.getNumPad((d1.getMonth() + 1)) + "-" + this.getNumPad(d1.getDate());

		let fromDate = new Date(rangeIsFrom);
		let toDate = new Date(rangeIsTo);
		
		let dates = [];
		for(let dt=fromDate; dt<=toDate; dt.setDate(dt.getDate()+1))
			dates.push(new Date(dt).toISOString());
		
		return { start_date: rangeIsFrom, end_date: rangeIsTo, dates: dates };
	}

	private getNumPad(num) {
		let n = num.toString();

		if (n.length === 2) return n;
		return "0" + n;
	}

}
