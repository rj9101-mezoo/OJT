import { Injectable } from '@angular/core';
import { Hospital } from './hospital';
import { HOSPITALS } from './mock-hospitals';

import {Observable,from, of, tap, filter, catchError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  private hospitals!: Observable<Hospital[]>
  private hospital!: Observable<Hospital>

  getHospital(id: number) {
    this.hospital = from(HOSPITALS).pipe(
      filter(h=> h.index === id)
    )

    return this.hospital;
  }

  getHospitals(): Observable<Hospital[]> {
    this.hospitals = of(HOSPITALS);

    return this.hospitals;
  }

  searchHospitals(term: string): Observable<Hospital[]> {
    if(!term.trim()){
      return of(HOSPITALS);
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

  constructor() { }
}
