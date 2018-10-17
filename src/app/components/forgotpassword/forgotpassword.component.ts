import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
    ForgotForm: FormGroup;
    submitted = false;
    response: string;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private myRoute: Router,
  ) { }

  ngOnInit() {
    this.ForgotForm = this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
        });
  }
  // convenience getter for easy access to form fields
   get f() { return this.ForgotForm.controls; }

   onSubmitForgot(){
     this.submitted = true;

     var user = this.ForgotForm.get('username').value;
     var email = this.ForgotForm.get('email').value;

     if (this.ForgotForm.invalid) {
         return;
     }
     else{

       var forgotDetails = {};
       forgotDetails['username'] = user;
       forgotDetails['email'] = email;

       var jsonstring = JSON.stringify(forgotDetails);
       this.forgot('forgot_password/', jsonstring, null);
     }
   }

   forgot(url: string, payload: string, params: string){
     this.apiService.post(url, payload, params)
     .map((res:any) =>
       res.body
     )
 		.subscribe((data) => {
       let resSTR = JSON.stringify(data);
       let resJSON = JSON.parse(resSTR);
       this.response = resJSON['data']['detail'];
       console.log("RESPONSE: "+resJSON['data']['detail']);

     },
     (err) => {
       var responseCode = JSON.stringify(err.status);
       if(responseCode === '400'){
         this.response = "Invalid username or email";
         console.log('ERROR: '+JSON.stringify(err.status));
       }else{
         console.log('ERROR: '+JSON.stringify(err.status));
         this.response = "Unknown Error, Please contact the server administrator"+
         "and inform them of the time the error occured, and anything you might have "+
         "done that may have caused the error."
       }
     });
   } // forgot
}
