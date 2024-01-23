import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../service/api.service';
import { MatDialogConfig } from '@angular/material/dialog';
import { EditPizzaFormComponent } from '../edit-pizza-form/edit-pizza-form.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-pizzas-ingredients',
  templateUrl: './pizzas-ingredients.component.html',
  styleUrls: ['./pizzas-ingredients.component.css']
})
export class PizzasIngredientsComponent implements OnInit {
  data: any[] = [];
  nuevaPizzaIngredient: any = {};
  mostrarForm = false;


  constructor(private http: HttpClient, private apiService: ApiService) { }

  ngOnInit(): void {
    this.getPizzaIngredients();
    //this.getPizza();
    //this.getingredients();

  }

  mostrarFormulario(): void {
    this.mostrarForm = !this.mostrarForm;
  }

  agregarPizzaIngredient(): void {
    this.http.post('http://localhost:3000/crearPizza', this.nuevaPizzaIngredient)
      .subscribe(response => {
        console.log(response);
        this.getPizzaIngredients();
      }, error => {
        console.error(error);
      });
  }

  eliminarPizzaIngredient(pi_id: number): void {
    const confirmarEliminar = window.confirm('¿Seguro que deseas eliminar este Pizza-Ingredient?');

    if (confirmarEliminar) {
      this.apiService.eliminarPizzaIngredient(pi_id).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          console.log('Pizza-Ingredient eliminado correctamente');
          this.getPizzaIngredients();
        },
        error: (error) => {
          console.error('Error al eliminar Pizza-Ingredient', error);
        }
      });
    }
  }



  getPizzaIngredients(): void {
    this.http.get('http://localhost:3000/pizzaIngredients')
      .subscribe((response: any) => {
        this.data = response;
        console.log(this.data);
      }, error => {
        console.error(error);
      });
  }

  // Si deseas obtener las pizzas usando el servicio ApiService, puedes llamar a la función correspondiente aquí
  getPizza(): void {
    this.http.get('http://localhost:3000/pizzas')
      .subscribe((response: any) => {
        this.data = response;
      }, error => {
        console.error(error);
      });
  }

  getingredients(): void {
    this.http.get('http://localhost:3000/ingredients')
      .subscribe((response: any) => {
        this.data = response;
      }, error => {
        console.error(error);
      });
  }





}

