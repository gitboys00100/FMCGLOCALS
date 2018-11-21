import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get userIsLogged() {
    return this.loggedIn.asObservable();
  }

  constructor(private myRoute: Router) { }

  sendToken(token: string) {
    localStorage.setItem("LoggedInUser", token)
  }
  getToken() {
    return localStorage.getItem("LoggedInUser")
  }
  isLoggednIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem("LoggedInUser");
    localStorage.removeItem("session_data");
    this.myRoute.navigate(["login"]);
  }

}
