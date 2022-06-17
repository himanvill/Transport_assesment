import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as bcrypt from 'bcryptjs';
import { LoginService } from '../service/login.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  @Output() dashboard: EventEmitter<any> = new EventEmitter()
  constructor(private loginService: LoginService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    
  }

  //On Form submit
  onSubmit() {
    let passwordHash = bcrypt.hashSync(this.loginForm.value.password, 10);
    let userCred = {
      email: this.loginForm.value.email,
      password: passwordHash,
    };
   
    this.loginService.login(userCred).subscribe((res) => {
     
      localStorage.setItem("token",res.token)
     
      this.dashboard.emit()
      
    }, (err)=>{
      this._snackBar.open(err.error.message, "ok", {
        horizontalPosition: "center",
        verticalPosition: "top",
      });
      
    });
  }
}
