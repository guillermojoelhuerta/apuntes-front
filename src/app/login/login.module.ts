import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers/reducers';                    

@NgModule({
  declarations: [
    LoginComponent
  ],            
  imports: [      
    CommonModule,
    FormsModule,        
    ReactiveFormsModule,                
    StoreModule.forRoot(reducers),      
    RouterModule.forChild([
      {
        path:'login',
        component: LoginComponent
      }
    ])    
  ]
})
export class LoginModule { }
