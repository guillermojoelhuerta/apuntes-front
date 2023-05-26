import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApuntesRoutingModule } from './apuntes-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuModule } from '../menu/menu.module';
import { TodosApuntesComponent } from './components/todos-apuntes/todos-apuntes.component';
import { CrearApunteComponent } from './components/crear-apunte/crear-apunte.component';
import { ActualizarApunteComponent } from './components/actualizar-apunte/actualizar-apunte.component';
import { ConfirmDialogModule } from '../core/services/confirm-dialog/confirm-dialog-module';
        
@NgModule({
  declarations: [
    TodosApuntesComponent,
    CrearApunteComponent,
    ActualizarApunteComponent
  ],
  imports: [
    CommonModule,
    ApuntesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MenuModule,
    ConfirmDialogModule
  ]
})
export class ApuntesModule { }
