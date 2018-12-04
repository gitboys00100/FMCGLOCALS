import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';

@Component({
  selector: 'app-dscr',
  templateUrl: './dscr.component.html',
  styleUrls: ['./dscr.component.css']
})
export class DscrComponent implements OnInit {
  public dscrReport = [];
  public itemsPerPage: number = 10;

  constructor(private reportsService: ReportsService) { }

  ngOnInit() {
    this.dscrReport = this.reportsService.getDSCRReport();
  }

}
