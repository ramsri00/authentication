import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ForgotPasswordService } from './forgot-password.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  userResponse;
  showFields = true;
  onForgotpwd(form: NgForm) {
    // console.log(form.controls.email.value);
    this.forgotPasswordService
      .onRequestPassword(form.controls.email.value)
      .subscribe(response => {
        console.log(response);
        this.userResponse = response;
        if (this.userResponse.msg === 'error') {
          alert('EmailId doesnot exists');
        }
        if (this.userResponse.msg === 'success') {
          this.showFields = false;
          alert(
            'Mail has successfully sent to you registered mail Id.please copy your token Id.'
          );
          this.router.navigate(['/forgot-password/reset-password']);
        }
      });

    // console.log(this.userResponse);
    // if (this.userResponse.msg === 'success') {
    //   console.log(this.userResponse);
    //   this.router.navigate(['reset-password/123'], {
    //     relativeTo: this.activatedRoute
    //   });
    // }
  }

  constructor(
    public forgotPasswordService: ForgotPasswordService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}
}
