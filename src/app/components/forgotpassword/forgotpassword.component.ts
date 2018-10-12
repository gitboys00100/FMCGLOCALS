import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
    forgotForm: FormGroup;
    submitted = false;
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.forgotForm = this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
        });
  }
  // convenience getter for easy access to form fields
   get f() { return this.forgotForm.controls; }

   onSubmitForgot(){
     this.submitted = true;

     var user = this.forgotForm.get('username').value;
     var email = this.forgotForm.get('email').value;

     if (this.forgotForm.invalid) {
         return;
     }
     else{

       var loginDetails = {};
       loginDetails['username'] = user;
       loginDetails['email'] = email;

       var jsonstring = JSON.stringify(loginDetails);
       // this.forgot('authenticate/', jsonstring, null, 'Basic', hash);
     }
   }
}
