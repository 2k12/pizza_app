import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  data: any[] = [];
  mostrarForm: boolean = false;
  nuevaPizza: any = { piz_name: '', piz_origin: '', piz_state: true };
  isEditing: boolean = false;
  displayedColumns: string[] = ['piz_id', 'piz_name', 'piz_origin', 'piz_state', 'acciones']; // Asegúrate de que estos coincidan con tus columnas definidas


  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.llenarData()
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; // Configura el paginador aquí
  }

  llenarData() {

    this.apiService.getData().subscribe(data => {
      // Asigna los datos al dataSource de MatTableDataSource
      this.dataSource.data = data;
    });

  }
  aplicarFiltro(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const filtroValor = inputElement.value;
    this.dataSource.filter = filtroValor.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage(); // Volver a la primera página si el filtro cambia
    }
  }
  agregarPizza() {
    this.apiService.crearPizza(this.nuevaPizza).subscribe(
      (respuesta) => {
        // Agregar la pizza directamente al dataSource.data
        const newData = this.dataSource.data;
        newData.push(respuesta);
        this.dataSource.data = newData; // Esto es necesario para actualizar la tabla

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
        // Eliminar la pizza del dataSource.data
        const newData = this.dataSource.data.filter(pizza => pizza.piz_id !== id);
        this.dataSource.data = newData; // Actualizar la tabla
      },
      error: (error) => {
        console.error('Error al eliminar pizza', error);
      }
    });
  }


  mostrarFormulario() {
    this.mostrarForm = !this.mostrarForm;
  }




}
