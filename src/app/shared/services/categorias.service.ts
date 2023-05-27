import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '@app/environments/environment';
import { Categoria } from '@app/core/models/Categoria.model';

import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private headers: any;
  constructor(private http: HttpClient) {
    this.headers = {};
  }

  private getHeaders(){
    const headers = new HttpHeaders(...this.headers, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    });
    return headers;
  }

  postCategoria(categoria: Categoria): Observable<Categoria> {
    //return this.http.post(`${environment.url_api}/categorias/guardar-categoria`, categoria);
    return this.http.post(`${environment.url_api}/categorias/guardar-categoria`, categoria).pipe(
      map((data: any) => {
        return data;
      }), catchError(this.handleError)
    );
  }

  getCategorias(queryParams: HttpParams): Observable<Categoria[]> {
    //return this.http.get<Categoria[]>(`${environment.url_api}/categorias/get-categorias`).pipe(catchError(this.handleError));
    return this.http.get<Categoria[]>(`${environment.url_api}/categorias/get-categorias`,{params:queryParams}).pipe(
      map((data: Categoria[]) => {
        return data;
      }), catchError(this.handleError)
    );
  }

  getCategoriasList(): Observable<Categoria[]> {
    //return this.http.get<Categoria[]>(`${environment.url_api}/categorias/get-categorias`).pipe(catchError(this.handleError));
    return this.http.get<Categoria[]>(`${environment.url_api}/categorias/get-categorias-list`).pipe(
      map((data: Categoria[]) => {
        return data;
      }), catchError(this.handleError)
    );
  }

  getCategoriasById(id: number){
    return this.http.get<Categoria>(`${environment.url_api}/categorias/get-categoria-by-id/`+id);
  }

  updateCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.put(`${environment.url_api}/categorias/update-categoria`, categoria).pipe(
      map((data: any) => {
        return data;
      }), catchError(this.handleError)
    );
  }

  deleteCategoria(id: number){
    return this.http.delete(`${environment.url_api}/categorias/delete-categoria-by-id/`+id,
    { responseType: 'json'});
  }

  handleError(error:any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
        return errorMessage;
    });
  }
}
