import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  onRegisterUser(userData) {
    console.log('onRegisterUser called');
    console.log('userData', userData);
    const postData = new FormData();
    postData.append('firstName', userData.firstName);
    postData.append('lastName', userData.lastName);
    postData.append('email', userData.email);
    postData.append('mobileNumber', userData.mobileNumber);
    postData.append('password', userData.password);
    postData.append('gender', userData.gender);
    if (userData.image !== '') {
      postData.append('image', userData.image, userData.firstName);
    }

    console.log('postData....', postData);
    return this.http.post('http://localhost:8080/api/register', postData);
  }
  constructor(private http: HttpClient) {}
}
