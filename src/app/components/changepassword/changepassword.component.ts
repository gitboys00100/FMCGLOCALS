import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Md5HasherService } from '../../shared/md5-hasher.service';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  usersession: string;
  ChangeForm: FormGroup;
  submitted = false;
  response: string;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private MD5hasher: Md5HasherService,
  ) { }

  ngOnInit() {
    let userstorage = localStorage.getItem("session_data");
    let parser = window.atob(userstorage);
    this.usersession = JSON.parse(parser);
    console.log(this.usersession);
    this.ChangeForm = this.formBuilder.group({
            newpassword: ['', Validators.required],
            confirmpassword: ['', Validators.required]
        });
    this.response;
  }

  // convenience getter for easy access to form fields
  get f() { return this.ChangeForm.controls; }

  onSubmitChange(){
    this.submitted = true;

    var newpass = this.ChangeForm.get('newpassword').value;
    var confirmpass = this.ChangeForm.get('confirmpassword').value;

    if (this.ChangeForm.invalid) {
        return;
    }
    else{

      if(newpass != confirmpass){
        this.response = "new password and confirm password does not match! "
      }else{

        let hashnew = this.MD5hasher.MD5(newpass);
        let hashconfirm = this.MD5hasher.MD5(confirmpass);
        let token = localStorage.getItem("LoggedInUser");
        var changeDetails = {};
        changeDetails['new_password1'] = hashnew;
        changeDetails['new_password2'] = hashconfirm;

        var jsonstring = JSON.stringify(changeDetails);
        this.changePass('change_password/', jsonstring, null, 'Token', token);
      }

    }
  }

  changePass(url: string, payload: string, params: string, authtype: string, authparam: string){
    this.apiService.post(url, payload, params, authtype, authparam)
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
        this.response = "password does not match";
        console.log('ERROR: '+JSON.stringify(err.status));
      }else{
        console.log('ERROR: '+JSON.stringify(err.status));
        this.response = "Unknown Error, Please contact the server administrator"+
        "and inform them of the time the error occured, and anything you might have "+
        "done that may have caused the error."
      }
    });
  } // changepass

}
