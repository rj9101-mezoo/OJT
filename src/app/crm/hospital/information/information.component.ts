import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HospitalService } from '../../hospital.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  edit:boolean = false;
  hospital!:any;
  input!:any;
  constructor(
    private hospitalService:HospitalService,
    private route: ActivatedRoute,
    ){}
  ngOnInit(){
    this.getHospital();
  }
  
  getHospital(){
    this.hospitalService.getHospital(String(this.route.snapshot.paramMap.get('id'))).subscribe(data=> {
      this.hospital=data;
      this.input = Object.assign({}, this.hospital);
      console.log(this.hospital);
    });
  }

  editContent(){
    this.edit = !this.edit;
  }

  cancelContent(){
    // location.reload();
    this.getHospital();
    this.edit = !this.edit;
  }

  focusDate(event:MouseEvent){
    console.log(event);
  }

  // nullCheck(a:any):boolean{
  //   return a.target.value;
  // }
}
