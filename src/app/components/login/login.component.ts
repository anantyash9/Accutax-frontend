import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {OdmService} from '../../services/odm.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  error=false
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private router: Router,private odmService:OdmService) { }
  submit() {
    if (this.form.valid) {
      if (this.form.value.username=='admin' && this.form.value.password=='admin'){
        this.odmService.getAllProjects().subscribe(data=>{
        this.odmService.setUserData(data)
        if (this.odmService.data.length>0){
          this.router.navigate(['/map']);
        }
        else{
          this.error=true
        }
        })
      }
      else{
      this.odmService.getUserProject(this.form.value.username).subscribe( (data: any) => {
        
        if (data != null){
          this.odmService.setUserData([data])
          this.router.navigate(['/map']);
        }
        else{
          this.error=true
        }
      })
      console.log(this.form.value);
    }
    }
    }
  }