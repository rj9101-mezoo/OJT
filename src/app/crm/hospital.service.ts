import { Injectable } from '@angular/core';
import { Hospital } from './hospital';
import { HOSPITALS } from './mock-hospitals';

import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  getHospitals(): Observable<Hospital[]> {
    const hospitals = of(HOSPITALS);

    return hospitals;
  }

  constructor() { }
}
