import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/user.service';

@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.css']
})
export class CrmComponent implements OnInit {
  constructor(private userService:UserService) { }

  ngOnInit() {
    // console.log(this.userService.isLoggedIn)
  }

  logout(){
    this.userService.logout();
  }
}
