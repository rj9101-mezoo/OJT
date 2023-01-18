import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/auth/user.service';
import { Hospital } from '../../hospital';
import { HospitalService } from '../../hospital.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  hospitals:Hospital[] = [];
  selected!:number
  hospital!:Hospital;

  constructor(
    private userService:UserService, 
    private hospitalService:HospitalService, 
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getHospitals();
    this.getHospital();
    console.log(this.selected)
    console.log(this.hospital)
  }

  logout(){
    this.userService.logout();
  }

  getHospital():void{
    this.selected=Number(this.route.snapshot.paramMap.get('id'));
    this.hospitalService.getHospital(this.selected).subscribe(hospital=> this.hospital = hospital)
  }

  getHospitals():void{
    this.hospitalService.getHospitals().subscribe(hospitals=> this.hospitals = hospitals)
  }

  moveDetail(id:number){
    this.router.navigate([`/crm/hospital/${id}`]);
  }

}
