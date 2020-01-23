import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EditProfileService } from './edit-profile.service';
import { Router } from '@angular/router';
import { value } from '../register/register.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  userResponse;
  userUpdateResponse;
  userEmail;

  image = {
    imageGender: ''
  };
  defaultImage;
  loginUserData: any;
  libEditProfileForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    mobileNumber: ['', Validators.required]
  });

  onEditProfile() {
    this.editProfileService
      .onUpdateUserProfile(this.libEditProfileForm.value, this.userEmail)
      .subscribe(response => {
        console.log(response);
        this.userUpdateResponse = response;
        if (this.userUpdateResponse.msg === 'success') {
          alert('profile updated successfully');
          this.userEmail = this.userUpdateResponse.email;
          localStorage.setItem('userEmailId', this.userUpdateResponse.email);
        } else if (this.userUpdateResponse.msg === 'emailId-exists') {
          alert('emailId already taken');
        }
      });
  }
  onLogout() {
    localStorage.clear();
    this.cookieService.deleteAll();
    this.router.navigate(['/']);
  }
  constructor(
    private formBuilder: FormBuilder,
    private editProfileService: EditProfileService,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.userEmail = localStorage.getItem('userEmailId');
    console.log('userEmail', this.userEmail);
    this.editProfileService
      .getUserProfile(this.userEmail)
      .subscribe(response => {
        console.log(response);
        this.userResponse = response;
        console.log('loginData', this.userResponse.userData);
        this.libEditProfileForm.patchValue({
          firstName: this.userResponse.userData.firstName,
          lastName: this.userResponse.userData.lastName,
          email: this.userResponse.userData.emailId,
          mobileNumber: this.userResponse.userData.mobileNumber
        });
        if (this.userResponse.userData.imageUrl === undefined) {
          this.defaultImage = true;
          if (this.userResponse.userData.gender === 'male') {
            return (this.image.imageGender = '../../assets/images/male.png');
          } else if (this.userResponse.userData.gender === 'female') {
            return (this.image.imageGender = '../../assets/images/female.jpg');
          }
        } else if (this.userResponse.userData.imageUrl) {
          this.defaultImage = false;
          this.image.imageGender = this.userResponse.userData.imageUrl;
        }
      });
  }

  ngOnInit() {
    // this.value = value;
    // console.log('const exported successfully', value);
  }
}
