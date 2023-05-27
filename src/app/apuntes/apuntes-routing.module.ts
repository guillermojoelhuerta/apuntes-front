import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosApuntesComponent } from './components/todos-apuntes/todos-apuntes.component';
import { CrearApunteComponent } from './components/crear-apunte/crear-apunte.component';
import { ActualizarApunteComponent } from './components/actualizar-apunte/actualizar-apunte.component';
import { AdminGuard } from '@app/core/guards/admin.guard';

const routes: Routes = [
  {
    path: 'todos',
    component: TodosApuntesComponent,
    data: {
      breadcrumb: ''
    }
  },
  {
    path: 'crear',
    canActivate:[AdminGuard],
    component: CrearApunteComponent,
    data: {
      breadcrumb: ''
    }
  },
  {
    path: 'actualizar/:id',
    component: ActualizarApunteComponent,
    data: {
      breadcrumb: ''
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApuntesRoutingModule { }
