import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

const httpOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Basic fad0d2b333c5ccb28b4b744d71abe3464cf9be7d' })
};

@Injectable()
export class GetRetailersService {
  constructor(private http: HttpClient) { }
  //constructor() {}
  private retailers = [
    {
    "status": "2001",
    "message":"Success",
    "data": [
      {
        "retailer_id": 1,
        "company_id": 1,
        "name": "Cha's Grocery",
        "agent": "Juan Miguel Severro",
        "owner": "Cha WWww",
        "coordinates": "16.1234567,96.0004",
        "credit_limit": 3000000,
        "current_credit": 3000,
        "status": "ACTIVE",
        "image": "images/retailers/ratailer_4.jpg",
        "house_number": "Unit 4, Random Building",
        "street_name": "Bo Yar Nyunt St",
        "township": "Yangon",
        "country": "Myanmar"
      },
      {
        "retailer_id": 2,
        "company_id": 1,
        "name": "John Doe's HyperMarket",
        "agent": "Juan Ponce Enrile",
        "owner": "Dr. Doom",
        "coordinates": "16.1234567,96.0004",
        "credit_limit": 3000000,
        "current_credit": 3000,
        "status": "For Approval",
        "image": "images/retailers/ratailer_4.jpg",
        "house_number": "Unit 5, Twin Tower",
        "street_name": "Deathe Metal St",
        "township": "Dangon",
        "country": "Myanmar"
      },
      {
        "retailer_id": 3,
        "company_id": 2,
        "name": "Emily's Guitar Shop",
        "agent": "Mike Dirnt",
        "owner": "Billie Joe Armstrong",
        "coordinates": "16.1234567,96.0004",
        "credit_limit": 3000000,
        "current_credit": 3000,
        "status": "For Approval",
        "image": "images/retailers/ratailer_4.jpg",
        "house_number": "no. 34, RockWell",
        "street_name": "Park You St",
        "township": "Manila",
        "country": "Philippines"
      },
      {
        "retailer_id": 4,
        "company_id": 2,
        "name": "Bagoong at Katol Workshop",
        "agent": "Kardo Dalisay",
        "owner": "Pepito Manaloto",
        "coordinates": "16.1234567,96.0004",
        "credit_limit": 3000000,
        "current_credit": 3000,
        "status": "For Approval",
        "image": "images/retailers/ratailer_4.jpg",
        "house_number": "Lot 2245",
        "street_name": "Di Mahagilap St.",
        "township": "Quezon City",
        "country": "Philippines"
      },
      {
        "retailer_id": 5,
        "company_id": 2,
        "name": "Aling Nena's Store",
        "agent": "Ely Buendia",
        "owner": "Johny Lennon",
        "coordinates": "16.1234567,96.0004",
        "credit_limit": 3000000,
        "current_credit": 3000,
        "status": "For Approval",
        "image": "images/retailers/ratailer_4.jpg",
        "house_number": "#65 ",
        "street_name": "Skyway Avenue",
        "township": "Atlantis",
        "country": "Philippines"
      },
      {
        "retailer_id": 6,
        "company_id": 2,
        "name": "Rakista's Laundry Shop",
        "agent": "Boy Kulot",
        "owner": "TinkerBell",
        "coordinates": "16.1234567,96.0004",
        "credit_limit": 3000000,
        "current_credit": 3000,
        "status": "For Approval",
        "image": "images/retailers/ratailer_4.jpg",
        "house_number": "lot 34-34",
        "street_name": "Dr. Sixtio St.",
        "township": "Manila",
        "country": "Philippines"
      }
    ],
    "pagination": {
        "offset": 20,
        "limit": 10,
        "total": 1
      }
    }
  ];

  getRetailerList() {
    return this.retailers.slice();
  }

  //connect to api codes

  public getAllRetailers() {
  //   // will use this.http.get()
     //http://35.198.200.105/api/v1/retailers/
     let baseURL = 'http://35.198.200.105/';
     let apiURL = 'api/v1/companies';
     let authType = 'Basic';
     let user = 'api_user';
     let pass = 'api_password';
     let authToken = btoa(user+':'+pass);
     let header = {
         headers: new HttpHeaders({
             'Authorization': authType+' '+authToken
         })
     }
     header.headers.append('Access-Control-Allow-Origin', '*');
     header.headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS' );
     header.headers.append('Access-Control-Request-Headers', 'Accept, X-Requested-With' );
     header.headers.append('Access-Control-Allow-Credentials', 'true' );
     header.headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, token' );
     return this.http.get(baseURL+apiURL, header);
  }

}
