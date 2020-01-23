import { Component, OnInit } from '@angular/core';
import { ForgotUseridService } from './forgot-userid.service';

@Component({
  selector: 'app-forgot-userid',
  templateUrl: './forgot-userid.component.html',
  styleUrls: ['./forgot-userid.component.css']
})
export class ForgotUseridComponent implements OnInit {
  userResponse;
  onForgotUserId(emailId) {
    console.log(emailId);
    this.forgotUserIdService.onRequestUserId(emailId).subscribe(response => {
      console.log(response);
      this.userResponse = response;
      if (this.userResponse.msg === 'mailId-Notfound') {
        alert("mailId doesn't exists");
      } else if (this.userResponse.msg === 'success') {
        alert('UserId has been sent to your registered mailId');
      }
    });
  }
  constructor(private forgotUserIdService: ForgotUseridService) {}

  ngOnInit() {}
}
