import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  tokenID;
  onResetPassword(userData) {
    console.log(userData);
    return this.http.post('http://localhost:8080/api/reset-password', {
      userData: userData,
      token: this.tokenID
    });
  }
  onconfirmReset(token) {
    this.tokenID = token;
    return this.http.post('http://localhost:8080/api/reset-password/token', {
      userData: token
    });
  }
  constructor(private http: HttpClient) {}
}
