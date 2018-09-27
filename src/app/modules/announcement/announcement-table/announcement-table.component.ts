import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../core-modal/modal/modal.component';
import { DataCountsService } from '../../../shared/data-counts.service';
import { ApiService } from '../../../shared/api.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-announcement-table',
  templateUrl: './announcement-table.component.html',
  styleUrls: ['./announcement-table.component.css']
})
export class AnnouncementTableComponent implements OnInit {
  @ViewChild('announcementDetails') announcementDetails : ModalComponent;
  @ViewChild('deleteConfirmation') deleteConfirmation: ModalComponent;

  order: string = 'type';
  reverse: boolean = false;

  reverseType: boolean = false;
  reverseDateCreated: boolean = false;
  reverseDuration: boolean = false;
  reverseTitle: boolean = false;
  reverseDescription: boolean = false;

  type: boolean = false;
  datecreated: boolean = false;
  duration: boolean = false;
  title: boolean = false;
  description: boolean = false;
  announcements: any[];

  today: number = Date.now();
  selectedDate: number;
  pipeStatus: number = 0;
  datacount: number = 0;
  viewedAnnouncement: any[];
  announcementToDelete: string;

	public itemsPerPage: number = 5;
  public filterSearchQuery: string = '';
  public searchQuery: string = '';

  constructor(private apiService: ApiService, private data: DataCountsService) { }

  ngOnInit() {
    /*
    this.announcements = [{
      "status": "2001",
      "message":"Success",
      "data": [
        {
          "announcement_id": 2,
          "company_id": 1,
          "item_id": 5,
          "type": "Announcements",
          "title": "New Coffee Flavor",
          "description": "We have a new coffee flavor -- Chocolate. ",
          "image": "images/announcement/announcement_1.jpg",
          "start_date": "2018-06-29",
          "end_date": "2018-08-30",
          "datecreated": '1535932800000'
        },
        {
          "announcement_id": 3,
          "company_id": 1,
          "item_id": 5,
          "type": "Announcement",
          "title": "New Drinks Available",
          "description": "We have a new set of drinks. Anyone can enjoy our latest beverages, for discounted and cheap price. Taste the new flavor came from Europe and Japan. ",
          "image": "images/announcement/announcement_1.jpg",
          "start_date": "2018-08-29",
          "end_date": "2018-09-30",
          "datecreated": '1536019200000'
        },
        {
          "announcement_id": 3,
          "company_id": 1,
          "item_id": 5,
          "type": "Promos",
          "title": "Free Beverages",
          "description": "A new beverages for everyone! Brand new and latest beverages. Omported from Europe and Japan. ",
          "image": "images/announcement/announcement_1.jpg",
          "start_date": "2018-08-29",
          "end_date": "2018-09-30",
          "datecreated": '1535932800000'
        },
        {
          "announcement_id": 4,
          "company_id": 1,
          "item_id": 5,
          "type": "Promos",
          "title": "Top tier drinks",
          "description": "Premium drinks --. ",
          "image": "images/announcement/announcement_1.jpg",
          "start_date": "2018-08-23",
          "end_date": "2018-09-24",
          "datecreated": '1535932800000'
        },
        {
          "announcement_id": 5,
          "company_id": 1,
          "item_id": 5,
          "type": "Promos",
          "title": "Extended Freebies",
          "description": "More freebies Available --. ",
          "image": "images/announcement/announcement_1.jpg",
          "start_date": "2018-08-13",
          "end_date": "2018-09-23",
          "datecreated": '1535932800000'
        },
        {
          "announcement_id": 6,
          "company_id": 1,
          "item_id": 5,
          "type": "Announcement",
          "title": "Grand Opening",
          "description": "100 Retailers Grand Opening--. ",
          "image": "images/announcement/announcement_1.jpg",
          "start_date": "2018-08-23",
          "end_date": "2018-09-24",
          "datecreated": '1535932800000'
        },
        {
          "announcement_id": 7,
          "company_id": 1,
          "item_id": 5,
          "type": "Promos",
          "title": "Another Promo",
          "description": "Just Another Promo!--. ",
          "image": "images/announcement/announcement_1.jpg",
          "start_date": "2018-08-31",
          "end_date": "2018-09-02",
          "datecreated": '1535932800000'
        },
        {
          "announcement_id": 8,
          "company_id": 1,
          "item_id": 5,
          "type": "Announcement",
          "title": "Eugene's Raigun Bootcamp",
          "description": "Be the Real and Legit GhostFighter! ",
          "image": "images/announcement/announcement_1.jpg",
          "start_date": "2018-08-31",
          "end_date": "2018-09-02",
          "datecreated": '1535932800000'
        },

      ],
        "pagination": {
        "offset": 20,
        "limit": 10,
        "total": 1
      }
    }];
    */
    this.viewedAnnouncement = [];
    this.selectedDate = this.today;

    //this.data.currentAnnouncementCount.subscribe(datacount => this.datacount = datacount);
    this.data.currentAnnouncementCount.subscribe(datacount => this.datacount = 1);
    this.getAnnouncements();
  }

