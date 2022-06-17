import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
url= "http://localhost:3000/"
  constructor(private http: HttpClient) { }

  login(data:{}): Observable<any>{
    return this.http.post(this.url+"login", data)
  }
  getRevenueData():Observable<any>{
    return this.http.get(this.url+'revenue')
  }
}
