import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';         
import { TodasCategoriasComponent } from './components/todas-categorias/todas-categorias.component';
import { CrearCategoriasComponent } from './components/crear-categorias/crear-categorias.component';
import { ActualizarCategoriasComponent } from './components/actualizar-categorias/actualizar-categorias.component';


const routes: Routes = [
  {
    path: 'todos',
    component: TodasCategoriasComponent,
    data: {
      breadcrumb: ''      
    }
  },
  {
    path: 'crear',
    component: CrearCategoriasComponent,
    data: {
      breadcrumb: ''      
    }
  },            
  {     
    path: 'actualizar/:id',
    component: ActualizarCategoriasComponent,
    data: {
      breadcrumb: ''      
    }             
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
