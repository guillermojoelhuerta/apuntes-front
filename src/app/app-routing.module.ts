import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutLoginOneComponent } from './layout-login-one/layout-login-one.component';
import { LayoutComponent } from './layout/layout.component';
import { AdminGuard } from './guards/admin.guard';                 
                    
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
