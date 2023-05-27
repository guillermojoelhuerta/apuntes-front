import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '@app/shared/services/storage.service';
import { LoginService } from '@app/shared/services/login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'apuntes';
  isLogged: boolean;
  loggedIn$: Observable<boolean>;

  ngOnInit(): void {
      this.loggedIn$ = this.loginService.isAuthenticated;
      this.loggedIn$.subscribe(isLogged => {
        console.log(isLogged);
        this.isLogged = isLogged;
      });
  }

  constructor(
    private router: Router,
    private storage: StorageService,
    private loginService : LoginService
  ){}

  cerrarSesion(){
    this.storage.clearAllStorage();
    this.loginService.salir();
    this.router.navigateByUrl("/acceso/login");
  }
}
