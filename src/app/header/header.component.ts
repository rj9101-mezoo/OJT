import { Component, OnInit } from '@angular/core';
import { UserService } from '../auth/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$!: boolean;

  heads = [
    {path: "monitor", name: "Monitor"},
    {path: "history", name: "ECG Records"},
    {path: "manual", name: "Manuals"},
    {path: "setting", name: "Setting"},
  ]
  test: string = window.location.pathname.split('/')[1];
  constructor(private userService: UserService, 
    private state: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.isLoggedIn$ = this.userService.isLoggedIn;
    console.log(window.location.pathname.split('/')[1])
  }

  logout() {
    this.userService.logout();
  }

  move(path:string){
    this.router.navigate([`/${path}`]);
  }

}
