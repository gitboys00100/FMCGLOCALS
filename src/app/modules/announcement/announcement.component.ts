import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../core-modal/modal/modal.component';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {
  @ViewChild('newAnnouncement') newAnnouncement : ModalComponent;

  constructor() { }

  ngOnInit() {
  }

  openNewAnnouncement() {
    this.newAnnouncement.onModalOpen();
  }
  closeNewAnnouncement() {
    this.newAnnouncement.onModalClose();
  }
}
