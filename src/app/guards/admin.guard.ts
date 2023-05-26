import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';  
import { Observable } from 'rxjs';
import { LoginService } from '../core/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private loginService : LoginService
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const rol = localStorage.getItem('rol');
    const isLogged = localStorage.getItem('isLogged');
    //if(rol === "ROLE_USER"){
    if(isLogged === "true"){  
      return true;            
    }                     
    this.router.navigateByUrl('/acceso/login');                       
    return false;
  }

}
