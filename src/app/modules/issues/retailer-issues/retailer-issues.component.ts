import { Component, OnInit, ViewChild } from '@angular/core';
import { IssuesService } from '../issues.service';
import { ActivatedRoute } from '@angular/router';
import { ViewIssueComponent } from '../view-issue/view-issue.component';

@Component({
	selector: 'app-retailer-issues',
	templateUrl: './retailer-issues.component.html',
	styleUrls: ['./retailer-issues.component.css']
})
export class RetailerIssuesComponent implements OnInit {
	@ViewChild('onViewItemComponent') onViewItemComponent: ViewIssueComponent;

	public itemsPerPage: number = 5;
	public issues: any[] = [];
	public loading: boolean = true;

	public filterSearchQuery: string = '';
  	public searchQuery: string = '';


	public retailer_id: number;
	public retailer: any;

	
	constructor(
		private issuesService: IssuesService,
		private route: ActivatedRoute
	) { }
	
	ngOnInit() {
		this.loading = true;
		this.route.params.subscribe( params => {
			this.retailer_id = params['id'];
		});
		

		this.issuesService.getRetailerById(this.retailer_id)
			.then((res: any) => this.retailer = res )
			.catch(err => this.retailer = null)
		
		this.issuesService.getIssuesByRetailer(this.retailer_id)
			.then((res: any) => {
				this.issues = res;
				this.loading = false;
			})
			.catch(err => {
				this.issues = [];
				this.loading = false;
			})

		console.log(this.retailer);
	}
	
	public onShowCountChange($event) {
		this.itemsPerPage = $event.target.value;
	}
	
	public onFilterSearchChange($event) {
		this.searchQuery = $event.target.value;
		
		if (this.searchQuery === '')
		this.onSearch();
	}
	
	public onSearch() {
		this.filterSearchQuery = this.searchQuery;
	}
	
	public onKeyDown($event) {
		if ($event.keyCode === 13) {
			this.onSearch();
			$event.preventDefault();
		}
	}

	public onViewItem(issue) {
		this.onViewItemComponent.openModal(issue);
	}
	
}
