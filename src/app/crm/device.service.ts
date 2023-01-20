import { Injectable } from '@angular/core';
import { map, mergeMap, Observable, of, tap } from 'rxjs';
import { apiHttpServer } from 'src/url';
import { Device } from './device';
import { DEVICES } from './mock-devices';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private devices!: Observable<Device[]>
  private accuntId:any  = localStorage.getItem('id');

  constructor(
    private http: HttpClient
  ) { }

  getDevices(id:string): Observable<Device[]> {
    const test1 = this.http.get(`${apiHttpServer}/groups/get-group/${id}`,{
      params:{
        accountId: this.accuntId
    }})
  const test2 = test1.pipe(
    mergeMap((h:any)=> this.http.get(`${apiHttpServer}/devices`,{
      params:{
        accountId: this.accuntId
    }}).pipe(
        map((x:any)=>x.data.filter((d:any)=>h.data.devices.includes(d._id))),
        tap(x=>console.log(x)),
        map(d=>d.map((d:any, i:any)=>{
          return {
            index: i,
            hicardiName: d.peripheral.name,
            deviceType:"RealTime",
            hospital:h.data.hospital,
            macAddress:d.peripheral.id,
            registeredDate:d.registeredDate,
            lastConnectedDate:d.lastConnectedDate
          }
        }))
      )
    )
  )
  const test3 = this.http.get(`${apiHttpServer}/spaces`,{
    params:{
      accountId: this.accuntId
  }})

  test3.subscribe(x=>console.log(x))

    return test2;
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error:any) : Observable<T> => {
      // TODO: 리모트 서버로 에러 메시지 보내기
      console.error(error); // 지금 콘솔에 로그를 출력

      // TODO: 사용자가 이해할 수 있는 형태로 변환하기
      console.log(`${operation} failed: ${error.message}`);

      return of(result as T)
    }
  }
}
