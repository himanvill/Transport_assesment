import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authToken = localStorage.getItem('token')
    if(!authToken){
      return next.handle(req)
    }
    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization:`Bearer ${authToken}`
      }
    })
    return next.handle(tokenizedReq);}
  
}
