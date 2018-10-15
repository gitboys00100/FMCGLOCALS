import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { Md5HasherService } from '../../shared/md5-hasher.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // @ViewChild('useript') userinput: ElementRef;
  // @ViewChild('passipt') passinput: ElementRef;
  imagepath: string;
  loginForm: FormGroup;
  submitted = false;
  response: string;
  constructor(
    private apiService: ApiService,
    private MD5hasher: Md5HasherService,
    private formBuilder: FormBuilder,
    private myRoute: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.imagepath = '../../../assets/img/avatar_2x.png';
    this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    this.response;
  }


  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmitLogin(){
    this.submitted = true;

    var user = this.loginForm.get('username').value;
    var pass = this.loginForm.get('password').value;

    if (this.loginForm.invalid) {
        return;
    }
    else{
      var hashPass = this.MD5hasher.MD5(pass);

      var loginDetails = {};
      loginDetails['username'] = user;
      loginDetails['password'] = hashPass;

      var tok = user + ':' + pass;
      var hash = window.btoa(tok);

      var jsonstring = JSON.stringify(loginDetails);
      this.login('authenticate/', jsonstring, null, 'Basic', hash);
    }


  }
  login(url: string, payload: string, params: string, authtype: string, authparam: string){
    this.apiService.post(url, payload, params, authtype, authparam)
    .map((res:any) =>
      res.body
    )
		.subscribe((data) => {
      let resSTR = JSON.stringify(data);
      let resJSON = JSON.parse(resSTR);
      console.log(resJSON['data']);
      this.auth.sendToken(resJSON['data']['token']);
      localStorage.setItem('session_data', resJSON['data']['user']);
      this.myRoute.navigate([""]);

    },
    (err) => {
      var responseCode = JSON.stringify(err.status);
      if(responseCode === '400'){
        this.response = "Invalid username or password";
        console.log('ERROR: '+JSON.stringify(err.status));
      }else{
        console.log('ERROR: '+JSON.stringify(err.status));
        this.response = "Unknown Error, Please contact the server administrator"+
        "and inform them of the time the error occured, and anything you might have "+
        "done that may have caused the error."
      }
    });
  } // --- login

}
