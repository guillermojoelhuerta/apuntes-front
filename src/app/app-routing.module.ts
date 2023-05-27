import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutLoginOneComponent } from '@app/pages/layout-login-one/layout-login-one.component';
import { LayoutComponent } from '@app/pages/layout/layout.component';
import { AdminGuard } from '@app/core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutLoginOneComponent,
    children: [
      {
        path: 'acceso',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      }
    ]
  },{
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'apuntes',
        canActivate:[AdminGuard],
        loadChildren: () => import('./apuntes/apuntes.module').then(m => m.ApuntesModule)
      },
      {
        path: 'categorias',
        canActivate:[AdminGuard],
        loadChildren: () => import('./categorias/categorias.module').then(m => m.CategoriasModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
