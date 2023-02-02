import { Component, OnInit } from '@angular/core';
import { MonitorService } from '../../monitor.service';
import { WebsocketService } from '../../websocket.service';
import { webSocket } from 'rxjs/webSocket';
import { interval, switchMap, take } from 'rxjs';
import { wsServer } from 'src/url';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  websocket!:WebSocket;
  subject = webSocket(wsServer);
  data1:number[] = [];
  heartRate1:number[] = [];
  temp1: number[] = [];
  check:boolean = false;
  selected!:number;
  baseArray:number[] = [0,1,2];

  constructor(
    public monitorService: MonitorService,
    private websocketService: WebsocketService
  ) {}

  // onpenWebsocketConnection(){
  //   this.websocket = new WebSocket(wsServer)

  //   this.websocket.onopen = (e) => {
  //     console.log(e);
  //   }

  //   this.websocket.onmessage = (e) =>{
  //     console.log(JSON.parse(e.data).data.dataSet);
  //   }

  //   this.websocket.onclose = (e) =>{
  //     console.log(e);
  //   }
  // }

  // sendWebsocketMessage(){
  //   this.websocket.send(JSON.stringify(
  //     {
  //       requestId:this.makeUuid(),
  //       method:'PUT',
  //       macs:[ "F2:79:B7:F0:D6:42"]
  //     }
  //   ))
  // }

  ngOnInit(): void {
    // const observableA = this.subject.multiplex(
    //   ()=>({subscibe: "a"}),
    //   () => ({unsubscribe: "a"}),
    //   (msg:any) => msg.type==='a'
    // )
    // const observableB = this.subject.multiplex(
    //   ()=>({subscibe: "b"}),
    //   () => ({unsubscribe: "b"}),
    //   (msg:any) => msg.type==='b'
    // )

    // observableA.subscribe(
    //   msg => console.log(`A:${msg}`)
    //   )
    // observableB.subscribe(msg => console.log(`B:${msg}`))

    // observableA.send({
    //   requestId:this.makeUuid(),
    //   method:'PUT',
    //   macs:[ "F2:79:B7:F0:D6:42"]
    // })
    this.subject.subscribe({
      next: (msg:any) => {
        this.data1 = msg.data?.dataSet.map((a:any)=>a.AB.AA.CAC).flat();
        this.heartRate1 = msg.data?.dataSet.map((a:any)=>a.AB.AA?.AAA).flat().filter((data:any)=>data)[0]?
          msg.data?.dataSet.map((a:any)=>a.AB.AA?.AAA).flat().filter((data:any)=>data):this.heartRate1;
        this.temp1 = msg.data?.dataSet.map((a:any)=>a.AB.AA?.AAC).flat().filter((data:any)=>data)[0]?
        msg.data?.dataSet.map((a:any)=>{if(a.AB.AA?.AAC){return (a.AB.AA?.AAC/10).toFixed(1)}else{return;}}).flat().filter((data:any)=>data):this.temp1;
      },
      error: err => console.log(err),
      complete: () => console.log('complete')
    })
    this.send();

  }

  send(){
    // this.subject.subscribe();
    this.subject.next({
      requestId:this.makeUuid(),
      method:'PUT',
      macs:[ "F2:79:B7:F0:D6:42"]
    })
    // this.subject.complete();
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
