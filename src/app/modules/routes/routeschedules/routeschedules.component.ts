import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePickerService } from '../../../shared/datepicker.service';
import { AssignitineraryComponent } from '../assignitinerary/assignitinerary.component';
import { NewitineraryComponent } from '../newitinerary/newitinerary.component';

@Component({
  selector: 'app-routeschedules',
  templateUrl: './routeschedules.component.html',
  styleUrls: ['./routeschedules.component.css']
})
export class RouteschedulesComponent implements OnInit {
  @ViewChild('onAssignItinerary') onAssignItinerary: AssignitineraryComponent;
  @ViewChild('onNewItinerary') onNewItinerary: NewitineraryComponent;
  datepicked:Date;
  selectedSchedule = 'Daily';
  constructor(private data: DatePickerService) { }

  ngOnInit() {
    this.data.currentDate.subscribe(datepicked => this.datepicked = datepicked)
  }

  newDate(date) {
    var d = new Date("March 16, 2018")
    this.data.changeDate(date);
  }
  onChangeSchedule(scheduleName) {
      this.selectedSchedule = scheduleName;
  }
  onChangeDate(date) {
    this.newDate(date);
  }

  public newItinerary() {
    this.onNewItinerary.itineraryCreateModal.onModalOpen();
  }

  public assignItinerary() {
    this.onAssignItinerary.assignitineraryCreateModal.onModalOpen();
  }
}
