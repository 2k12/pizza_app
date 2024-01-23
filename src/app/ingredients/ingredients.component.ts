import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-ingredientes',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientesComponent implements OnInit {

  data: any[] = [];
  mostrarForm: boolean = false;
  nuevoIngrediente: any = { ing_name: '', ing_calories: 0, ing_state: true };
  ingredienteEdit: any = null;
  ingredienteEditado: any = {};
  mostrarFormularioo: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<any>();

  // Agrega la propiedad displayedColumns
  displayedColumns: string[] = ['ing_id', 'ing_name', 'ing_calories', 'ing_state', 'acciones'];

  constructor(private apiService: ApiService) { }

  
  ngOnInit(): void {
    this.llenarData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  llenarData() {
    this.apiService.getIngredientes().subscribe(data => {
      this.data = data;
      this.dataSource.data = this.data;
    });
  }

  agregarIngrediente() {
    const confirmacion = window.confirm('¿Estás seguro de que deseas crear este ingrediente?');
    console.log('Nuevo Ingrediente:', this.nuevoIngrediente);
    if (confirmacion){
      this.apiService.crearIngrediente(this.nuevoIngrediente).subscribe(
        (respuesta) => {
          this.data.push(respuesta);
          this.mostrarForm = false;
          this.nuevoIngrediente = { ing_name: '', ing_calories: 0, ing_state: true };
          window.location.reload();
        },
        (error) => {
          console.error('Error al agregar ingrediente', error);
        }
      );
    }
  }

  editarIngredienteFormulario(ingredient: any) {
    // Copia los datos del ingrediente para no modificar directamente los datos del ingrediente en la tabla
    this.ingredienteEdit = { ...ingredient };
  }

  editarIngrediente() {
    // Lógica para enviar la solicitud de edición al servicio API
    this.apiService.editarIngrediente(this.ingredienteEdit).subscribe(
      (respuesta) => {
        // Actualiza los datos en la tabla con los datos editados
        this.data = this.data.map(item => (item.ing_id === respuesta.ing_id ? respuesta : item));
        this.cancelarEdicion();
      },
      (error) => {
        console.error('Error al editar ingrediente', error);
      }
    );
  }

  cancelarEdicion() {
    // Restablece el formulario de edición y limpia el ingredienteEdit
    this.ingredienteEdit = null;
  }

  eliminarIngrediente(ingredientId: number): void {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este ingrediente?');

    if (confirmacion) {
      // Eliminar el ingrediente y actualizar la tabla
      this.apiService.eliminarIngrediente(ingredientId).subscribe(
        () => {
          this.data = this.data.filter(ingrediente => ingrediente.ing_id !== ingredientId);
          window.location.reload();
        },
        (error) => {
          console.error('Error al eliminar ingrediente', error);
        }
      );
    }
  }
  
  mostrarFormulario() {
    this.mostrarForm = !this.mostrarForm;
  }
  guardarCambios(): void {
    const confirmacion = window.confirm('¿Estás seguro de que deseas EDITAR este ingrediente?');
    if (confirmacion){
      this.apiService.editarIngrediente(this.ingredienteEditado).subscribe(
        (respuesta) => {
            // Actualizar el ingrediente en la lista de datos
            const index = this.data.findIndex(ingrediente => ingrediente.ing_id === this.ingredienteEditado.ing_id);
            if (index !== -1) {
                this.data[index] = respuesta.body.ingredient;
            }

            // Cerrar el formulario de edición
            this.cerrarFormularioEdicion();
            window.location.reload();
        },
        (error) => {
            console.error('Error al actualizar ingrediente', error);
        }
    );
    }
    
  }
  startEdit(ingredient: any): void {
    // Copiar los valores del ingrediente a la variable ingredienteEditado
    this.ingredienteEditado = { ...ingredient };
    this.mostrarFormularioo = !this.mostrarFormularioo;
}
cerrarFormularioEdicion(): void {
  this.mostrarFormularioo = !this.mostrarFormularioo;
  
}
  
aplicarFiltro(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  const filtroValor = inputElement.value;
  this.dataSource.filter = filtroValor.trim().toLowerCase();

  if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage(); // Volver a la primera página si el filtro cambia
  }
}
}
