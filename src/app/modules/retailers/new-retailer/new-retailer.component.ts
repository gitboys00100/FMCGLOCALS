import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../modules/core-modal/modal/modal.component';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';

declare var google: any;

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

interface Location {
  lat: number;
  lng: number;
  viewport?: Object;
  zoom: number;
  address_level_1?: string;
  address_level_2?: string;
  address_country?: string;
  address_zip?: string;
  address_state?: string;
  marker?: Marker;
}

@Component({
  selector: 'app-new-retailer',
  templateUrl: './new-retailer.component.html',
  styleUrls: ['./new-retailer.component.css']
})
export class NewRetailerComponent implements OnInit {
  @ViewChild('newretailerCreateModal') newretailerCreateModal: ModalComponent;
  defaultImgPath: string;
  geocoder: any;
  public location:Location = {
    lat: 51.678418,
    lng: 7.809007,
    marker: {
      lat: 51.678418,
      lng: 7.809007,
      draggable: false
    },
    zoom: 5
  };
  agents: any[];

  @ViewChild(AgmMap) map: AgmMap;

  constructor(public mapsApiLoader: MapsAPILoader,
              private zone: NgZone,
              private wrapper: GoogleMapsAPIWrapper) {
    this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }
  updateOnMap() {
    let full_address:string = this.location.address_level_1 || ""
    if (this.location.address_level_2) full_address = full_address + " " + this.location.address_level_2
    if (this.location.address_state) full_address = full_address + " " + this.location.address_state
    if (this.location.address_country) full_address = full_address + " " + this.location.address_country
    this.findLocation(full_address);
  }
  findLocation(address) {
    if (!this.geocoder) this.geocoder = new google.maps.Geocoder()
    this.geocoder.geocode({
      'address': address
    }, (results, status) => {
      console.log(results);
      if (status == google.maps.GeocoderStatus.OK) {
        for (var i = 0; i < results[0].address_components.length; i++) {
          let types = results[0].address_components[i].types

          if (types.indexOf('locality') != -1) {
            if(this.location.address_level_2 == '') {
              this.location.address_level_2 = results[0].address_components[i].long_name
            }
          }
          if (types.indexOf('country') != -1) {
            if(this.location.address_country == '') {
              this.location.address_country = results[0].address_components[i].long_name
            }
          }
          if (types.indexOf('postal_code') != -1) {
            this.location.address_zip = results[0].address_components[i].long_name
          }
          if (types.indexOf('administrative_area_level_1') != -1) {
            this.location.address_state = results[0].address_components[i].long_name
          }
        }

        if (results[0].geometry.location) {
          this.location.lat = results[0].geometry.location.lat();
          this.location.lng = results[0].geometry.location.lng();
          this.location.marker.lat = results[0].geometry.location.lat();
          this.location.marker.lng = results[0].geometry.location.lng();
          this.location.marker.draggable = false;
          this.location.viewport = results[0].geometry.viewport;
        }

        this.map.triggerResize()
      } else {
        alert("Sorry, this search produced no results.");
      }
    })
  }

  ngOnInit() {
    this.defaultImgPath = '../../../assets/img/default-avatar.jpg';
    this.location.marker.draggable = false;
    this.agents = [{
    "status": "2003",
    "message": "Results found",
    "data": [
      {
        "user_id": 12345,
        "role_id": 2,
        "role": "Van Agent",
        "username": "agentABC",
        "first_name": "John",
        "last_name": "Doe",
        "session": ""
      },
      {
        "user_id": 12346,
        "role_id": 2,
        "role": "Van Agent",
        "username": "agentDEF",
        "first_name": "Agent",
        "last_name": "X",
        "session": ""
      },
      {
        "user_id": 12347,
        "role_id": 2,
        "role": "Van Agent",
        "username": "agentGHI",
        "first_name": "Hanamichi",
        "last_name": "Sakuragi",
        "session": ""
      }
    ],
    "pagination": {
      "offset": 20,
      "limit": 10,
      "total": 1
      }
    }];
  }

  openModal() {
    this.newretailerCreateModal.onModalOpen();
  }
  closeModal() {
    this.newretailerCreateModal.onModalClose();
  }

}
