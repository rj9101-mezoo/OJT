import { Component, AfterViewInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/auth/user.service';
import { Hospital } from '../hospital';
import { HospitalService } from '../hospital.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';


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

  dataSource!:MatTableDataSource<Hospital>; 

  private searchTerms = new Subject<string>();

  constructor(
    private userService:UserService, 
    private hospitalService:HospitalService, 
    private router:Router,
    private _liveAnnouncer: LiveAnnouncer
    ) { }

  ngOnInit() {
    console.log(this.userService.isLoggedIn);

    this.getHospitals();
    this.countHospital = this.hospitals$.length;
    this.hospitals$ = this.hospitals$.reverse();
    this.dataSource = new MatTableDataSource(this.hospitals$)
  }

  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
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

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