  onChangeDate(date:any) {
    this.selectedDate = new Date(date).getTime();
  }

  setAnnouncementsOrder(value: string, caret_name: string) {
    if(this.order === value) {
      this.reverse = !this.reverse;

      if(caret_name == 'announcement_type') {
        this.reverseType = !this.reverseType;
      }
      else if(caret_name == 'datecreated') {
        this.reverseDateCreated = !this.reverseDateCreated;
      }
      else if(caret_name == 'duration') {
        this.reverseDuration = !this.reverseDuration;
      }
      else if(caret_name == 'title') {
        this.reverseTitle = !this.reverseTitle;
      }
      else if(caret_name == 'description') {
        this.reverseDescription = !this.reverseDescription;
      }
    }
    this.order = value;
    if(caret_name == 'announcement_type') {
      this.reverse = this.reverseType;
      this.reverseDateCreated = false;
      this.reverseDuration = false;
      this.reverseTitle = false;
      this.reverseDescription = false;
    }
    else if(caret_name == 'datecreated') {
      this.reverse = this.reverseDateCreated;
      this.reverseType = false;
      this.reverseDuration = false;
      this.reverseTitle = false;
      this.reverseDescription = false;
    }
    else if(caret_name == 'duration') {
      this.reverse = this.reverseDuration;
      this.reverseType = false;
      this.reverseDateCreated = false;
      this.reverseTitle = false;
      this.reverseDescription = false;
    }
    else if(caret_name == 'title') {
      this.reverse = this.reverseTitle;
      this.reverseType = false;
      this.reverseDateCreated = false;
      this.reverseDuration = false;
      this.reverseDescription = false;
    }
    else if(caret_name == 'description') {
      this.reverse = this.reverseDescription;
      this.reverseType = false;
      this.reverseDateCreated = false;
      this.reverseDuration = false;
      this.reverseTitle = false;
    }
  }

  removeAnnouncement() {
    alert(this.announcementToDelete);
    this.deleteAnnouncementAPI('announcements/');
  }
  deleteAnnouncementAPI(url: string, params?: string){
    this.apiService.delete(url, params)
		.subscribe((response) => {
      console.log(response['status']); // response status
      console.log(response['body']); // response body (returned response)
      if(response['status'] == 2005 && response['statusText'] == 'Entry deleted') {
        alert('Success!');
      }
      else {
        alert(response['status']+':'+response['statusText']);
      }
    });
  }
  getAnnouncements() {
    this.apiService.get('announcements/')
		.subscribe(ret => {
      let data: any[] = JSON.parse('['+JSON.stringify(ret)+']');
      //console.log(Object.values(data));
      //alert(data.message);
      //console.log(data.data);
      console.log(Object.values(data));
      this.announcements = Object.values(data);
    },
		(err) => {
			console.log(err);
		});
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

  setDateToday() {
    var d = (<HTMLInputElement>document.getElementById("date"));
    var dateString = new Date();
    d.value = dateString.getFullYear()+"-"+("0" + (dateString.getMonth() + 1)).slice(-2)+"-0"+dateString.getDate();
    this.selectedDate = this.today;
  }

  openAnnouncementDetails(title: string, description: string, image: string, start_date: string, end_date: string) {
    this.viewedAnnouncement = [{"title":title,"description":description,"image":image,"start_date":start_date,"end_date":end_date}];
    console.log(this.viewedAnnouncement);
    this.announcementDetails.onModalOpen();
  }
  closeAnnouncementDetails() {
    this.announcementDetails.onModalClose();
  }
  convertDate(datestring: string) {
    let newDate = new Date(datestring);
    return newDate;
  }
  closeDeleteConfirmation() {
    this.deleteConfirmation.onModalClose();
  }
  openDeleteConfirmation(id: string) {
    this.announcementToDelete = id;
    this.deleteConfirmation.onModalOpen();
  }
}
