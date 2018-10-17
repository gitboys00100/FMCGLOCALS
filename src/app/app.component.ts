import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  })

export class AppComponent {
  title = 'Future Home of HALO4!';

  // @HostListener("window:onbeforeunload",["$event"])
  //   clearLocalStorage(event){
  //     sessionStorage.removeItem("LoggedInUser");
  //     sessionStorage.removeItem("session_data");
  //   }
}
