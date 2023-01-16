import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private userService:UserService) { }

  ngOnInit() {
    console.log(this.userService.isLoggedIn)
  }

  logout(){
    this.userService.logout();
  }
}
