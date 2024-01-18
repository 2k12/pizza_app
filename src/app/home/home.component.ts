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
  isEditing: boolean = false;


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
        // Agregar la pizza a la lista si la respuesta es correcta
        this.data.push(respuesta);
  
        // Limpia el formulario después de la operación exitosa
        this.limpiarFormulario();
      },
      (error) => {
        console.error('Error al agregar pizza', error);
      }
    );
  }

  editarPizza() {
    this.apiService.editarPizza(this.nuevaPizza).subscribe(
      (respuesta) => {
        // Actualiza la lista de pizzas o recarga los datos
        this.llenarData();
        this.isEditing = false;
        this.mostrarForm = false;
        this.nuevaPizza = { piz_name: '', piz_origin: '', piz_state: true }; // Resetear formulario
      },
      (error) => {
        console.error('Error al editar pizza', error);
      }
    );
  }
  startEdit(pizza: any) {
    this.nuevaPizza = { ...pizza };
    this.mostrarForm = true;
    this.isEditing = true;
  }

  cancelarEdicion() {
    this.isEditing = false;
    this.mostrarForm = false;
    this.limpiarFormulario();
  }

  limpiarFormulario() {
    this.nuevaPizza = { piz_name: '', piz_origin: '', piz_state: true };
    this.mostrarForm = false; // Ocultar el formulario
    this.isEditing = false; // Asegurarse de que el estado de edición está desactivado
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
