import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  onAuthLogin(userData) {
    console.log('onAuthLoginCalled');
    console.log(userData);
    return this.http.post('http://localhost:8080/api/login', {
      userData: userData
    });
  }
  constructor(private http: HttpClient) {}
}
