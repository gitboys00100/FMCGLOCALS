import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { UsersService } from '../users.service';

@Component({
	selector: 'app-agent-tracking',
	templateUrl: './agent-tracking.component.html',
	styleUrls: ['./agent-tracking.component.css']
})
export class AgentTrackingComponent implements OnInit {
	@Input() selectedAgent;
	public agentTrackings: any[] = [];

	public weeks: any[] = [];
	public selectedWeek: any;
	public labelOptions = {
		color: '#000',
		fontFamily: '',
		fontSize: '10px',
		text: '2',
		marginTop: '-10px'
	};
	public assignedRetailers: any[] = [];
	
	constructor(
		private usersService: UsersService
	) { }
	
	ngOnInit() { this.initData(); }


	// ###############################################
	// # PUBLIC
	// ###############################################

	public async initData() {
		this.weeks = [];
		this.getWeeks();
		this.selectedWeek = this.weeks[0];

		this.usersService.getAssignedRetailers(this.selectedAgent)
			.then((res: any) => {
				if (res) this.assignedRetailers = res;
				else this.assignedRetailers = [];

				for (let i = 0; i < this.assignedRetailers.length; i++) {
					let coords = this.assignedRetailers[i].coordinates.split(',');

					this.assignedRetailers[i]['latitude'] = coords[0];
					this.assignedRetailers[i]['longitude'] = coords[1];
				}

				
 			})
			.catch((err) => {
				this.assignedRetailers = [];
			})
	}
	
	public getWeeks() {
		let dateNow = new Date();
		let weekInYearNow = moment(dateNow.getMonth() + 1 + "-" + dateNow.getDate() + "-" + dateNow.getFullYear(), "MMDDYYYY").isoWeeks()
		
		for (let i = 1; i <= weekInYearNow; i++)
			this.weeks.push(this.getDateRangeOfWeek(i, dateNow.getFullYear()));
	}

	public onSelectedWeek($event) {
		this.selectedWeek = this.weeks[$event.target.value];
	}


	private getWeek(varDate) {
		let date = new Date(varDate);

		date.setHours(0, 0, 0, 0);
		date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
		
		let week1 = new Date(date.getFullYear(), 0, 4);
		
		return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
	}
	
  
	// ###############################################
	// # PRIVATE
	// ###############################################


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
