import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ResetPasswordService } from './reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  hideToken = true;
  userResponse;
  userpwdResponse;

  onconfirmReset(tokenValue) {
    console.log(tokenValue);
    this.resetPasswordService.onconfirmReset(tokenValue).subscribe(response => {
      console.log(response);
      this.userResponse = response;
      if (this.userResponse.msg === 'success') {
        this.hideToken = false;
      } else if (this.userResponse.msg === 'error') {
        alert('TokenId is invalid or expired');
      }
    });
  }

  onPasswordReset(userData) {
    this.resetPasswordService.onResetPassword(userData).subscribe(response => {
      console.log(response);
      this.userpwdResponse = response;
      if (this.userpwdResponse.msg === 'success') {
        alert('Database updated successfully');
      } else if (this.userpwdResponse.msg === 'token-expired') {
        alert('Token Expired');
      }
    });
  }
  constructor(private resetPasswordService: ResetPasswordService) {}

  ngOnInit() {}
}
