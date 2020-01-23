import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  onChangePasswordRequest(userData, userEmail) {
    return this.http.post('http://localhost:8080/api/change-password', {
      userData: userData,
      userEmail: userEmail
    });
  }

  constructor(private http: HttpClient) {}
}
