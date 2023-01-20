import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Device } from './device';
import { DEVICES } from './mock-devices';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private devices!: Observable<Device[]>

  constructor() { }

  getDevices(): Observable<Device[]> {
    this.devices = of(DEVICES);

    return this.devices;
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
