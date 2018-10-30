import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
      
  }



  onLogout(){
    this.auth.logout();
    console.log("user logged out.")           // {3}
  }

}
