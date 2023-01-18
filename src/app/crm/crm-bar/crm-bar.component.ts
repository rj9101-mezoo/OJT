import { Component } from '@angular/core';
import { UserService } from 'src/app/auth/user.service';

@Component({
  selector: 'app-crm-bar',
  templateUrl: './crm-bar.component.html',
  styleUrls: ['./crm-bar.component.css']
})
export class CrmBarComponent {
  path: string = window.location.pathname.split('/').slice(-2)[0];
  test: boolean = window.location.pathname.split('/').slice(-1)[0] === 'crm';
  constructor(private userService:UserService) { }

  ngOnInit() {
    // console.log(window.location.pathname.split('/').slice(-1)[0])
  }

  logout(){
    this.userService.logout();
  }
}
