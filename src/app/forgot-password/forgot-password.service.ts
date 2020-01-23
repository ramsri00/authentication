import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  onRequestPassword(emailId) {
    console.log('Request Password is on process');
    return this.http.post('http://localhost:8080/api/forgot-password', {
      userData: emailId
    });
  }
  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
}
