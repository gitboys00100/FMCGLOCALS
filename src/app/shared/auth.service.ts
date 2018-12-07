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
	
	public sendToken(token: string) {
		localStorage.setItem("LoggedInUser", token)
	}

	public getToken() {
		return localStorage.getItem("LoggedInUser")
	}

	public isLoggednIn() {
		return this.getToken() !== null;
	}

	public getUser() {
		return localStorage.getItem("user_info");
	}
	
	public logout() {
		localStorage.removeItem("LoggedInUser");
		localStorage.removeItem("session_data");
		localStorage.removeItem("user_info");
		this.myRoute.navigate(["login"]);
	}
	
}
