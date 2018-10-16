import { Component, OnInit } from '@angular/core';
import { DatePickerService } from '../../../shared/datepicker.service';

@Component({
  selector: 'app-routeschedmonthly',
  templateUrl: './routeschedmonthly.component.html',
  styleUrls: ['./routeschedmonthly.component.css']
})
export class RouteschedmonthlyComponent implements OnInit {
  agents: any[];
  agents2: any[];
  datepicked:Date;
  constructor(private data: DatePickerService) { }

  ngOnInit() {
    this.agents = [{"agent":"agent_1", "date":"2018-07-23"},{"agent":"agent_2", "date":"2018-07-22"},{"agent":"agent_4", "date":"2018-07-23"},{"agent":"agent_3", "date":"2018-07-20"}];
    this.agents2 = [{
       "status":"2001",
       "message":"Success",
       "data":[
        {
         "name":"Agent ABC Monday Route",
         "agent": "Juan Dela Cruz",
         "date":[
           "1536624000000",
           "1536364800000",
           "1536192000000"
         ],
         "retailers": [
          {
           "retailer_id": 1,
           "retailer_name": "Yangon123 Store",
           "owner": "Hii Hello",
           "coordinates": "16.1234567,96.0004",
           "credit_limit": 1000000,
           "current_credit": 250000,
           "status": "Active",
           "image": "mobile/images/213131231.jpg",
           "house_number": "12",
           "street_name": "Hii Street",
           "township": "Yangon",
           "country": "Myanmar"
          },
          {
           "retailer_id": 6,
           "retailer_name": "Myan Store",
           "owner": "Myan Marrr",
           "coordinates": "16.10,95.0004",
           "credit_limit": 500000,
           "current_credit": 0,
           "status": "Active",
           "image": "mobile/images/34324442.jpg",
           "house_number": "4",
           "street_name": "Cat Street",
           "township": "Yangon",
           "country": "Myanmar"
          },
          {
           "retailer_id": 9,
           "retailer_name": "MM Store",
           "owner": "Mu Nin",
           "coordinates": "16.34,95.0004",
           "credit_limit": 2000000,
           "current_credit": 150000,
           "status": "Active",
           "image": "mobile/images/9890384024.jpg",
           "house_number": "4",
           "street_name": "Dog Street",
           "township": "Yangon",
           "country": "Myanmar"
          }
         ]
        },
        {
         "name":"Agent Test",
         "agent": "Juan Dela Cruz",
         "date":[
           "1536624000000"
         ],
         "retailers": [
          {
           "retailer_id": 1,
           "retailer_name": "Yangon123 Store",
           "owner": "Hii Hello",
           "coordinates": "16.1234567,96.0004",
           "credit_limit": 1000000,
           "current_credit": 250000,
           "status": "Active",
           "image": "mobile/images/213131231.jpg",
           "house_number": "12",
           "street_name": "Hii Street",
           "township": "Yangon",
           "country": "Myanmar"
          },
          {
           "retailer_id": 6,
           "retailer_name": "Myan Store",
           "owner": "Myan Marrr",
           "coordinates": "16.10,95.0004",
           "credit_limit": 500000,
           "current_credit": 0,
           "status": "Active",
           "image": "mobile/images/34324442.jpg",
           "house_number": "4",
           "street_name": "Cat Street",
           "township": "Yangon",
           "country": "Myanmar"
          },
          {
           "retailer_id": 9,
           "retailer_name": "MM Store",
           "owner": "Mu Nin",
           "coordinates": "16.34,95.0004",
           "credit_limit": 2000000,
           "current_credit": 150000,
           "status": "Active",
           "image": "mobile/images/9890384024.jpg",
           "house_number": "4",
           "street_name": "Dog Street",
           "township": "Yangon",
           "country": "Myanmar"
          }
         ]
        },
        {
         "name":"Agent ABC Wednesday Route",
         "agent": "John Doe",
         "date": [
           "1536192000000"
         ],
         "retailers": [
          {
           "retailer_id": 4,
           "retailer_name": "Hmm Store",
           "owner": "Hmm Hii",
           "coordinates": "15.9990,96.01",
           "credit_limit": 1000000,
           "current_credit": 0,
           "status": "Active",
           "image": "mobile/images/83498237423.jpg",
           "house_number": "1",
           "street_name": "Hmm Street",
           "township": "Yangon",
           "country": "Myanmar"
          },
          {
           "retailer_id": 5,
           "retailer_name": "G Store",
           "owner": "G El",
           "coordinates": "16.5,95.55",
           "credit_limit": 500000,
           "current_credit": 0,
           "status": "Active",
           "image": "mobile/images/32424234.jpg",
           "house_number": "7",
           "street_name": "Cat Street",
           "township": "Yangon",
           "country": "Myanmar"
          }
         ]
        }
       ],
       "pagination": {
        "offset":20,
        "limit":10,
        "total":1
       }
    }];
    this.data.currentDate.subscribe(datepicked => this.datepicked = datepicked)

  }
  checkedMonth(date, datepick) {
    datepick = new Date(datepick);
    var m = datepick.getMonth();
    var hasMonth = false;
    date.forEach(function(value) {
      var d = new Date(+value);
      if(m === d.getMonth()) {
        hasMonth = true;
      }
    });
    return !hasMonth;
  }

}
