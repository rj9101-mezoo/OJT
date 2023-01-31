import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { wsServer } from 'src/url';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  subject = webSocket(wsServer);
  data1:number[] = [];
  heartRate1:number[] = [];
  temp1: number[] = [];

  constructor() { }

  connect(){
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
  }


  send(macs : string){
    // this.subject.subscribe();
    this.subject.next({
      requestId:this.makeUuid(),
      method:'PUT',
      macs:[ macs ]
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
