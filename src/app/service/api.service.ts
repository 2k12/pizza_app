import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlApi = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  public getData(): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/pizzas`).pipe(
      catchError(this.handleError)
    );
  }
  public crearPizza(pizza: any): Observable<any> {
    return this.http.post(`${this.urlApi}/pizzas`, pizza).pipe(
      catchError(this.handleError)
    );
  } 
  
  public editarPizza(pizza: any): Observable<any> {
    return this.http.post(`${this.urlApi}/update/${pizza.piz_id}`, pizza).pipe(
      catchError(this.handleError)
    );
  }

  public eliminarPizza(piz_id: number): Observable<any> {
    return this.http.delete(`${this.urlApi}/borrar/${piz_id}`).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    // Aquí puedes agregar más lógica de manejo de errores
    console.error('An error occurred:', error.error.message);
    return throwError('Something bad happened; please try again later.');
  }
}