// ingredientes.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';


@Component({
  selector: 'app-ingredientes',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientesComponent implements OnInit {

  data: any[] = [];
  mostrarForm: boolean = false;
  nuevoIngrediente: any = { ing_name: '', ing_calories: 0, ing_state: true };

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.llenarData();
  }

  llenarData() {
    this.apiService.getIngredientes().subscribe(data => {
      this.data = data;
      console.log(this.data);
    });
  }

  agregarIngrediente() {
    this.apiService.crearIngrediente(this.nuevoIngrediente).subscribe(
      (respuesta) => {
        this.data.push(respuesta);
        this.mostrarForm = false;
        this.nuevoIngrediente = { ing_name: '', ing_calories: 0, ing_state: true };
      },
      (error) => {
        console.error('Error al agregar ingrediente', error);
      }
    );
  }

  editarIngrediente(ingredienteEditado: any) {
    this.apiService.editarIngrediente(ingredienteEditado).subscribe(
      () => {
        this.llenarData();
      },
      (error) => {
        console.error('Error al editar ingrediente', error);
      }
    );
  }

  eliminarIngrediente(id: number) {
    this.apiService.eliminarIngrediente(id).subscribe({
      next: () => {
        this.data = this.data.filter(ingrediente => ingrediente.ing_id !== id);
      },
      error: (error) => {
        console.error('Error al eliminar ingrediente', error);
      }
    });
  }

  mostrarFormulario() {
    this.mostrarForm = !this.mostrarForm;
  }
}
