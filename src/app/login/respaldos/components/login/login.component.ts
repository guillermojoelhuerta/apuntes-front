import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../core/services/login.service';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store'; 
//import { datosUsuario } from '../../login.actions';
//import { loginReducer } from '../../login.reducer';         
          
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
    private router: Router     
    //private store: Store<loginReducer>
  ) { }           

  ngOnInit(): void {        
    localStorage.setItem('token', '');
  }           

  enviarForm(){
    this.loginService.loguearse({
      "nombreUsuario": this.loginForm.value.email,
      "password": this.loginForm.value.password
    }).subscribe((response: any) => {
      console.log("res", response);               
      //localStorage.setItem('token', response["token"]);
      this.loginService.setToken(response["token"]);                               
      //this.store.dispatch(datosUsuario("wwww"));
      let val = false;                                                                                           
      
      /*this.store.subscribe(state => {
        console.log("state = ",state);    
      });*/   
                                                      
      console.log("val= " +val);  
      this.router.navigateByUrl("/apuntes/todos");
    },(error: any) => {
      this.error_message = "Error de acceso.";      
      console.log("error", error);
    }); 
  }

}
