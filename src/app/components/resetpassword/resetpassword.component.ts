import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Md5HasherService } from '../../shared/md5-hasher.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

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

    console.log(this.usersession);
    this.ChangeForm = this.formBuilder.group({
            newpassword: ['', Validators.required],
            confirmpassword: ['', Validators.required],
            UID: ['', Validators.required],
            token: ['', Validators.required]
        });
    this.response;
  }

  // convenience getter for easy access to form fields
  get f() { return this.ChangeForm.controls; }

  onSubmitChange(){
    this.submitted = true;

    var newpass = this.ChangeForm.get('newpassword').value;
    var confirmpass = this.ChangeForm.get('confirmpassword').value;
    var uid = this.ChangeForm.get('UID').value;
    var token = this.ChangeForm.get('token').value;

    if (this.ChangeForm.invalid) {
        return;
    }
    else{

      if(newpass != confirmpass){
        this.response = "new password and confirm password does not match! "
      }else{

        let hashnew = this.MD5hasher.MD5(newpass);
        let hashconfirm = this.MD5hasher.MD5(confirmpass);
        var changeDetails = {};
        changeDetails['new_password1'] = hashnew;
        changeDetails['new_password2'] = hashconfirm;
        changeDetails['uid'] = uid;
        changeDetails['token'] = token;

        var jsonstring = JSON.stringify(changeDetails);
        this.changePass('password_reset_confirm/'+uid+'/'+token+'/', jsonstring);
      }

    }
  }

  changePass(url: string, payload: string){
    this.apiService.post(url, payload)
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
  } // resetpass

}
