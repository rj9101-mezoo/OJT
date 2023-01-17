import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/auth/user.service';
import { Hospital } from '../hospital';
import { HospitalService } from '../hospital.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent {
  Beds = {
    sold: 1372,
    Left: 9132,
    Total: 10504
  }
  countHospital!:number;

  hospitals$:Hospital[] = [];
  displayedColumns: string[] = [
    'index',
    'hospitalName',
    'registrationDate',
    'numberOfBeds',
    'numberOfDevice',
    'numberOfAllocatedDevice',
    'roomName',
    'status',
    'delete'
    ];

  private searchTerms = new Subject<string>();

  constructor(private userService:UserService, private hospitalService:HospitalService, private router:Router ) { }

  ngOnInit() {
    console.log(this.userService.isLoggedIn);

    this.getHospitals();
    this.countHospital = this.hospitals$.length;
    this.hospitals$ = this.hospitals$.reverse();
    // console.log(this.hospitals$)
    // this.hospitals$ = this.searchTerms.pipe(
    //   // wait 300ms after each keystroke before considering the term
    //   debounceTime(300),

    //   // ignore new term if same as previous term
    //   distinctUntilChanged(),

    //   // switch to new search observable each time the term changes
    //   // switchMap((term: string) => this.heroService.searchHeroes(term))
    // );
  }

  logout(){
    this.userService.logout();
  }

  getHospitals():void{
    this.hospitalService.getHospitals().subscribe(hospitals=> this.hospitals$ = hospitals)
  }

  moveDetail(id:number){
    this.router.navigate([`/crm/hospital/${id}`]);
  }

  search(term: string) : void{
    this.searchTerms.next(term);
  }
}
