import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForgotUseridService {
  onRequestUserId(userEmail) {
    return this.http.post('http://localhost:8080/api/forgot-userid', {
      userData: userEmail
    });
  }
  constructor(private http: HttpClient) {}
}
