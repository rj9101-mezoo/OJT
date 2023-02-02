import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/auth/user.service';
import { Account } from '../../account';
import { Device } from '../../device';
import { DeviceService } from '../../device.service';
import { Hospital } from '../../hospital';
import { HospitalService } from '../../hospital.service';
import { DEVICES } from '../../mock-devices';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  hospitals:Hospital[] = [];
  selected!:string;
  hospital!:any;
  devices:Device[] = [];
  accounts:Account[] = [];
  displayedColumns: string[] = [
    'check',
    'index',
    'hicardiName',
    'deviceType',
    'hospital',
    'bedNo',
    'macAddress',
    'registeredDate',
    'lastConnectedDate'
    ];
  accountsColumns: string[] = [
    'check',
    'index',
    'id',
    'userName',
    'hospital',
    'registrationDate',
    'expirationDate',
    'accessLevel'
  ]
  dataSource!: MatTableDataSource<Device>
  dataSource2!: MatTableDataSource<Account>
  checkColor:string =  'accent';
  tab!:number;


  constructor(
    private userService:UserService, 
    public hospitalService:HospitalService, 
    private route: ActivatedRoute,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private deviceService:DeviceService
  ) {

   }

  ngOnInit() {
    this.getTab();
    this.getHospitals();
    this.getHospital();
    this.getDevices();
    this.getAccounts();
    this.dataSource = new MatTableDataSource(this.devices)
    this.hospitalService.getTest(String(this.route.snapshot.paramMap.get('id')));
  }

  logout(){
    this.userService.logout();
  }

  getHospital():void{
    this.selected=String(this.route.snapshot.paramMap.get('id'));
    this.hospitalService.getHospital(this.selected).subscribe(hospital => this.hospital=hospital);
  }

  getHospitals():void{
    this.hospitalService.getHospitals().subscribe(
      hospitals=> this.hospitals = hospitals
    )
  }

  getAccounts():void{
    this.selected=String(this.route.snapshot.paramMap.get('id'));
    this.hospitalService.getTest(this.selected).subscribe(accounts=>{ 
      this.accounts = accounts;
      this.accounts.reverse();
      // console.log(accounts);
      this.dataSource2 = new MatTableDataSource(this.accounts);
    })
    // this.devices = DEVICES;
  }

  getDevices():void{
    this.selected=String(this.route.snapshot.paramMap.get('id'));
    this.deviceService.getDevices(this.selected).subscribe(devices=>{ 
      this.devices = devices;
      this.devices.reverse();
      // console.log(devices);
      this.dataSource = new MatTableDataSource(this.devices);
    })
  }

  moveDetail(id:any){
    this.router.navigate([`/crm/hospital/${id}`])
    .then(()=> {
      this.getTab();
      this.getHospitals();
      this.getHospital();
      this.getDevices();
      this.getAccounts();
    })
    // // location.reload()
    
    // this.router.navigateByUrl(`/crm/hospital/${id}`, {skipLocationChange:true})
    // .then(()=> this.router.navigate([ListComponent]))

    // this.router.navigate([`/crm/hospital/${id}`],{skipLocationChange:true, queryParamsHandling:'merge'})
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

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.devices != null && this.devices.every(t => t.checked);
  }

  someComplete(): boolean {
    if (this.devices == null) {
      return false;
    }
    return this.devices.filter(t => t.checked).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.devices == null) {
      return;
    }
    console.log(this.allComplete);
    this.devices.forEach(t => (t.checked = completed));
  }

  updateCecked(id: number){
    this.devices.filter(t => t.index === id).forEach(t => (t.checked = !t.checked));
  }

  changeTab(tabChangeEvent: MatTabChangeEvent){
    console.log(tabChangeEvent);
    localStorage.setItem('tab', String(tabChangeEvent.index));
    this.tab = tabChangeEvent.index;
  }

  getTab(){
    this.tab = localStorage.getItem('tab')?Number(localStorage.getItem('tab')):0;
  }

  prevent(id: number){
    this.devices.filter(t => t.index === id).forEach(t => (t.checked = !t.checked));
  }

}
