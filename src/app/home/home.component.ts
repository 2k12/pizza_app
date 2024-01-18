import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: any[] = [];
  mostrarForm: boolean = false;
  nuevaPizza: any = { piz_name: '', piz_origin: '', piz_state: true };


  constructor(private apiService: ApiService) { }
  ngOnInit(): void {
    this.llenarData()
  }

  llenarData() { 

    this.apiService.getData().subscribe(data => {
      this.data = data;
      console.log(this.data);
    })

  }

  agregarPizza() {
    this.apiService.crearPizza(this.nuevaPizza).subscribe(
      (respuesta) => {
        // Puedes agregar la pizza directamente a `data` o volver a cargar todas las pizzas
        this.data.push(respuesta); // Asegúrate de que esto coincida con el formato de tus datos
        this.mostrarForm = false; // Ocultar el formulario después de agregar
        this.nuevaPizza = { piz_name: '', piz_origin: '', piz_state: true }; // Resetear formulario
      },
      (error) => {
        console.error('Error al agregar pizza', error);
      }
    );
  }

  editarPizza(pizzaEditada: any) {
    this.apiService.editarPizza(pizzaEditada).subscribe(
      () => {
        // Actualiza la lista de pizzas o recarga los datos
        this.llenarData();
      },
      (error) => {
        console.error('Error al editar pizza', error);
      }
    );
  }

  eliminarPizza(id: number) {
    this.apiService.eliminarPizza(id).subscribe({
      next: () => {
        // Eliminar la pizza del array `data` o recargar los datos
        this.data = this.data.filter(pizza => pizza.piz_id !== id);
      },
      error: (error) => {
        console.error('Error al eliminar pizza', error);
      }
    });
  }
  


  mostrarFormulario() {
    this.mostrarForm = !this.mostrarForm;
  }

  // agregarPizza() {
  //   // Aquí lógica para enviar 'nuevaPizza' al servidor y agregarla a la lista
  //   console.log(this.nuevaPizza);
  // }

}
