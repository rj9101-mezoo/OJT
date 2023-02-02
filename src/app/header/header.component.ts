import { Component, OnInit } from '@angular/core';
import { UserService } from '../auth/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { MonitorService } from '../home/monitor.service';

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

  date!:number;
  selected!:number;
  alarm:boolean = true;

  beds = [
    {count: 4},
    {count: 8},
    {count: 16},
    {count: 32},
    {count: 128},
  ]

  constructor(private userService: UserService,
    private monitorService: MonitorService,
    private state: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.isLoggedIn$ = this.userService.isLoggedIn;
    this.getBeds();
    // const number = interval(1000).pipe(
    //   this.timer()
    // )
    // number.subscribe();
    interval(1000).subscribe(x=>{this.date=Date.now()})
  }

  // timer(){
  //   this.date = new Date();
  // }

  logout() {
    this.userService.logout();
  }

  move(path:string){
    this.router.navigate([`/${path}`]);
  }

  getBeds(){
    this.selected= this.monitorService.getBeds();
  }

  changeBeds(number:number){
    location.reload();
    this.monitorService.changeBeds(number);
  }

  switchAlarm(){
    this.alarm = !this.alarm;
  }
}
