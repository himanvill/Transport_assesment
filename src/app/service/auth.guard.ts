import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _snackBar: MatSnackBar){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let token = localStorage.getItem('token');
    if (token) {
      this._snackBar.open("Access Granted","ok", {
        duration: 2000,
        horizontalPosition: "center",
        verticalPosition: "top",
      });
      
      return true;
    } else {
      this._snackBar.open("Access Denied", "ok", {
        duration: 2000,
        horizontalPosition: "center",
        verticalPosition: "top",
      });
      return false;
    }
  }
}
