import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService, ErrorInterceptor } from './core/interceptor/auth-interceptor.service';
import { MenuModule } from './menu/menu.module';
import { LayoutLoginOneComponent } from './layout-login-one/layout-login-one.component';
import { LayoutComponent } from './layout/layout.component';
import { ConfirmDialogModule } from './core/services/confirm-dialog/confirm-dialog-module';
                          
@NgModule({
  declarations: [
    AppComponent,
    LayoutLoginOneComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MenuModule,
    ConfirmDialogModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  },{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }],     
  bootstrap: [AppComponent]
})
export class AppModule { }
