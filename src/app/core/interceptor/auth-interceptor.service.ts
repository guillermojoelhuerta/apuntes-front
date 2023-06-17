import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorResponse } from '@app/core/models/ErrorResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tok = localStorage.getItem('token');
    const modified = tok !== null ? req.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + tok
      }
    }) : req;
    return next.handle(modified);
  }
}

export class ErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log("ErrorInterceptor = ", error)
        let err: ErrorResponse = {
          errorCode : error.status,
          errorMessage : ""
        };
        if(error.error){
          err = error.error;
        }else{
          if ([401].includes(error.status)) {
            err.errorMessage = "Error 401 (Unauthorized)";
          }
        }
        return throwError(err);
      })
    );
  }
}



