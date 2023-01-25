import { Component, OnInit } from '@angular/core';
import { MonitorService } from '../../monitor.service';
import { WebsocketService } from '../../websocket.service';
import { webSocket } from 'rxjs/webSocket';
import { interval, take } from 'rxjs';
import { wsServer } from 'src/url';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  websocket!:WebSocket;

  constructor(
    private monitorService: MonitorService,
    private websocketService: WebsocketService
  ) { 
  }

  onpenWebsocketConnection(){
    this.websocket = new WebSocket(wsServer)

    this.websocket.onopen = (e) => {
      console.log(e);
    }

    this.websocket.onmessage = (e) =>{
      console.log(e.data);
    }

    this.websocket.onclose = (e) =>{
      console.log(e);
    }
  }

  sendWebsocketMessage(){
    this.websocket.send(JSON.stringify(
      {
        requestId:this.makeUuid(),
        method:'PUT',
        macs:[ "F2:79:B7:F0:D6:42"]
      }
    ))
  }
  ngOnInit(): void {
    // console.log(this.websocketService)
    // console.log(this.ws);
    // console.log(this.makeUuid());
    // console.log(this.connect());
    const subject = webSocket(wsServer)
    console.log(subject)
    subject.subscribe(x=>console.log(x));
    subject.next({message:{
      requestId:this.makeUuid(),
      method:'PUT',
      macs:[ "F2:79:B7:F0:D6:42"]
    }})
    subject.complete();
    subject.error({ code: 4000, reason: 'I think our app just broke!' });

    this.onpenWebsocketConnection();
    // interval(1000).pipe(take(1)).subscribe(x=>{this.sendWebsocketMessage()})
    // this.sendWebsocketMessage()
    // this.ws.onopen = (e) => {
    //   console.log(e);
    // }

    // this.ws.onmessage = (e) =>{
    //   console.log(e);
    // }

    // this.ws.onclose = (e) =>{
    //   console.log(e);
    // }
  }



  makeUuid(): string {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g, (char) => {
        const random = Math.trunc(Math.random() * 16);
        const value = char === 'x' ? random : (random % 4) + 8;
        return value.toString(16);
      }
    );

    return uuid.replace(/-/g, '');
  }
}
