import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../auth/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  private formSubmitAttempt!: boolean;

  constructor(private fb: FormBuilder, private userService:UserService){}
  ngOnInit(){
    this.form = this.fb.group({
      account: ['', Validators.required],
      password: ['', Validators.required]
    });
    
  }

  isFieldInvalid(field: string) {
    // return (
    //   (!this.form.get(field).valid && this.form.get(field).touched) ||
    //   (this.form.get(field).untouched && this.formSubmitAttempt)
    // );
    return true;
  }

  log():void{
    if (this.form.valid) {
      console.log(this.form.value);
      this.userService.login(this.form.value);
    }
  }
}
