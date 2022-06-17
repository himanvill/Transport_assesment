import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'mercados';
  login:boolean = true
constructor(private route: Router){}
  ngOnInit(): void {
    localStorage.clear()
  }
  dashboard(){
    
this.route.navigateByUrl("dashboard")
this.login = false
  }
}
