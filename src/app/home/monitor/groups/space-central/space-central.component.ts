import { Component, OnInit } from '@angular/core';
import { MonitorService } from 'src/app/home/monitor.service';

@Component({
  selector: 'app-space-central',
  templateUrl: './space-central.component.html',
  styleUrls: ['./space-central.component.css']
})
export class SpaceCentralComponent implements OnInit {
  beds!:number;

  constructor(
    private monitorService: MonitorService
  ){}

  ngOnInit(): void {
    this.getBeds();
  }

  getBeds(){
    this.beds = this.monitorService.getBeds();
  }
}
