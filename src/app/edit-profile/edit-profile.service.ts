import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {
  // loginUserData: any;
  getUserProfile(userData) {
    return this.http.post(
      'http://localhost:8080/api/edit-profile/getUserDetails',
      { userData: userData }
    );
  }
  onUpdateUserProfile(userData, userMail) {
    return this.http.post('http://localhost:8080/api/edit-profile', {
      userData: userData,
      presentMail: userMail
    });
  }
  // onLoginUser(loginUserData) {
  //   console.log('loginUserData', loginUserData);
  //   this.loginUserData = loginUserData;
  //   console.log(this.loginUserData);
  // }
  // getLoginUser() {
  //   return this.loginUserData;
  // }

  constructor(private http: HttpClient) {
    // console.log('editProfile....', this.loginUserData);
  }
}
