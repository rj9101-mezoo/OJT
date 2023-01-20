import { Injectable } from '@angular/core';
import { Hospital } from './hospital';
import { HOSPITALS } from './mock-hospitals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiHttpServer } from 'src/url';

import {Observable,from, of, tap, filter, catchError, map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  private hospitals!: Observable<Hospital[]>
  private hospital!: Observable<Hospital>
  private accuntId:any  = localStorage.getItem('id');
  private hospitalId:any = "62c79e20d58f925711f5a9fc";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // getTest(){
  //   const test1 = this.http.get(`${apiHttpServer}/groups/getHospitals`,{
  //     params:{
  //       accountId: this.accuntId
  //   }})
  //       .pipe(
  //         map((x:any)=>x.data.filter((x:any)=>x.agencyId == localStorage.getItem('agencyId'))),
  //         catchError(this.handleError<any>('login', []))
  //       )

  //   // const test1 = this.http.get(`${apiHttpServer}/groups/get-group/${this.hospitalId}`,{
  //   //   params:{
  //   //     accountId: this.accuntId
  //   // }})

  //   test1.subscribe(x=>console.log(x))
  // }

  getHospital(id: string) {
    // this.hospital = from(HOSPITALS).pipe(
    //   filter(h=> h.index === id)
    // )
    let test3;
    const test1 = this.http.get(`${apiHttpServer}/groups/get-group/${id}`,{
      params:{
        accountId: this.accuntId
    }})
    .pipe(
      tap(x => console.log(x)),
      map((x:any)=>[x.data].map((x:any,i:any)=>{
        const test3 = this.http.get(`${apiHttpServer}/devices`,{
          params:{
            accountId: this.accuntId
        }}).pipe(
          map((y:any)=>y.data.filter((y:any)=>x.devices.includes(y._id))),
          tap(x=>{console.log(x)})
        )
        // test3.subscribe();
        return test3.pipe(
          map(d=>d.map((c:any)=>{
            console.log(x)
            return {
              index: i,
              hicardiName: c.peripheral.name,
              DeviceType:"RealTime",
              hospital:x.hospital,
              macAddress:c.peripheral.id,
              legistrationDate:c.registeredDate,
              lastConnectedDate:c.lastConnectedDate
            }
          })),
          tap(x=>{console.log(x)})
        ).subscribe()
      })),
      tap(x => console.log(x))      
    )
    const test2 = this.http.get(`${apiHttpServer}/devices`,{
      params:{
        accountId: this.accuntId
    }})
        .pipe(
          map((x:any)=>x.data.filter((x:any)=>x._id == "62ce8309f573e9832a26faa4")),
          catchError(this.handleError<any>('login', []))
    )
    test1.subscribe(x=>console.log(x));
    test2.subscribe(x=>console.log(x));

    return this.hospital;
  }

  getHospitals(): Observable<Hospital[]> {
    const test:Hospital[] = [];
    const test1 = this.http.get<Hospital[]>(`${apiHttpServer}/groups/getHospitals`,{
      params:{
        accountId: this.accuntId
    }})
        .pipe(
          map((x:any)=>x.data.filter((x:any)=>x.agencyId == localStorage.getItem('agencyId'))),
          tap(x=>console.log(x)),
          map(x=>x.map((x:any,i:any)=>{
            return {
              index:i+1,
              hospitalName:x.hospital,
              registrationDate: x.registeredDate,
              numOfBeds:x.purchase.beds,
              numOfDevice:x.purchase.devices,
              numOfAllocatedDevice:0,
              roomName:x.name,
              status:x.active===true?"Activated":"None",
              delete:true,
              self:x.serviceType.holter=="self"?true:false,
              _id: x._id
            }
          })),
          catchError(this.handleError<any>('login', []))
    )
    // const test2 = this.http.get(`${apiHttpServer}/devices`,{
    //   params:{
    //     accountId: this.accuntId
    // }})
    //     .pipe(
    //       // map((x:any)=>x.data.filter((x:any)=>x.agencyId == localStorage.getItem('agencyId'))),
    //       catchError(this.handleError<any>('login', []))
    // )
    // const test3 = this.http.get(`${apiHttpServer}/spaces`,{
    //   params:{
    //     accountId: this.accuntId
    // }})
    //     .pipe(
    //       // map((x:any)=>x.data.filter((x:any)=>x.agencyId == localStorage.getItem('agencyId'))),
    //       catchError(this.handleError<any>('login', []))
    // )
    // test1.subscribe(x=>console.log(x))
    // test2.subscribe(x=>console.log(x))
    // test3.subscribe(x=>console.log(x))
    // test1.subscribe(hospitals=> test = hospitals)
    // console.log(this.hospitals)
    // // this.hospitals = of(HOSPITALS);
    // // console.log(test1)
    // // console.log(of(HOSPITALS))
    return test1;
  }

  searchHospitals(term: string): Observable<Hospital[]> {
    if(!term.trim()){
      // return of(HOSPITALS);
    }
    return this.hospitals.pipe(
      tap(h=>h.filter(h=>h.hospitalName.includes(term))),
      // filter(h=> h.hospitalName.includes(term)),
      catchError(this.handleError<Hospital[]>('searchHospital', []))  
    )
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

  constructor(
    private http: HttpClient
  ) { }
}
