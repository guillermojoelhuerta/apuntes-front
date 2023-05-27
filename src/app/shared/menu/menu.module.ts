import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuRoutingModule } from './menu-routing.module';
import { PrincipalComponent } from './components/principal/principal.component';
      
@NgModule({
  declarations: [
    PrincipalComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule
  ],
  exports: [
    PrincipalComponent
  ],
})
export class MenuModule { }
