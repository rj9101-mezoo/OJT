import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {
  private beds:number = 4;

  constructor(
    private http: HttpClient
  ) { }

  getBeds(){
    return this.beds;
  }

  changeBeds(num:number){
    this.beds = num;
  }


}
