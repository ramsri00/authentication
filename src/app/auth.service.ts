import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;

  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      // setTimeout(() => {
      resolve(this.loggedIn);
      // });
    });
    return promise;
  }

  constructor(private cookieService: CookieService) {
    console.log(this.cookieService.get('isLoggedIn'));
    if (this.cookieService.get('isLoggedIn')) {
      this.loggedIn = true;
    }
  }
}
