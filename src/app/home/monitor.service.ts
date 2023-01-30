import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {
  beds:number = 4;
  array:number[] = [];

  constructor(
    private http: HttpClient
  ) { }

  getBeds():number{
    if(localStorage.getItem('bedOption')){
      this.beds =Number(localStorage.getItem('bedOption'));
      this.array = new Array(this.beds-1).map((d,i)=>i);
      return this.beds;
    }
    else{
      this.beds = 4;
      return this.beds
    }
    // this.beds = Number(localStorage.getItem('bedOption'))
    // return this.beds;
  }

  changeBeds(num:number){
    localStorage.setItem('bedOption', String(num));
    this.beds = num;
    this.array = new Array(this.beds-1).map((d,i)=>i);
  }


}
