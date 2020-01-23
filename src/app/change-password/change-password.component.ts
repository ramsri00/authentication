import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ChangePasswordService } from './change-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  userResponse;
  userEmail: string;
  libchangepwdForm = this.formBuilder.group({
    // userEmail: ['', [Validators.required, Validators.email]],
    oldPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });
  onChangePassword() {
    this.changepasswordSharedService
      .onChangePasswordRequest(this.libchangepwdForm.value, this.userEmail)
      .subscribe(response => {
        console.log(response);
        this.userResponse = response;
        if (this.userResponse.msg === 'success') {
          alert('Password changed successfully');
        } else if (this.userResponse.msg === 'wrong-password') {
          alert('Old Password is in correct');
        } else if (this.userResponse.msg === 'emailId-not-found') {
          alert('EmailId not found');
        }
      });
  }
  constructor(
    private formBuilder: FormBuilder,
    private changepasswordSharedService: ChangePasswordService
  ) {
    this.userEmail = localStorage.getItem('userEmailId');
    console.log(this.userEmail);
  }

  ngOnInit() {}
}
