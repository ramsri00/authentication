import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';
// import { EditProfileService } from '../edit-profile/edit-profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userResponse: any;
  libLoginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onLogin() {
    this.loginService
      .onAuthLogin(this.libLoginForm.value)
      .subscribe(response => {
        console.log(response);
        this.userResponse = response;
        // this.editProfileService.onLoginUser(this.userResponse);
        if (this.userResponse.msg === 'success') {
          alert('Login Success');
          localStorage.setItem(
            'userEmailId',
            this.userResponse.userData.emailId
          );
          // this.authService.isLoggenIn(this.userResponse.msg);
          this.cookieService.set('isLoggedIn', 'true');
          this.router.navigate(['/edit-profile']);
        } else if (this.userResponse.msg === 'not-found') {
          alert('Login Failed,invalid user');
        } else if (this.userResponse.msg === 'invalid-credentials') {
          alert('username or password is invalid');
        }
      });
  }
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit() {}
}
