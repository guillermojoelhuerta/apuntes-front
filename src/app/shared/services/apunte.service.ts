import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { from, Observable, throwError    } from 'rxjs';
import { environment } from '@app/environments/environment';
import { Apunte } from '@app/core/models/Apunte.model';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ApunteService {

  constructor(private http: HttpClient) { }

  crearApunte(apunte: any){
    return this.http.post<Apunte>(`${environment.url_api}/apuntes/save-apunte`,apunte)
    .pipe(
      catchError(this.handleError)
    );
  }

  getTodos(queryParams: HttpParams): Observable<Apunte[]>{
    return this.http.get<Apunte[]>(`${environment.url_api}/apuntes/get-apuntes`,{params:queryParams})
    .pipe(
      catchError(this.handleError)
    );
  }

  getBusqueda(body:any){
    return this.http.post(
      `${environment.url_api}/apuntes/get-busqueda`,
      body
    ).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: number){
    return this.http.get<Apunte>(`${environment.url_api}/apuntes/get-apunte-by-id/`+id)
    .pipe(
      catchError(this.handleError)
    );
  }

  update(apunte:any){
    return this.http.put<Apunte>(`${environment.url_api}/apuntes/update-apunte`, apunte)
    .pipe(
      catchError(this.handleError)
    );
  }

  eliminarApunte(id: number){
    return this.http.delete(`${environment.url_api}/apuntes/delete-apunte/`+id, {responseType:'text'})
    .pipe(
      catchError(this.handleError)
    );
  }

  eliminarArchivo(archivo_usuario: any){
    return this.http.post(
      `${environment.url_api}/apuntes/delete-archivo`,archivo_usuario,
      {responseType:'text'}
    ).pipe(
      catchError(this.handleError)
    );
  }

  downloadFile(body:any){
    return this.http.post(`${environment.url_api}/apuntes/download-file`, body, {responseType: 'blob'}).pipe(
        map((res: Blob) => {
          const filename = body.filename;
          let a = document.createElement("a");
          a.href = URL.createObjectURL(res);
          a.setAttribute("download", filename);
          a.click();
        }), catchError((error:any) => {
            let errorMessage = '';
            error.text().then((text:any) => {
            const err = JSON.parse(text);
            console.log(err["errorMessage"]);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err["errorMessage"]
            })
          });
          return throwError(() => {
            return "Error no se puede descargar el archivo";
          });
        })
      );
  }

  handleError(error: HttpErrorResponse){
    return throwError(error);
  }
}
