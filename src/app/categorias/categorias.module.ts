import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriasRoutingModule } from './categorias-routing.module';
import { TodasCategoriasComponent } from './components/todas-categorias/todas-categorias.component';
import { CrearCategoriasComponent } from './components/crear-categorias/crear-categorias.component';
import { ActualizarCategoriasComponent } from './components/actualizar-categorias/actualizar-categorias.component';
import { MenuModule } from '@app/shared/menu/menu.module';

@NgModule({
  declarations: [
    TodasCategoriasComponent,
    CrearCategoriasComponent,
    ActualizarCategoriasComponent,
    TodasCategoriasComponent,
    CrearCategoriasComponent,
    ActualizarCategoriasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CategoriasRoutingModule,
    MenuModule
  ]
})
export class CategoriasModule { }
