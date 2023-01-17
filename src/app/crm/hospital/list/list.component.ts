import { Component } from '@angular/core';
import { UserService } from 'src/app/auth/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  constructor(private userService:UserService) { }

  ngOnInit() {
    console.log(this.userService.isLoggedIn)
  }

  logout(){
    this.userService.logout();
  }

}
