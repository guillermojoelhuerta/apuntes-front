import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { LoginService } from '../../../core/services/login.service';
import { StorageService } from '../../../core/services/storage.service';
import { Router } from '@angular/router';     
import { Store } from '@ngrx/store'; 
import * as fromActions from '../../actions/usuario.actions';
import { AppState } from '../../reducers/app.states';            

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error_message: string = '';
  loginForm: UntypedFormGroup = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required]),             
    password: new UntypedFormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10), 
    Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*#-_\.])[A-Za-z\d$@$!%*#-_\.].{5,10}')])
  }); 

  constructor(
    private loginService : LoginService,
    private router: Router,     
    private store: Store<AppState>,
    private storage: StorageService
  ) { }                     
                
  ngOnInit(): void {    
    this.storage.storeKey('isLogged', false);    
  }           

  enviarForm(){
    this.loginService.loguearse({
      "nombreUsuario": this.loginForm.value.email,
      "password": this.loginForm.value.password
    }).subscribe((response: any) => {  
      this.storage.storeKey('id_usuario', response["idUsuario"]); 
      this.storage.storeKey('token', response["token"]);      
      this.storage.storeKey('rol', response.authorities[0].authority);
      this.storage.storeKey('isLogged', true);
      this.loginService.entrar();
              
      this.store.dispatch(fromActions.idUsuarioAction({ id_usuario: 100 }));      
      this.store.dispatch(fromActions.nombreUsuarioAction({ nombre: response.nombreUsuario }));
      this.store.dispatch(fromActions.rolUsuarioAction({ rol: response.authorities[0].authority }));

      this.store.subscribe(state => {     
        console.log("state = ",state);    
      });                                                             
      this.router.navigateByUrl("/apuntes/todos");
    },(error: any) => {
      this.error_message = "Error de acceso.";      
      console.log("error", error);
    }); 
  }
}
