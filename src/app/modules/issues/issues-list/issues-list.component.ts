import { Component, OnInit, ViewChild } from '@angular/core';
import { IssuesService } from '../issues.service';
import { ViewIssueComponent } from '../view-issue/view-issue.component';

@Component({
	selector: 'app-issues-list',
	templateUrl: './issues-list.component.html',
	styleUrls: ['./issues-list.component.css']
})
export class IssuesListComponent implements OnInit {
	@ViewChild('onViewItemComponent') onViewItemComponent: ViewIssueComponent;

	public itemsPerPage: number = 5;
	public issues: any[] = [];
	public loading: boolean = true;

	public filterSearchQuery: string = '';
  	public searchQuery: string = '';
	
	constructor(private issuesService: IssuesService) { }
	
	ngOnInit() {
		this.loading = true;
		this.issuesService.getIssues()
		.then((res: any) => {
			this.issues = res;
			this.loading = false;
		})
		.catch(err => {
			this.issues = [];
			this.loading = false;
		})
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
