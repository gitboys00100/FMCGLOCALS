import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../core-modal/modal/modal.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { Router } from '@angular/router';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {
  newAnnouncementForm: FormGroup;
  submitted = false;
  selectedType: string;
  items: any[];
  @ViewChild('newAnnouncement') newAnnouncement : ModalComponent;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router) {
    this.createForm();
  }

  ngOnInit() {
    this.getItemsFromApi();
  }

  createForm() {
    this.newAnnouncementForm = this.formBuilder.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      from: ['', Validators.required],
      end: ['', Validators.required],
      description: ['', Validators.required],
      image_name: ['', Validators.required]
    });
  }

  addItemToForm() {
    this.newAnnouncementForm.addControl('item', new FormControl('', Validators.required));
  }
  removeItemToForm() {
    this.newAnnouncementForm.removeControl('item');
  }
  // convenience getter for easy access to form fields
  get f() { return this.newAnnouncementForm.controls; }

  submitAnnouncementForm() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.newAnnouncementForm.invalid) {
        return;
    }
    let a_title = this.newAnnouncementForm.get('title').value;
    let a_type = this.newAnnouncementForm.get('type').value;
    let a_from = this.newAnnouncementForm.get('from').value+' 00:00:00';
    let a_end = this.newAnnouncementForm.get('end').value+' 00:00:00';
    let a_description = this.newAnnouncementForm.get('description').value;
    let a_image_name = "images/announcement/"+this.newAnnouncementForm.get('image_name').value.replace(/^.*\\/, "");

    let a_announcement = {};

    if(this.selectedType == 'promos') {
      let item = this.newAnnouncementForm.get('item').value;
      a_announcement['item_id'] = item;
    }

    if(a_type == 'promos') {
      a_announcement['announcement_type'] = 0;
    }
    else if(a_type == 'new_product') {
      a_announcement['announcement_type'] = 1;
    }
    else if(a_type == 'announcement') {
      a_announcement['announcement_type'] = 2;
    }

    a_announcement['company_id'] = environment.company_id;
    a_announcement['title'] = a_title;
    a_announcement['description'] = a_description;
    a_announcement['image'] = a_image_name;
    a_announcement['start_date'] = a_from;
    a_announcement['end_date'] = a_end;
    let announcement_json_string = JSON.stringify(a_announcement);
    this.createAnnouncements('announcements/', announcement_json_string);
  }
  getItemsFromApi() {
    this.apiService.get('items/')
		.subscribe(ret => {
      let data: any[] = JSON.parse('['+JSON.stringify(ret)+']');
      //console.log(Object.values(data));
      //alert(data.message);
      //console.log(data.data);
      console.log(data);
      this.items = Object.values(data);
    },
		(err) => {
			console.log(err);
		});
  }
  createAnnouncements(url: string, load: string) {
    //this.apiService.post(url)
    //console.log(load);
    this.apiService.post(url, load)
    .subscribe((response) => {
      console.log(response['status']); // response status
      console.log(response['body']); // response body (returned response)
      if(response['status'] == 201 && response['statusText'] == 'Created') {
        alert('Success!');
        window.location.reload();
      }
      else {
        alert(response['status']+':'+response['statusText']);
      }
    });
  }

  selectType(value: string) {
    this.selectedType = value;
    if(value == 'promos') {
      this.addItemToForm();
    }
    else if(value == 'new_product') {
      this.addItemToForm();
    }
    else {
      this.removeItemToForm();
    }
  }
  openNewAnnouncement() {
    this.newAnnouncement.onModalOpen();
  }
  closeNewAnnouncement() {
    this.newAnnouncement.onModalClose();
  }
}
