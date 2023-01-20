import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService:UserService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
  Observable<boolean> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // console.log(state)
    // console.log(this.userService.isLoggedIn)
    if(this.userService.isLoggedIn){
      return true;
    }
    
    this.router.navigate(['/auth/login']);
    return false;
  }
  
}
