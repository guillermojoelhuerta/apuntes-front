import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from './services/login.service';
import { AuthInterceptorService } from './interceptor/auth-interceptor.service';
                             
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],      
  providers:[
    LoginService,
    AuthInterceptorService
  ]
})
export class CoreModule { }
