import { Injectable } from '@angular/core';
import { Hospital } from './hospital';
import { HOSPITALS } from './mock-hospitals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiHttpServer } from 'src/url';

import {Observable,from, of, tap, filter, catchError, map, mergeMap} from 'rxjs';
import { Account } from './account';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  private hospitals!: Observable<Hospital[]>
  private hospital!: Observable<Hospital>
  private accuntId:any  = localStorage.getItem('id');
  private hospitalId = "62c79e20d58f925711f5a9fc";
  private device = [];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getTest(id:string):Observable<Account[]>{
    const test1 = this.http.get(`${apiHttpServer}/groups/get-group/${id}`,{
      params:{
        accountId: this.accuntId
    }})
    const test2  = test1.pipe(
      mergeMap((h:any)=> this.http.get(`${apiHttpServer}/accounts/getAllAccounts`,{
        params:{
          accountId: this.accuntId
      }}).pipe(
        map((x:any)=>x.data.filter((d:any)=>h.data.accounts.includes(d._id))),
        // tap(x=>console.log(x)),
        map((d:any)=>d.map((d:any,i:any)=>{
          return {
            index: i+1,
            id: d.accountId,
            userName:d.name,
            hospital:h.data.hospital,
            registrationDate:d.registeredDate,
            expirationDate:d.expiredDate,
            accessLevel:d.roles
          }
        })
      ))
    ))
    // const test1 = this.http.get(`${apiHttpServer}/groups/get-group/${this.hospitalId}`,{
    //   params:{
    //     accountId: this.accuntId
    // }})
    return test2;
  }

  getHospital(id: string) {
    const test1 = this.http.get(`${apiHttpServer}/groups/get-group/${id}`,{
        params:{
          accountId: this.accuntId
      }})
      .pipe(
        map((x:any)=>x.data)
      )

    return test1;
  }

  getHospitals(): Observable<Hospital[]> {
    const test:Hospital[] = [];
    const test1 = this.http.get<Hospital[]>(`${apiHttpServer}/groups/getHospitals`,{
      params:{
        accountId: this.accuntId
    }})
        .pipe(
          map((x:any)=>x.data.filter((x:any)=>x.agencyId == localStorage.getItem('agencyId'))),
          // tap(x=>console.log(x)),
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
