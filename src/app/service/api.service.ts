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



  //                   INGREDIENTS                       
  public getIngredientes(): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/ingredients`).pipe(
      catchError(this.handleError)
    );
  }

  public crearIngrediente(ingrediente: any): Observable<any> {
    return this.http.post(`${this.urlApi}/ingredients`, ingrediente).pipe(
      catchError(this.handleError)
    );
  }

  public editarIngrediente(ingrediente: any): Observable<any> {
    // a esta línea
    return this.http.post(`${this.urlApi}/updateIngredient`, ingrediente).pipe(
      catchError(this.handleError)
    );
  }

  public eliminarIngrediente(ing_ida: number): Observable<any> {
    return this.http.delete(`${this.urlApi}/deleteIngredient/${ing_ida}`).pipe(
      catchError(this.handleError)
    );
  }





  //          Pizzas_Ingrediens           


  public getData2(): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/pizzaIngredients`).pipe(
      catchError(this.handleError)
    );
  }

  public agregarPizzaIngredient(pizzaIngredient: any): Observable<any> {
    return this.http.post(`${this.urlApi}/crearPizza`, pizzaIngredient).pipe(
      catchError(this.handleError)
    );
  }



  public eliminarPizzaIngredient(pi_id: number): Observable<any> {
    console.log('ID a eliminar:', pi_id);

    return this.http.delete(`${this.urlApi}/eliminarPizza/${pi_id}`).pipe(
      catchError(this.handleError)
    );
  }




}