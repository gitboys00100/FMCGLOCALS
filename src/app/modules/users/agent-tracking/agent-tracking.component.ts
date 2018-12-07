import { Component, OnInit, Input, ElementRef } from '@angular/core';
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
	public itineraryLogs: any[] = [];
	public retailers: any[] = [];
	public iconUrl: string = "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_";
	public isMapLoading: boolean = true;
	public daysToggle = {
		monday: true,
		tuesday: true,
		wednesday: true,
		thursday: true,
		friday: true,
		saturday: true,
		sunday: true,
	}
	
	constructor(
		private usersService: UsersService,
		private elRef: ElementRef
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
			.then(async (res: any) => {
				if (res) this.assignedRetailers = res;
				else this.assignedRetailers = [];

				for (let i = 0; i < this.assignedRetailers.length; i++) {
					let coords = [0, 0];

					if (this.assignedRetailers[i].coordinates) 
						coords = this.assignedRetailers[i].coordinates.split(',');
					
					this.assignedRetailers[i]['latitude'] = parseFloat(coords[0].toString());
					this.assignedRetailers[i]['longitude'] = parseFloat(coords[1].toString());
				}

				await this.usersService.getRetailers()
					.then((res: any) => this.retailers = res)
					.catch((err) => this.retailers = []);
 			})
			.catch((err) => {
				this.assignedRetailers = [];
			});
		this.getItineraryLogs();
	}

	public getItineraryLogs() {
		this.isMapLoading = true;
		this.usersService.getItineraryLogs(this.selectedAgent, this.selectedWeek, this.retailers)
			.then((res: any) => {
				this.itineraryLogs = res;
				this.groupLogsByDays();
			})
			.catch((err) => {
				this.itineraryLogs = [];
			})
	}

	public groupLogsByDays() {
		let logsByDay = [[], [], [], [], [], [], []];

		for (let i = 0; i < logsByDay.length; i++) {
			for (let j = 0; j < this.itineraryLogs.length; j++) {
				let day = new Date(this.itineraryLogs[j].date_time).getDay();
				day = day - 1 < 0 ? 6 : day - 1;

				if (day === i) {
					let exists = false;

					for (let k = 0; k < logsByDay[i].length; k++) {
						if (this.itineraryLogs[j].retailer.id === logsByDay[i][k].retailer.id) {
							logsByDay[i][k] = this.itineraryLogs[j];
							exists = true;
						}
					}

					if (!exists) logsByDay[i].push(this.itineraryLogs[j])
				}
			}
		}

		this.itineraryLogs = logsByDay;

		setTimeout(() => {
			this.isMapLoading = false;
		}, 3500);
	}
	
	public getWeeks() {
		let dateNow = new Date();
		let weekInYearNow = moment(dateNow.getMonth() + 1 + "-" + dateNow.getDate() + "-" + dateNow.getFullYear(), "MMDDYYYY").isoWeeks()
		
		for (let i = 1; i <= weekInYearNow; i++)
			this.weeks.push(this.getDateRangeOfWeek(i, dateNow.getFullYear()));
	}

	public onSelectedWeek($event) {
		this.selectedWeek = this.weeks[$event.target.value];
		this.getItineraryLogs();
	}


	private getWeek(varDate) {
		let date = new Date(varDate);

		date.setHours(0, 0, 0, 0);
		date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
		
		let week1 = new Date(date.getFullYear(), 0, 4);
		
		return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
	}

	public onTogglePins(strId) {
			let boxContainer = this.elRef.nativeElement.querySelector('#box-' + strId);
	
			if (this.daysToggle[strId]) {
				if (boxContainer.classList)
					boxContainer.classList.add('disabled');
				else
					boxContainer.className += ' disabled';
			}
			else {
				if (boxContainer.classList)
					boxContainer.classList.remove('disabled');
				else
					boxContainer.className = boxContainer.className.replace(/ *\b\S*?disabled\S*\b/g, '');
			}
			this.daysToggle[strId] = !this.daysToggle[strId];
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
