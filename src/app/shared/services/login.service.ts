import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { environment } from '@app/environments/environment';
import { StorageService } from '@app/shared/services/storage.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit {

  public isLogged = (this.storage.getKey('isLogged') === "true")?true:false;
  public loggedIn$ = new BehaviorSubject<boolean>(this.isLogged);

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) {
   }

   ngOnInit(){
   }

  get isAuthenticated() {
    return this.loggedIn$.asObservable();
  }

  loguearse(credenciales: any) {
    return this.http.post(`${environment.url_api}/auth/login`, credenciales);
  }

  setIsLogged(isLogged: string){
    localStorage.setItem('isLogged', isLogged);
  }

  getIsLogged(){
    return localStorage.getItem('isLogged');
  }

  entrar(){
    this.loggedIn$.next(true);
  }

  salir(){
    this.loggedIn$.next(false);
  }
}
