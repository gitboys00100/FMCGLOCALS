import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UsersService } from '../users.service';
import { ToastrService } from 'ngx-toastr';
import { ViewRetailerModalComponent } from '../view-retailer-modal/view-retailer-modal.component';
import * as moment from 'moment'

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
	
	constructor(
		private usersService: UsersService,
		private toastr: ToastrService
	) { }
	
	ngOnInit() {
		this.weeks = [];
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

			this.getWeeks();
			this.selectedWeek = this.weeks[this.weeks.length - 1];

			console.log('### WEEKS');
			console.log(this.weeks);
	}

	// ###############################################
	// # PUBLIC
	// ###############################################

	public getWeeks() {
		let dateNow = new Date();
		let weekInYearNow = moment(dateNow.getMonth() + 1 + "-" + dateNow.getDate() + "-" + dateNow.getFullYear(), "MMDDYYYY").isoWeeks()
		
		for (let i = 1; i <= weekInYearNow; i++)
			this.weeks.push(this.getDateRangeOfWeek(i, dateNow.getFullYear()));
	}

	public onViewRetailer(retailer) {
		this.onViewRetailerComponent.openModal(retailer);
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

	public getNumPad(num) {
		let n = num.toString();

		if (n.length === 2) return n;
		return "0" + n;
	}

	public onSelectedWeek($event) {
		this.selectedWeek = this.weeks[$event.target.value];
	}
}
