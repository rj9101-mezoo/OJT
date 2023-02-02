import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';
import { HospitalService } from '../../hospital.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  @Input()
    info:any;

  @Input()
    cancel!:HospitalService;

  edit:boolean = false;
  hospital!:any;
  input!:any;
  constructor(
    private hospitalService:HospitalService,
    private route: ActivatedRoute,
    ){}
  ngOnInit(){
    // this.getHospital();
  }
  
  getHospital(){
    this.hospitalService.getHospital(String(this.route.snapshot.paramMap.get('id'))).subscribe(data=> {
      this.hospital=data;
      this.input = Object.assign({}, this.hospital);
      // console.log(this.hospital);
    });
  }

  editContent(){
    this.edit = !this.edit;
  }

  cancelContent(){
    // location.reload();
    this.cancel.getHospital(String(this.route.snapshot.paramMap.get('id'))).subscribe(data=>{
      this.info=data
    });
    this.edit = !this.edit;
  }

  saveContent(){
    console.log(document.getElementsByClassName('blank'))
    if(!document.getElementsByClassName('blank').length)
      this.edit = !this.edit;
    else
      alert("빈칸을 채워주세요")
  }

  focusDate(event:MouseEvent){
    console.log(event);
  }

  // nullCheck(a:any):boolean{
  //   return a.target.value;
  // }
}
