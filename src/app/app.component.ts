import { Component, HostListener, Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  })

export class AppComponent {
  title = 'Future Home of HALO4!';
  userActivity;

  userInactive: Subject<any> = new Subject();
  constructor(private myRoute: Router,) {
    this.setTimeout();
    this.userInactive.subscribe(() => {
      console.log('user has been inactive for a while and will logged out');
      localStorage.clear();
      this.myRoute.navigate(["/login"]);
    });
  }

  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 1200000);
  }
  @HostListener('window:mousemove')
  @HostListener('document:keyup')
  @HostListener('document:click')
  @HostListener('document:wheel')
  refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }

}
