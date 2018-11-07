import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Observable } from 'rxjs';
import { ModalComponent } from '../../modules/core-modal/modal/modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('onLogoutConfirmation') onLogoutConfirmation: ModalComponent;
  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {

  }

  onLogout(){
      this.onLogoutConfirmation.onModalOpen();
  }

  onYesLogout(){
    this.auth.logout();
    console.log("user logged out.");
    this.onLogoutConfirmation.onModalClose();
  }
  onNotLogout(){
    console.log("user cancelled logged out.");
    this.onLogoutConfirmation.onModalClose();
  }

}
