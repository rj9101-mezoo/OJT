import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedIn: boolean = false;

  get isLoggedIn(){
    return this.loggedIn;
  }

  constructor( private router: Router) { }

  login( user: User ) {
    if(user.account.trim().length > 0 && user.password.trim().length > 0) {
      this.loggedIn = true;
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.loggedIn = false;
    this.router.navigate(['/auth/login']);
  }
}
