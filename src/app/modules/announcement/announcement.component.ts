import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../core-modal/modal/modal.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {
  newAnnouncementForm: FormGroup;
  submitted = false;
  @ViewChild('newAnnouncement') newAnnouncement : ModalComponent;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    this.createForm();
  }

  ngOnInit() {
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
    a_announcement['company_id'] = 1;
    a_announcement['item_id'] = 1;
    a_announcement['title'] = a_title;
    a_announcement['description'] = a_description;
    a_announcement['image'] = a_image_name;
    a_announcement['start_date'] = a_from;
    a_announcement['end_date'] = a_end;

    let announcement_json_string = JSON.stringify(a_announcement);
    this.createAnnouncements('announcements/', announcement_json_string);
  }

  createAnnouncements(url: string, load: string) {
    //this.apiService.post(url)
    this.apiService.post(url, load)
    .subscribe((response) => {
      console.log(response['status']); // response status
      console.log(response['body']); // response body (returned response)
      if(response['status'] == 201 && response['statusText'] == 'Created') {
        alert('Success!');
      }
      else {
        alert(response['status']+':'+response['statusText']);
      }
    });
  }

  openNewAnnouncement() {
    this.newAnnouncement.onModalOpen();
  }
  closeNewAnnouncement() {
    this.newAnnouncement.onModalClose();
  }
}
