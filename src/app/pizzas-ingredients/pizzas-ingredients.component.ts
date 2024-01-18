// pizzas-ingredients.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-pizzas-ingredients',
  templateUrl: './pizzas-ingredients.component.html',
  styleUrls: ['./pizzas-ingredients.component.css']
})
export class PizzasIngredientsComponent implements OnInit {

  data: any[] = [];
  mostrarForm: boolean = false;
  nuevaPizzaIngredient: any = { piz_id: '', ing_id: '', pi_id: '', pi_portion: '' };

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.llenarData();
  }

  llenarData() {
    this.apiService.getData2().subscribe(data => {
      this.data = data;
      console.log(this.data);
    });
  }

  mostrarFormulario() {
    this.mostrarForm = !this.mostrarForm;
  }

  agregarPizzaIngredient() {
    this.apiService.agregarPizzaIngredient(this.nuevaPizzaIngredient).subscribe(
      (respuesta) => {
        this.data.push(respuesta);
        this.mostrarForm = false;
        this.limpiarFormulario();
      },
      (error) => {
        console.error('Error al agregar pizza-ingredient', error);
      }
    );
  }

  eliminarPizzaIngredient(piId: number) {
    this.apiService.eliminarPizzaIngredient(piId).subscribe(
      (respuesta) => {
        console.log('Pizza-ingredient eliminado correctamente', respuesta);
        this.llenarData();
      },
      (error) => {
        console.error('Error al eliminar pizza-ingredient', error);
      }
    );
  }

  private limpiarFormulario() {
    this.nuevaPizzaIngredient = { piz_id: '', ing_id: '', pi_id: '', pi_portion: '' };
  }
}
