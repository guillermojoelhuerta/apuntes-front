import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService, ErrorInterceptor } from './core/interceptor/auth-interceptor.service';
import { MenuModule } from '@app/shared/menu/menu.module';
import { LayoutLoginOneComponent } from '@app/pages/layout-login-one/layout-login-one.component';
import { LayoutComponent } from '@app/pages/layout/layout.component';

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
    MenuModule
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
